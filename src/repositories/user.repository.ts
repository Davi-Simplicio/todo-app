import { Injectable } from "@angular/core";
import { User } from "src/models/users/user";
import { users } from '../data/users';

@Injectable()
export class UserRepository {

    constructor(){

    }
    getUsers(): User[]{
        return users;
    }
}