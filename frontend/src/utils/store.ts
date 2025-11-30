export const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const clearAccessToken = () => {
  localStorage.removeItem('accessToken');
  window.location.href = '/';
};
