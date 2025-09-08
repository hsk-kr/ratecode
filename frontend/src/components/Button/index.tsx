import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { IoPerson } from 'react-icons/io5';
import { FaCodeBranch } from 'react-icons/fa';
import { FaCloudUploadAlt } from 'react-icons/fa';

type ButtonProps = {
  hoverAction?: 'scale';
  icon?: keyof typeof icons;
  wide?: boolean;
  size?: 'sm';
  varient?: 'outline' | 'fill';
  color: 'cyan' | 'purple';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const icons = {
  profile: IoPerson,
  branch: FaCodeBranch,
  cloudUpload: FaCloudUploadAlt,
};

const Button = ({
  hoverAction,
  size = 'sm',
  wide,
  varient = 'outline',
  color,
  icon,
  ...props
}: ButtonProps) => {
  let className =
    'rounded-lg cursor-pointer transition-all flex items-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400';

  const wideClassName = wide ? 'px-8 py-2' : 'px-4 py-2';

  const hoverActionClassNames: Record<
    NonNullable<ButtonProps['hoverAction']>,
    string
  > = {
    scale: 'hover:scale-[1.03]',
  };

  const sizeClassNames: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'text-sm',
  };

  const varientClassNames: Record<
    NonNullable<ButtonProps['varient']>,
    string
  > = {
    outline: 'border bg-gray-800',
    fill: 'text-black',
  };

  const colorClassNames: Record<ButtonProps['color'], string> = {
    cyan:
      varient === 'outline'
        ? 'border-cyan-400 text-cyan-400 hover:text-black hover:bg-cyan-400'
        : 'bg-cyan-500 hover:bg-cyan-400',
    purple:
      varient === 'outline'
        ? 'border-purple-400 text-purple-400 hover:text-black hover:bg-purple-400'
        : 'bg-purple-500 hover:bg-purple-400',
  };

  className = twMerge(
    className,
    hoverAction && !props.disabled
      ? hoverActionClassNames[hoverAction]
      : undefined,
    wideClassName,
    sizeClassNames[size],
    varientClassNames[varient],
    colorClassNames[color],
    props.className
  );

  const Icon = icon ? icons[icon] : null;

  return (
    <button {...props} className={className}>
      {Icon && <Icon />}
      {props.children}
    </button>
  );
};

export default Button;
