import { User } from './user';

export interface Repo {
  name: string;
  description: string;
  url: string;
  updatedAt: string;
  user: User;
}
