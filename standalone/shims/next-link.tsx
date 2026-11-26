import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from "react";
import { setPendingAnchor, toHashHref } from "../router";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; scroll?: boolean; prefetch?: boolean };

/** Remplace next/link : liens convertis en routes hash. */
const Link = forwardRef<HTMLAnchorElement, Props>(function Link({ href, scroll: _s, prefetch: _p, onClick, ...rest }, ref) {
  const { href: target, anchor } = toHashHref(href);
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    setPendingAnchor(anchor);
    onClick?.(e);
  };
  return <a ref={ref} href={target} onClick={handle} {...rest} />;
});

export default Link;
