export interface User {
  id: string;
  login: string;
  name: string;
  surname: string;
  isAdmin: boolean;
  isLocked: boolean;
  favouriteBooksIds: string[];
}
