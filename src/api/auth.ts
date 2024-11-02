import { setJwtToken } from "@/api/route";
import { LoginResponse } from "@/app/types";

// Función para autenticar al usuario e inicar sesión 
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {

  // Solicitud POST a la API para iniciar sesión
  const response = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }), // Envía email y contraseña
  });

  if (!response.ok) {
    throw new Error(`Login failed with status: ${response.status}`);
  }
  // Convierte la respuesta en JSON
  const data = await response.json();
  const token = data.token;

  if (!token) {
    throw new Error("Token not found in response.");
  }
  // Establece el token en JWT
  setJwtToken(token);
  return data;
};
