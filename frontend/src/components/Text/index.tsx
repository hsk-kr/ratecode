import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type TextProps = {
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';
  color: 'cyan' | 'gray' | 'red' | 'textDefault';
  bold?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

const Text = ({ size = 'sm', color, bold, ...props }: TextProps) => {
  const sizeClassNames: Record<NonNullable<TextProps['size']>, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  };

  const colorClassNames: Record<TextProps['color'], string> = {
    red: 'text-red-400',
    cyan: 'text-cyan-400',
    textDefault: 'text-gray-300',
    gray: 'text-gray-400',
  };

  const boldClassName = bold ? 'bold' : undefined;

  const className = twMerge(
    'font-sans',
    sizeClassNames[size],
    colorClassNames[color],
    boldClassName,
    props.className
  );

  return <span {...props} className={className} />;
};

export default Text;
