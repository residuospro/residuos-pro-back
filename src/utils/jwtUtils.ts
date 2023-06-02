import jwt, { JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
  name: string;
  username: string;
  permission: string[];
  exp: number;
}

export const userInfo = (jwtToken: string): UserPayload | null => {
  const decodedToken = jwt.decode(jwtToken) as UserPayload;

  if (decodedToken && decodedToken.exp) {
    const { exp, name, username, permission } = decodedToken;

    return { exp, name, username, permission };
  }
  return null;
};
