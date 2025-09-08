import { twMerge } from 'tailwind-merge';

type AnimatedIconProps = {
  size: 'xs' | 'sm';
  color: 'cyan';
};

const AnimatedIcon = ({ color, size }: AnimatedIconProps) => {
  const sizeClassNames: Record<AnimatedIconProps['size'], string> = {
    xs: 'size-2 top-[0px] right-[-4px]',
    sm: 'size-4 top-[-4px] right-[-8px]',
  };

  const colorClassNames: Record<AnimatedIconProps['color'], string> = {
    cyan: 'bg-cyan-400',
  };

  let className =
    'absolute text-white animate-pulse text-xs rounded-full p-1 box-border size-2';

  className = twMerge(className, sizeClassNames[size], colorClassNames[color]);

  return <div className={className} />;
};

export default AnimatedIcon;
