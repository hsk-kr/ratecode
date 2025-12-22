import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { IoPerson } from 'react-icons/io5';
import { IoCodeOutline } from 'react-icons/io5';
import { FaCodeBranch } from 'react-icons/fa';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdOutlineContentCopy } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaBookmark } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa';

type ButtonProps = {
  hoverAction?: 'scale';
  icon?: keyof typeof icons;
  wide?: boolean;
  size?: 'sm' | 'md' | 'lg';
  varient?: 'outline' | 'fill';
  color: 'cyan' | 'purple' | 'gray' | 'red' | 'lightGray';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'>;

const icons = {
  profile: IoPerson,
  branch: FaCodeBranch,
  cloudUpload: FaCloudUploadAlt,
  code: IoCodeOutline,
  copy: MdOutlineContentCopy,
  bin: RiDeleteBin6Line,
  bookmark: FaBookmark,
  regBookmark: FaRegBookmark,
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
    'rounded-lg cursor-pointer transition-all duration-500 flex items-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400';

  const wideClassName = wide ? 'px-8 py-2' : 'px-4 py-2';

  const hoverActionClassNames: Record<
    NonNullable<ButtonProps['hoverAction']>,
    string
  > = {
    scale: 'hover:scale-[1.03]',
  };

  const sizeClassNames: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'text-xs md:text-sm',
    md: 'text-sm md:text-md',
    lg: 'text-md md:text-lg',
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
        : 'bg-cyan-600 hover:bg-cyan-500 text-white',
    purple:
      varient === 'outline'
        ? 'border-purple-400 text-purple-400 hover:text-black hover:bg-purple-400'
        : 'bg-purple-600 hover:bg-purple-500 text-white',
    gray:
      varient === 'outline'
        ? 'border-gray-400 text-gray-400 hover:text-black hover:bg-gray-400'
        : 'bg-gray-600 hover:bg-gray-500 text-white',
    lightGray:
      varient === 'outline'
        ? 'border-gray-500 text-gray-300 hover:text-black hover:bg-gray-400'
        : 'bg-gray-500 hover:bg-gray-400 text-white',
    red:
      varient === 'outline'
        ? 'border-red-400 text-red-400 hover:text-black hover:bg-red-400'
        : 'bg-red-600 hover:bg-red-500 text-white',
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
    <button type="button" {...props} className={className}>
      {Icon && <Icon />}
      {props.children}
    </button>
  );
};

export default Button;
