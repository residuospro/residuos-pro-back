import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/users";
import { Request, Response } from "express";
import auth from "basic-auth";

class LoginController {
  async login(req: Request, res: Response) {
    try {
      const credentials = auth(req);

      if (!credentials) {
        return res.status(401).send({ message: "Credenciais inválidas" });
      }

      const username = credentials.name;
      const password = credentials.pass;

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
