import type { ButtonHTMLAttributes } from 'react';

import { FaBookmark } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa';
import Button from '../Button';
import type { IconType } from 'react-icons';

type BookmarkButtonProps = {
  bookmarked: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const icons = new Map<boolean, IconType>([
  [true, FaBookmark],
  [false, FaRegBookmark],
]);

const BookmarkButton = ({ bookmarked, ...props }: BookmarkButtonProps) => {
  const label = bookmarked ? 'Unbookmark' : 'Bookmark';
  const Icon = icons.get(bookmarked);

  if (Icon === undefined) throw new Error('Cannot find bookmark icon');

  return (
    <Button {...props} color="gray" varient="fill">
      <Icon />
      {label}
    </Button>
  );
};

export default BookmarkButton;
