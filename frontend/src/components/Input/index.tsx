import type { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const Input = ({ className: _className, ...props }: InputProps) => {
  const className = twMerge(
    'text-white bg-gray-800 p-2 rounded border border-gray-600 mt-1 text-sm',
    _className
  );

  return <input type="text" className={className} {...props} />;
};

export default Input;
