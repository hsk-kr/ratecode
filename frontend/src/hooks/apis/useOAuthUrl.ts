import { useMutation } from '@tanstack/react-query';
import { network } from '../../utils/network';

export type OAuthUrlResponse = {
  oauthUrl: string;
};

export default function useOAuthUrl() {
  const { mutate: getOAuthUrl, isPending: isOAuthUrlLoading } = useMutation({
    mutationFn: async () => {
      const res = await network.get<OAuthUrlResponse>('/auth/url');
      return res.data;
    },
  });

  return { getOAuthUrl, isOAuthUrlLoading };
}
