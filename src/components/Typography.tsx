import React from 'react';

interface TypoProps {
  children: string;
  className?: string;
  size?: 'large' | 'small';
}

export function Title({ children, className }: TypoProps) {
  return <h1 className={`title ${className ?? ''}`}>{children}</h1>;
}

export function SubTitle({ children, className }: TypoProps) {
  return <h2 className={`sub-title ${className ?? ''}`}>{children}</h2>;
}

export function ContentsTitle({ children, className }: TypoProps) {
  return <h3 className={`contents-title ${className ?? ''}`}>{children}</h3>;
}

export function Contents({ children, className, size }: TypoProps) {
  const typoSize = size ? 'label-' + size[0] : 'label-m';

  return <p className={`${typoSize} ${className ?? ''}`}>{children}</p>;
}
