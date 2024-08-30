import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  RawBodyRequest,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BuyProductDto } from '@shared-types/features/payment/buy-product.dto';
import { Request, Response } from 'express';

import { Public } from '../auth/decorators/public-route.decorator';
import { RequestUser } from '../auth/decorators/request-user.decorator';
import { RequestUserType } from '../auth/types/request-user.type';
import { PaymentService } from './payment.service';

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  async createCheckoutSession(
    @RequestUser() user: RequestUserType,
    @Body() dto: BuyProductDto
  ) {
    return this.paymentService.createCheckoutSession(user, dto);
  }

  @Post('webhook')
  @Public()
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response
  ) {
    return this.paymentService.handleWebhook(req, res);
  }

  @Get(':paymentId')
  async getPayment(@Query('paymentId') paymentId: string) {
    return this.paymentService.getPaymentInfo(paymentId);
  }
}
