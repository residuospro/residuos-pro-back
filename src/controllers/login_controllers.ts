import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/users";
import { Request, Response } from "express";

class LoginController {
  async login(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Basic ")) {
        return null;
      }

      const base64Credentials = authHeader.slice(6);

      const credentials = Buffer.from(base64Credentials, "base64").toString(
        "utf-8"
      );

      if (!credentials) {
        return res.status(401).send({ message: "Credenciais inválidas" });
      }

      const [username, password] = credentials.split(":");

      // Verificar se o usuário existe no banco de dados
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }

      // Verificar se a senha está correta
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Senha incorreta" });
      }

      // Gerar o token JWT com a permissão do usuário
      const token = jwt.sign(
        {
          permission: user.role,
          name: user.name,
          username: user.username,
        },
        String(process.env.SECRET_KEY),
        { expiresIn: "5h" }
      );

      // Retornar o token JWT para o cliente
      res.json({ token });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  }
}

export default LoginController;
