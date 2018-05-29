import { Router, Request, Response } from 'express';
import { AppServer } from '../app-server';
import { User } from '../interfaces/user';
import * as passport from 'passport';

export class UserRoute {
  private router: Router;
  private server: AppServer;

  public static create(): UserRoute {
    return new UserRoute();
  }

  constructor() {
    this.router = Router();
  }

  public init(server: AppServer) {
    this.server = server;

    return this.router.get(
      '/',
      passport.authenticate('jwt', { session: false }),
      (req: Request, res: Response) => {
        // Return all users
        this.server.model.user.find({}, '', (err: Error, users) => {
          const userResults: Array<User> = [];
          if (err) {
            return res.status(500).send({ message: err.message });
          }
          if (users) {
            users.forEach(cat => {
              userResults.push(cat);
            });
          }
          res.send(userResults);
        });
      }
    );
  }
}
