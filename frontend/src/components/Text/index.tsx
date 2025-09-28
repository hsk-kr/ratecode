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
  color?:
    | 'cyan'
    | 'gray'
    | 'blue'
    | 'red'
    | 'purple'
    | 'green'
    | 'orange'
    | 'white'
    | 'yellow'
    | 'teal'
    | 'textDefault';
  bold?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

export const colorClassNames: Record<
  NonNullable<TextProps['color']>,
  string
> = {
  textDefault: 'text-gray-300',
  red: 'text-red-400',
  cyan: 'text-cyan-400',
  gray: 'text-gray-400',
  blue: 'text-blue-400',
  green: 'text-green-400',
  white: 'text-white',
  teal: 'text-teal-400',
  purple: 'text-purple-400',
  yellow: 'text-yellow-400',
  orange: 'text-orange-400',
};

const Text = ({
  size = 'sm',
  color = 'textDefault',
  bold,
  ...props
}: TextProps) => {
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
