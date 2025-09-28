import type { ReactNode } from 'react';
import Text from '../Text';
import { twMerge } from 'tailwind-merge';

type Item = {
  icon?: ReactNode;
  label: string;
  color: 'cyan' | 'purple';
};

type TabProps = {
  onChange: (index: number) => void;
  selectedIndex: number;
  items: Item[];
};

const Tab = ({ onChange, selectedIndex, items }: TabProps) => {
  const handleChange = (index: number) => () => {
    onChange(index);
  };

  return (
    <div
      className="w-fit items-center justify-center rounded-xl flex bg-gray-800 border border-gray-700 p-1 h-auto"
      role="tab"
    >
      {items.map((item, itemIdx) => {
        const icon = item.icon;
        const selected = itemIdx === selectedIndex;

        const colorClassNames: Record<Item['color'], string> = {
          cyan: 'bg-cyan-600',
          purple: 'bg-purple-600',
        };

        return (
          <button
            key={itemIdx}
            className={twMerge(
              'flex gap-3 rounded-xl px-5 py-3 items-center cursor-pointer',
              selected ? colorClassNames[item.color] : '',
              selected ? 'white' : 'gray-400'
            )}
            onClick={handleChange(itemIdx)}
          >
            {icon ? <>{icon}</> : null}
            <Text color={selected ? 'white' : 'gray'} size="sm">
              {item.label}
            </Text>
          </button>
        );
      })}
    </div>
  );
};

export default Tab;
