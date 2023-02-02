import * as bcrypt from 'bcrypt';

/**
 * Convert plain password to encrypted password
 *
 * @param password : string
 * @param saltRound : number
 *
 * @return Promise<string>
 */
export async function hashPassword(
  password: string,
  saltRound: number = parseInt(process.env.PASSWORD_SALT_ROUND),
) {
  if (!password || !saltRound) {
    return password;
  }
  return bcrypt.hash(password, saltRound);
}

/**
 * Compare the Simple Password with Encrypted Password
 *
 * @param password: string
 * @param hashedPassword : string
 *
 * @return Promise<boolean>
 */
export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  if (!password || !hashPassword) {
    return false;
  }
  return bcrypt.compare(password, hashedPassword);
}
