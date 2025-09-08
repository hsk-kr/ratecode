import type { ComponentProps } from 'react';
import Text from '../Text';
import AnimatedIcon from '../AnimatedIcon';

type BrandLabelProps = {
  size: 'md' | 'xl';
};

const BrandLabel = ({ size }: BrandLabelProps) => {
  const sizeClassNames: Record<
    BrandLabelProps['size'],
    {
      textSize: NonNullable<ComponentProps<typeof Text>['size']>;
      iconSize: ComponentProps<typeof AnimatedIcon>['size'];
    }
  > = {
    md: {
      textSize: 'xl',
      iconSize: 'xs',
    },
    xl: {
      textSize: '5xl',
      iconSize: 'sm',
    },
  };

  return (
    <div>
      <h1 className="relative w-fit">
        <Text
          size={sizeClassNames[size].textSize}
          color="cyan"
          bold
          className="font-brand"
        >
          RateCode
        </Text>
        <AnimatedIcon size={sizeClassNames[size].iconSize} color="cyan" />
      </h1>
    </div>
  );
};

export default BrandLabel;
