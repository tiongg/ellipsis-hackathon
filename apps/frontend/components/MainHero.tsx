import Link from 'next/link';

import { FadeText } from '@components/fade-text';
import ShimmerButton from '@components/shimmer-button';

export default function MainHero() {
  return (
    <main className="mt-5 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-20">
      <div className="sm:text-center lg:text-left">
        <div className="flex flex-col text-7xl font-extrabold text-[#944141]">
          <span>Savour</span>
          <FadeText
            text="Sustainability,"
            className="text-[#41947B]"
            direction="left"
          />
          <span>One Bite</span>
          <span>at a time.</span>
        </div>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <Link
            href="/home"
            className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg"
          >
            <ShimmerButton className="shadow-2xl">Order now</ShimmerButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
