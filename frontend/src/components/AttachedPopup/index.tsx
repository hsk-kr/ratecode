import { useEffect, useRef, useState, type ReactNode } from 'react';
import Text from '../Text';
import type { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

type ItemColor = 'white' | 'red';

type Item =
  | {
      label: string;
      color: ItemColor;
      icon?: IconType;
      onClick?: VoidFunction;
    }
  | {
      divider: true;
    };

type AttachedPopupProps = {
  children: ReactNode;
  items: Item[];
};

const AttachedPopup = ({ children, items }: AttachedPopupProps) => {
  const [visible, setVisible] = useState(false);
  const topNode = useRef<HTMLDivElement>(null);

  const toggleVisible = () => setVisible((prevVisible) => !prevVisible);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!topNode.current) return;
      const hasClickedOutSideOfPopup =
        topNode.current !== e.target &&
        !topNode.current.contains(e.target as Node);

      if (hasClickedOutSideOfPopup) {
        setVisible(false);
      }
    };
    window.addEventListener('click', handler);

    return () => {
      window.removeEventListener('click', handler);
    };
  }, []);

  return (
    <div className="relative" onClick={toggleVisible} ref={topNode}>
      {children}
      {visible && (
        <div className="top-[100%] right-0 absolute mt-1 w-48 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-[100]">
          <ul className="flex flex-col">
            {items.map((item, itemIdx) => {
              if ('divider' in item) {
                return (
                  <div key={itemIdx} className="h-px bg-gray-600 mx-2 my-1" />
                );
              }

              const { onClick, color, label, icon: Icon } = item;

              const colorClassNames: Record<ItemColor, string> = {
                red: 'text-red-400',
                white: 'text-white',
              };

              return (
                <button
                  key={itemIdx}
                  className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2 transition-colors cursor-pointer"
                  role="button"
                  onClick={onClick}
                >
                  {Icon && <Icon className={colorClassNames[color]} />}
                  <Text color={color} size="md">
                    {label}
                  </Text>
                </button>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AttachedPopup;
