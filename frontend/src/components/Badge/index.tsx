import { twMerge } from 'tailwind-merge';

type BadgeProps = {
  color: 'cyan';
  children: string;
  className?: string;
};

const Badge = ({ color, children, className: _className }: BadgeProps) => {
  const colorClassNames: Record<BadgeProps['color'], string> = {
    cyan: 'bg-cyan-600/20 border-cyan-400 text-cyan-400',
  };

  const className = twMerge(
    'inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium w-fit h-fit whitespace-nowrap border',
    colorClassNames[color],
    _className
  );

  return <div className={className}>{children}</div>;
};

export default Badge;
