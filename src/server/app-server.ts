import { Application } from 'express';
import * as express from 'express';
import { DefaultConfig } from './config/default';
import * as mongoose from 'mongoose';
import Q = require('q');

export class AppServer {
  public app: Application;

  constructor() {
    this.app = express();
  }

  public static bootstrap(): AppServer {
    return new AppServer();
  }

  public init() {
    this.initDb();

    this.app.listen(DefaultConfig.port);
    console.log('listening on port', DefaultConfig.port);
    this.initRoot();
  }

  private initRoot() {
    this.app.get('/', function(req, res) {
      res.sendStatus(200);
    });
  }

  private initDb() {
    global.Promise = Q.Promise;
    (<any>mongoose).Promise = global.Promise;
    const connection: mongoose.Connection = mongoose.createConnection(
      DefaultConfig.database,
      DefaultConfig.dbOptions
    );

    console.log(
      `connected to '${connection['name']}' on '${connection['host']}'`
    );
  }
}
