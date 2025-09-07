import type { HTMLAttributes } from 'react';
import { IoPerson } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  icon?: keyof typeof icons;
  size?: 'sm';
  varient?: 'outline' | 'fill';
  color: 'cyan';
} & HTMLAttributes<HTMLSpanElement>;

const icons = {
  profile: IoPerson,
};

const Button = ({
  size = 'sm',
  varient = 'outline',
  color,
  icon,
  ...props
}: ButtonProps) => {
  let className = twMerge(
    props.className,
    'px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-2'
  );

  switch (size) {
    case 'sm':
      className = twMerge(className, 'text-sm');
      break;
    default:
      const sizeCheck: never = size;
  }

  switch (varient) {
    case 'outline':
      className = twMerge(className, 'border bg-gray-800');
      break;
    case 'fill':
      break;
    default:
      className = twMerge(className, 'text-black');
      const varientCheck: never = varient;
  }

  switch (color) {
    case 'cyan':
      className = twMerge(
        className,
        varient === 'outline'
          ? 'border-cyan-400 text-cyan-400 hover:text-black hover:bg-cyan-400'
          : 'bg-cyan-600 hover:bg-cyan-500'
      );
      break;
    default:
      const colorCheck: never = color;
  }

  const Icon = icon ? icons[icon] : null;

  return (
    <button {...props} className={className}>
      {Icon && <Icon />}
      {props.children}
    </button>
  );
};

export default Button;
