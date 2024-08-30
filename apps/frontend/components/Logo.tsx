import Link from 'next/link';
export default function Logo() {
  return (
    <Link
      href={'/'}
      data-testid='logo'
      className='text-xl md:text-2xl font-semibold flex items-center'
    >
      🥞<span className='hidden md:block logo'>Aegis</span>
    </Link>
  );
};


