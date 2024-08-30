export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage?.getItem('token');
};
export const setToken = (token: string) => {
  if (typeof window === 'undefined') return;
  localStorage && localStorage.setItem('token', token);
};
export const removeToken = () => {
  if (typeof window === 'undefined') return;
  localStorage && localStorage?.removeItem('token');
};
