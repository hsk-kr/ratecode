import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type BoxProps = {
  className?: string;
  center?: boolean;
  children: ReactNode;
};

const Box = ({ children, center, className: _className }: BoxProps) => {
  const className = twMerge(
    'bg-gray-800/50 rounded-lg p-8 border border-gray-700 flex flex-col',
    center ? 'items-center' : '',
    _className
  );

  return <div className={className}>{children}</div>;
};

export default Box;
