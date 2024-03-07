import bcrypt from "bcrypt";

export default class HashedPassword {
  async hashedPassword(password: string) {
    const saltRounds = 8;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  }
}
