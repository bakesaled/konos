import { User } from '../interfaces/user';
import { Document } from 'mongoose';

export interface UserModel extends User, Document {}
