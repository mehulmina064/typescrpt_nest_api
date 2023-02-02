import { User } from './user.model';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export const UserRepository = {
  provide: USER_REPOSITORY,
  useValue: User,
};
