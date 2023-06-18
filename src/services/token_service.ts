import jwt from "jsonwebtoken";
import TokenModel from "../models/refreshToken";
import User from "../models/users";

let JWT_SECRET = String(process.env.SECRET_KEY);

class TokenService {
  static async generateRefreshToken(userId: string) {
    try {
      const refreshToken = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "2d",
      });
      
      const token = new TokenModel({
        userId,
        refreshToken,
      });
      
      const saveToken = await token.save();

      if (saveToken) return refreshToken;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static generateAcessToken(
    permission: string[],
    name: string,
    username: string,
    company: string
  ): string {
    const token = jwt.sign(
      {
        permission,
        name,
        username,
        company,
      },
      JWT_SECRET,
      { expiresIn: "5h" }
    );
    return token;
  }

  static verifyToken(token: string) {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    return decodedToken;
  }

  static async updateRefreshToken(oldRefreshToken: string, userId: string) {
    const refresh_token = await TokenModel.findOne({
      refreshToken: oldRefreshToken,
    });

    const user = await User.findById(userId);

    if (refresh_token) {
      const token = this.generateAcessToken(
        user.role,
        user.name,
        user.username,
        user.idCompany
      );

      const refreshToken = this.generateRefreshToken(user.id);

      return { token, refreshToken };
    }
    return null;
  }
}

export default TokenService;