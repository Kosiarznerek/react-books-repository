export interface UserUpdate {
  login?: string;
  plainPassword?: string;
  name?: string;
  surname?: string;
  isAdmin?: boolean;
  isLocked?: boolean;
  favouriteBooksIds?: string[];
}
