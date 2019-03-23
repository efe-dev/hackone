import {IRole} from "./role.model";

export interface IUser {
  email: string;
  password: string;
  roles: IRole[];
}
