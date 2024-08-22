import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../config"

export const generateToken = (userId: number): string => {
  const payload = {
      userId: userId
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  return token;
}

export const  authenticateToken = (token : string) : Promise<Boolean> => (
  new Promise((resolve) => {
    jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
      if (err) resolve(false)
      else resolve(true)
  });
  })
)