import { Router, Request, Response } from 'express';
import { AppServer } from '../app-server';
import { User } from '../interfaces/user';

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

    return this.router.get('/', (req: Request, res: Response) => {
      // Return all users
      this.server.model.user.find({}, '', (err: Error, categories) => {
        const users: Array<User> = [];
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        if (categories) {
          categories.forEach(cat => {
            users.push(cat);
          });
        }
        res.send(users);
      });
    });
  }
}
