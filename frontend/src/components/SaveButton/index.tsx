import type { ButtonHTMLAttributes } from 'react';

import { FaBookmark } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa';
import Button from '../Button';
import type { IconType } from 'react-icons';

type SaveButtonProps = {
  saved: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const icons = new Map<boolean, IconType>([
  [true, FaBookmark],
  [false, FaRegBookmark],
]);

const SaveButton = ({ saved, ...props }: SaveButtonProps) => {
  const label = saved ? 'Unsave' : 'Save';
  const Icon = icons.get(saved);

  if (Icon === undefined) throw new Error('Cannot render icon');

  return (
    <Button
      {...props}
      color="gray"
      varient="fill"
      className="flex items-center"
    >
      <Icon className="text-xs" />
      {label}
    </Button>
  );
};

export default SaveButton;
