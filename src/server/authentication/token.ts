import { DefaultConfig } from '../config/default';
import * as jwt from 'jsonwebtoken';

export class Token {
  public static generate(userId: string) {
    const expiresIn = '1 hour';
    const audience = DefaultConfig.authentication.token.audience;
    const issuer = DefaultConfig.authentication.token.issuer;
    const secret = DefaultConfig.authentication.token.secret;

    const token = jwt.sign({}, secret, {
      expiresIn: expiresIn,
      audience: audience,
      issuer: issuer,
      subject: userId.toString()
    });

    return token;
  }
}
