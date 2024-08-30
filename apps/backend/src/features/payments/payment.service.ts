import {
  BadRequestException,
  Injectable,
  RawBodyRequest,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyProductDto } from '@shared-types/features/payment/buy-product.dto';
import { Request, Response } from 'express';
import _ from 'lodash';
import Stripe from 'stripe';
import { Repository } from 'typeorm';

import { Order } from '@backend/entities/order.entity';
import { Payment } from '@backend/entities/payment.entity';
import { RequestUserType } from '../auth/types/request-user.type';
import { ListingService } from '../listing/listing.service';

@Injectable()
export class PaymentService {
  private readonly stripe: Stripe;
  private readonly webhookSecret: string;

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly listingService: ListingService,
    configService: ConfigService
  ) {
    const stripeSecretKey = configService.get<string>('STRIPE_SECRET_KEY')!;
    this.stripe = new Stripe(stripeSecretKey, {});
    this.webhookSecret = configService.get<string>('STRIPE_SIGNING_SECRET')!;
  }

  //im gonna cry
  async createCheckoutSession(user: RequestUserType, dto: BuyProductDto) {
    if (!user.member) {
      throw new UnauthorizedException();
    }

    const memberId = user.member.memberId;

    const listingsToBuy = _.flatten(
      await Promise.all(
        Object.entries(dto).map(([productId, quantity]) =>
          this.listingService.getAvailableListings(productId, quantity)
        )
      )
    );

    if (
      listingsToBuy.length !==
      Object.entries(dto).reduce((acc, [, qty]) => acc + qty, 0)
    ) {
      throw new BadRequestException('Listings not available!');
    }

    // Create a payment
    const payment = await this.paymentRepository.save({
      memberId,
    });

    //Create an order for each listing
    const listingsEntites = listingsToBuy.map((listing) =>
      this.orderRepository.create({
        listing,
        orderedBy: memberId,
        payment,
      })
    );
    await this.orderRepository.save(listingsEntites);

    //...group it again for nicer checkout
    const groupedListings = _.groupBy(
      listingsToBuy,
      (listing) => listing.product.productId
    );
    const line_items = Object.entries(groupedListings).map(
      ([productId, productListing]) => ({
        price_data: {
          product_data: {
            name: productListing[0].product.productName,
          },
          currency: 'sgd',
          unit_amount: Math.round(productListing[0].product.productPrice * 100),
        },
        quantity: productListing.length,
      })
    );

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      metadata: {
        memberId,
        paymentId: payment.paymentId,
      },
      success_url: `${process.env.FRONTEND_DOMAIN}/checkout/success/${payment.paymentId}`,
      cancel_url: `${process.env.FRONTEND_DOMAIN}/checkout/cancel`,
    });

    return { url: session.url };
  }

  handleWebhook(req: RawBodyRequest<Request>, res: Response) {
    const sig = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.rawBody!,
        sig,
        this.webhookSecret
      );
    } catch (err: any) {
      console.log(err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case 'checkout.session.completed':
        this.handleSuccessfulPayment(event.data.object);
        break;
      case 'checkout.session.expired':
        console.log('Payment was not successful');
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return res.status(200);
  }

  async handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    //Update payments
    const paymentId = session.metadata!.paymentId;
    await this.paymentRepository.update(paymentId, {
      stripePaymentId: session.id,
      paymentStatus: session.payment_status,
      amountSubtotal: session.amount_subtotal ?? 0,
      amountTotal: session.amount_total ?? 0,
      currency: session.currency ?? 'sgd',
      createdTime: session.created,
      customerName: session.customer_details?.name ?? 'Unknown',
      customerEmail: session.customer_details?.email ?? 'Unknown',
    });

    //Update orders
    const orders = await this.orderRepository.find({
      where: {
        paymentId,
      },
    });
    await this.listingService.markListingsAsSold(
      orders.map((order) => order.listingId)
    );
  }

  async getPaymentInfo(paymentId: string) {
    return this.paymentRepository.findOne({
      where: {
        paymentId,
      },
      relations: {
        orders: {
          listing: {
            product: true,
          },
        },
      },
    });
  }
}
