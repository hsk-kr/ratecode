import { twMerge } from 'tailwind-merge';

type AnimatedIconProps = {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color: 'cyan';
};

const AnimatedIcon = ({ color, size }: AnimatedIconProps) => {
  let className =
    'absolute top-[-2px] right-[-6px] text-white animate-pulse text-xs rounded-full p-1 box-border size-2';

  switch (size) {
    case 'xs':
      className = twMerge(className, 'size-2');
      break;
    case 'sm':
      className = twMerge(className, 'size-4');
      break;
    case 'md':
      className = twMerge(className, 'size-6');
      break;
    case 'lg':
      className = twMerge(className, 'size-8');
      break;
    case 'xl':
      className = twMerge(className, 'size-10');
      break;
    default:
      const sizeCheck: never = size;
  }

  switch (color) {
    case 'cyan':
      className = twMerge(className, 'bg-cyan-400');
      break;
    default:
      const colorCheck: never = color;
  }

  return <div className={className} />;
};

export default AnimatedIcon;
