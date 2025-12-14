import { useMutation } from '@tanstack/react-query';
import { network } from '../../utils/network';
import type { SupportedLanguage } from '../../utils/code';

export type CreateCodeResponse = {
  uuid: string;
};

export default function useCodeApis() {
  const { mutate: createCode, isPending: isCreateCodePending } = useMutation({
    mutationFn: async (params: {
      code: string;
      language: SupportedLanguage;
    }) => {
      const res = await network.post<CreateCodeResponse>('/codes', params);
      return res.data;
    },
  });

  return { createCode, isCreateCodePending };
}
