import { Schema } from 'mongoose';

export let userSchema: Schema = new Schema(<any>{
  username: String,
  password: String,
  firstName: String,
  lastName: String
});

userSchema.index({ '$**': 'text' });
