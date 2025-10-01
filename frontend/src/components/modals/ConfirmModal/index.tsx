import { useCallback, useState } from 'react';
import Text from '../../Text';
import Button from '../../Button';
import { createRoot } from 'react-dom/client';
import Input from '../../Input';

type ConfirmModalProps = {
  title: string;
  titleColor: 'red';
  message: string;
  confirmText: string;
  confirmationPhrase?: string;
  cancelText?: string;
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
};

type ConfirmParameters = Omit<ConfirmModalProps, 'onConfirm' | 'onCancel'> & {
  onConfirm?: VoidFunction;
  onCancel?: VoidFunction;
};

const ConfirmModal = ({
  title,
  titleColor,
  message,
  confirmText,
  confirmationPhrase,
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const [input, setInput] = useState('');

  const confirmButtonDisabled =
    confirmationPhrase !== undefined && input !== confirmationPhrase;

  return (
    <div className="fixed z-50 inset-0 bg-black/50">
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg p-6 shadow-lg w-full max-w-[calc(100%-2rem)] sm:max-w-lg bg-gray-900 border border-gray-700 flex flex-col gap-2">
        <Text size="lg" color={titleColor} className="font-bold">
          {title}
        </Text>
        <Text>{message}</Text>
        {confirmationPhrase ? (
          <Input
            className="w-full"
            placeholder={`${confirmationPhrase}`}
            onChange={(e) => setInput(e.target.value)}
          />
        ) : null}
        <div className="flex justify-end gap-2 mt-2">
          <Button color="lightGray" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            color="red"
            varient="fill"
            onClick={onConfirm}
            disabled={confirmButtonDisabled}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const useConfirmModal = () => {
  const confirm = useCallback(
    ({ onConfirm, onCancel, ...params }: ConfirmParameters) => {
      const tempElmt = document.createElement('div');
      document.body.append(tempElmt);
      const root = createRoot(tempElmt);

      const handleConfirm = () => {
        tempElmt.remove();
        onConfirm?.();
      };

      const handleCancel = () => {
        tempElmt.remove();
        onCancel?.();
      };

      root.render(
        <ConfirmModal
          {...params}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      );
    },
    []
  );

  return {
    confirm,
  };
};
