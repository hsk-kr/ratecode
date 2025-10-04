export type TextColor =
  | 'cyan'
  | 'gray'
  | 'blue'
  | 'red'
  | 'purple'
  | 'green'
  | 'orange'
  | 'white'
  | 'yellow'
  | 'teal'
  | 'textDefault';

export const getTextColorClassName = (color: TextColor) => {
  const colorClassNames: Record<TextColor, string> = {
    textDefault: 'text-gray-300',
    red: 'text-red-400',
    cyan: 'text-cyan-400',
    gray: 'text-gray-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    white: 'text-white',
    teal: 'text-teal-400',
    purple: 'text-purple-400',
    yellow: 'text-yellow-400',
    orange: 'text-orange-400',
  };

  return colorClassNames[color];
};
