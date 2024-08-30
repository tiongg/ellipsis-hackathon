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
    <footer className="bg-black text-white min-h-60 p-4 flex flex-col">
      <div>
        <p>
          Version: {isLoading ? 'loading...' : (version?.version ?? 'unknown')}
        </p>
      </div>
      <div>
        <Link href="/storefront/onboard">Work with us!</Link>
      </div>
      <div className="flex flex-row justify-between border-t border-t-slate-600 py-4 text-slate-400 mt-auto w-full">
        <p>
          🚀 powered by{' '}
          <Link className="text-slate-300" href="https://magicui.design/">
            magic ui
          </Link>{' '}
          and{' '}
          <Link className="text-slate-300" href="https://fly.io/">
            fly.io
          </Link>
        </p>
      </div>
    </footer>
  );
}
