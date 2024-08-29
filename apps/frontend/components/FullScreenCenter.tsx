import { PropsWithChildren } from 'react';

export type CenterProps = PropsWithChildren<{}>;

export default function FullScreenCenter({ children }: CenterProps) {
  return (
    <section className="d-flex flex-column align-items-center justify-content-center min-vw-100 min-vh-100">
      {children}
    </section>
  );
}
