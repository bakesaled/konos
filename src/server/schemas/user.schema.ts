import { Schema } from 'mongoose';

export let userSchema: Schema = new Schema(<any>{
  name: String
});

userSchema.index({ '$**': 'text' });
