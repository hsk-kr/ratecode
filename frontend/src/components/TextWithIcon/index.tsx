import type { ComponentProps } from 'react';
import Text, { colorClassNames } from '../Text';
import type { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

type TextWithIconProps = ComponentProps<typeof Text> & {
  icon: IconType;
  iconClassName?: string;
};

const TextWithIcon = ({
  icon: Icon,
  iconClassName,
  ...props
}: TextWithIconProps) => {
  return (
    <div className="flex gap-2 items-center">
      <Icon
        className={twMerge(
          colorClassNames[props.color ?? 'textDefault'],
          iconClassName
        )}
      />
      <Text {...props} />
    </div>
  );
};

export default TextWithIcon;
