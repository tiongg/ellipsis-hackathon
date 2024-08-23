import Link from 'next/link';

type VersionDto = {
  version: string;
};

export default async function Footer() {
  const version = (await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/server-status/version`
  ).then((res) => res.json())) as VersionDto;

  return (
    <footer className="bg-black text-white min-h-60 p-4 flex flex-col">
      <p>Version: {version.version}</p>
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
      </div>{' '}
    </footer>
  );
}
