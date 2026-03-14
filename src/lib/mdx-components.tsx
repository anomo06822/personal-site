import type { ComponentPropsWithoutRef } from "react";

function Anchor({ className = "", href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const isExternal = href.startsWith("http");

  return (
    <a
      {...props}
      href={href}
      className={`underline decoration-accent/50 underline-offset-4 transition hover:text-accent ${className}`}
      rel={isExternal ? "noreferrer noopener" : props.rel}
      target={isExternal ? "_blank" : props.target}
    />
  );
}

export const mdxComponents = {
  a: Anchor,
};
