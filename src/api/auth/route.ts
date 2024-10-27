import Cookies from "js-cookie";

export const setJwtToken = (token: string): void => {
  Cookies.set('jwtToken', token, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    expires: 1,
    path: '/'
  });
};

export const getJwtToken = (): string | undefined => {
  const token = Cookies.get('jwtToken');
  return token;
};


export const removeJwtToken = (): void => Cookies.remove('jwtToken');