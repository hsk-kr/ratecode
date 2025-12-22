import { useMutation, useQuery } from '@tanstack/react-query';
import { network } from '../../utils/network';
import type { SupportedLanguage } from '../../utils/code';
import type { AxiosError } from 'axios';

export type CreateCodeResponse = {
  uuid: string;
};

export type GetRandomCodeResponse = {
  uuid: string;
};

export type GetCodeResponse = {
  uuid: string;
  code: string;
  language: SupportedLanguage;
  createdAt: string;
  views: number;
};

export default function useCodeApis({ uuid }: { uuid?: string }) {
  const { mutate: createCode, isPending: isCreateCodePending } = useMutation({
    mutationFn: async (params: {
      code: string;
      language: SupportedLanguage;
    }) => {
      const res = await network.post<CreateCodeResponse>('/codes', params);
      return res.data;
    },
  });
  const { mutate: getRandomCode, isPending: isGetRandomCodePending } =
    useMutation({
      mutationFn: async () => {
        const res = await network.get<GetRandomCodeResponse>('/codes/random');
        return res.data;
      },
    });
  const {
    data: code,
    isLoading: isGetCodeLoading,
    error: getCodeError,
  } = useQuery<GetCodeResponse, AxiosError>({
    queryKey: ['codes'],
    queryFn: async () => {
      const res = await network.get(`/codes/${uuid}`);
      return res.data;
    },
    enabled: uuid !== undefined,
    retry: false,
  });

  return {
    createCode,
    isCreateCodePending,
    getRandomCode,
    isGetRandomCodePending,
    code,
    isGetCodeLoading,
    getCodeError,
  };
}
