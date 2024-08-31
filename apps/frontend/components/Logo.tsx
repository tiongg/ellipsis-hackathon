import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href={'/'}
      data-testid="logo"
      className="text-xl md:text-2xl font-semibold flex items-center"
    >
      <Image src="/icon.png" alt="" width={32} height={32} />
      <span className="hidden md:block logo">Sustainabites</span>
    </Link>
  );
}
