import { UserModel } from './user.model';
import { Model } from 'mongoose';

export interface AppModel {
  user: Model<UserModel>;
}
