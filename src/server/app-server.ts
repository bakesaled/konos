import { Application } from 'express';
import * as express from 'express';

export class AppServer {
  public app: Application;

  constructor() {
    this.app = express();
  }

  public static bootstrap(): AppServer {
    return new AppServer();
  }

  public init() {
    this.app.listen(3000);
    console.log('listening on port', 3000);
    this.initRoot();
  }

  private initRoot() {
    this.app.get('/', function(req, res) {
      res.sendStatus(200);
    });
  }
}
