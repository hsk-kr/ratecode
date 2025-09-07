import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type TextProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color: 'cyan';
} & HTMLAttributes<HTMLSpanElement>;

const Text = ({ size = 'sm', color, ...props }: TextProps) => {
  let className = props.className;

  switch (size) {
    case 'xs':
      className = twMerge(className, 'text-xs');
      break;
    case 'sm':
      className = twMerge(className, 'text-sm');
      break;
    case 'md':
      className = twMerge(className, 'text-md');
      break;
    case 'lg':
      className = twMerge(className, 'text-lg');
      break;
    case 'xl':
      className = twMerge(className, 'text-xl');
      break;
    default:
      const sizeCheck: never = size;
  }

  switch (color) {
    case 'cyan':
      className = twMerge(className, 'text-cyan-400');
      break;
    default:
      const colorCheck: never = color;
  }

  return <span {...props} className={className} />;
};

export default Text;
