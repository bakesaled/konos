import { Application } from 'express';
import { AppServer } from '../app-server';
import { UserRoute } from './user.route';

export class Routes {
  private app: Application;

  public static create(): Routes {
    return new Routes();
  }

  public init(server: AppServer) {
    this.app = server.app;
    this.app.use('/api/user/', UserRoute.create().init(server));
  }
}
