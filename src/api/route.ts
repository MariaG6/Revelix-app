import Cookies from "js-cookie"; 

// Función para establecer el token JWT en una cookie
export const setJwtToken = (token: string): void => {
  Cookies.set('jwtToken', token, {
    secure: process.env.NODE_ENV === 'production', // Asegura que la cookie solo se envíe a través de HTTPS en producción
    sameSite: 'Strict', // Previene que la cookie se envíe en solicitudes de sitios cruzados
    expires: 1, // Expiración de la cookie en 1 día
    path: '/' // Ruta de la cookie raíz 
  });
};

// Función para obtener el token JWT de una cookie
export const getJwtToken = (): string | undefined => {
  const token = Cookies.get('jwtToken'); 
  return token; 
};

// Función para eliminar el token JWT de una cookie
export const removeJwtToken = (): void => {
  const token = Cookies.get('jwtToken'); 
  if (token) {
    Cookies.remove('jwtToken', { path: '/' }); // Elimina la cookie si el token existe
  } else {
    console.log('No JWT token found');
  }
};