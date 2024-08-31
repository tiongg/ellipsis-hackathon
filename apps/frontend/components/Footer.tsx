'use client';

import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

type VersionDto = {
  version: string;
};

export default function Footer() {
  const { data: version, isLoading } = useSWR<VersionDto>(
    '/api/server-status/version'
  );

  return (
    <div className="min-h-50 flex flex-col">
      <footer className="bg-slate-200 p-8 flex flex-col gap-2">
        <div className="flex flex-row my-4">
          <div className="my-auto">
            <Image src="/icon.png" alt="" width={128} height={128} />
          </div>
          <div className="flex flex-row justify-around w-full">
            <div>
              <p className="font-bold text-black text-xl mb-2">Partnerships</p>
              <Link className="text-gray-500 " href="/storefront">
                Register your store with us!
              </Link>
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-black text-xl mb-2">User links</p>
              <Link className="text-gray-500 " href="/#">
                About Us
              </Link>
              <Link className="text-gray-500" href="/#">
                Contact Us
              </Link>
              <Link className="text-gray-500" href="/#">
                Payment & Tax
              </Link>
              <Link className="text-gray-500" href="/#">
                Terms & Conditions
              </Link>
            </div>
            <div>
              <p className="font-bold text-black text-xl mb-2">Contact Us</p>
              <p className="text-gray-500">123 Address Ave</p>
              <p className="text-gray-500">Singapore, 123456</p>
              <p className="text-gray-500">+65 1234 5678</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between border-t border-t-slate-600 py-4 text-gray-500 mt-auto w-full">
          <p>
            Version:{' '}
            {isLoading ? 'loading...' : (version?.version ?? 'unknown')}
          </p>
          <p>Built with 💖 by Team Aegis, Tech Series 2024</p>
        </div>
      </footer>
    </div>
  );
}
