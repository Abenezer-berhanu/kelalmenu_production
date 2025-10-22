import bcrypt from "bcrypt";

export async function hashPassword(plainPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(10); // 10 is a good default cost factor
  const hashed = await bcrypt.hash(plainPassword, salt);
  return hashed;
}

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}
