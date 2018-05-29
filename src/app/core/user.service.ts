import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../server/interfaces/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>('http://localhost:3000/api/user');
  }
}
