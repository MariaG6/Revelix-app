import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getJwtToken } from './route';

// Función middleware que se ejecuta en cada solicitud
export function middleware(request: NextRequest) {
  // Obtiene el token JWT
  const token = getJwtToken();

  // Si no hay token, redirige al usuario a la página de inicio de sesión
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si hay token, permite que la solicitud continúe
  return NextResponse.next();
}

// Configuración del middleware para que se aplique solo a la ruta raíz
export const config = {
  matcher: ['/'],
};