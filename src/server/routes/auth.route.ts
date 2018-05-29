import { User } from '../interfaces/user';
import { Request, Response, Router } from 'express';
import { AppServer } from '../app-server';
import { Token } from '../authentication/token';

export class AuthRoute {
  private router: Router;
  private server: AppServer;

  public static create(): AuthRoute {
    return new AuthRoute();
  }

  constructor() {
    this.router = Router();
  }

  public init(server: AppServer) {
    this.server = server;

    return this.router.post('/login', (req: Request, res: Response) => {
      // Return all users
      this.server.model.user.findOne(
        { username: req.body.username },
        '',
        (err: Error, user) => {
          if (err) {
            return res.status(500).send({ message: err.message });
          }
          console.log('here');
          if (user) {
            const result = {
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              accessToken: Token.generate(user._id)
            };
            return res.status(200).send(result);
          }
          return res.status(401).send([]);
        }
      );
    });
  }
}
