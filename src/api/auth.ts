import { setJwtToken } from "@/api/route";
import { LoginResponse } from "@/app/types";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed with status: ${response.status}`);
  }

  const data = await response.json();
  const token = data.token;

  if (!token) {
    throw new Error("Token not found in response.");
  }

  setJwtToken(token);
  return data;
};
