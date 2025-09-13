import { twMerge } from 'tailwind-merge';
import Text from '../Text';

type Color =
  | 'cyan'
  | 'gray'
  | 'red'
  | 'blue'
  | 'purple'
  | 'green'
  | 'orange'
  | 'yellow'
  | 'teal';

type Note = {
  color: Color;
  title: string;
  desc: string;
};

type NoteListProps = {
  notes: Array<Note>;
};

const NoteList = ({ notes }: NoteListProps) => {
  const borderClassNames: Record<Note['color'], string> = {
    red: 'border-red-400',
    cyan: 'border-cyan-400',
    gray: 'border-gray-400',
    blue: 'border-blue-400',
    green: 'border-green-400',
    teal: 'border-teal-400',
    purple: 'border-purple-400',
    yellow: 'border-yellow-400',
    orange: 'border-orange-400',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {notes.map((note) => (
        <div
          className={twMerge(
            `flex flex-col pl-2 pr-4 gap-1 border-l min-h-12`,
            borderClassNames[note.color]
          )}
        >
          <Text color={note.color}>{note.title}</Text>
          <Text size="xs" color="textDefault">
            {note.desc}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
