import { Application } from 'express';
import * as express from 'express';
import { DefaultConfig } from './config/default';
import * as mongoose from 'mongoose';
import Q = require('q');
import { AppModel } from './models/app.model';
import bodyParser = require('body-parser');
import { Routes } from './routes';
import { userSeed } from './seed/user.seed';
import { UserModel } from './models/user.model';
import { userSchema } from './schemas/user.schema';
import * as passport from 'passport';
import { Jwt } from './authentication/jwt';

export class AppServer {
  public app: Application;
  public model: AppModel;

  constructor() {
    this.model = Object();
    this.app = express();
  }

  public static bootstrap(): AppServer {
    return new AppServer();
  }

  public init() {
    this.initDb();

    this.app.listen(DefaultConfig.port);
    console.log('listening on port', DefaultConfig.port);

    Jwt.create().init(this);
    this.app.use(passport.initialize());

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.initRoot();

    this.initRoutes();
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

    this.model.user = connection.model<UserModel>('User', userSchema);

    this.populateUsers();
  }

  private initRoutes() {
    this.app.use((req, res, next) => {
      console.log('Processing ' + req.method + ' to ' + req.originalUrl);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'POST, GET, PUT, DELETE, OPTIONS'
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'origin, x-requested-with, content-type, Authorization'
      );
      next();
    });

    Routes.create().init(this);
  }

  private populateUsers() {
    console.log('seeding users');
    for (let i = 0; i < userSeed.length; i++) {
      const user = userSeed[i];
      this.model.user.findOne({ name: user.username }, (err, res) => {
        this.handleMongooseError(err);
        if (res) {
          this.model.user.update(
            { _id: res._id },
            user,
            this.handleMongooseError
          );
        } else {
          this.model.user.create(user, this.handleMongooseError);
        }
      });
    }
  }

  private handleMongooseError(err: Error) {
    if (err) {
      console.error({ message: err.message });
      throw err;
    }
  }
}
