import * as passport from 'passport';
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';
import { DefaultConfig } from '../config/default';
import { AppServer } from '../app-server';
import { User } from '../interfaces/user';

export class Jwt {
  private options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: DefaultConfig.authentication.token.secret,
    issuer: DefaultConfig.authentication.token.issuer,
    audience: DefaultConfig.authentication.token.audience
  };

  private server: AppServer;

  public static create(): Jwt {
    return new Jwt();
  }

  public init(server: AppServer) {
    this.server = server;

    passport.use(
      new Strategy(this.options, (payload, done) => {
        console.log('strategy', payload);
        this.server.model.user
          .findById(payload.sub)
          .exec((err: Error, user: User) => {
            return done(null, user, payload);
          });
        // return done();
      })
    );
  }
}
