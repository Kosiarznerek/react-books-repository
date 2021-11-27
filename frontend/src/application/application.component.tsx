import './application.style.css';
import { Route, Routes, useLocation, Location, useNavigate, NavigateFunction } from 'react-router-dom';
import Login from './login/login.component';
import Icon from '@leafygreen-ui/icon';
import NotFound from './not-found/not-found.component';
import Users from './users/users.component';
import UsersGetOne from './users/get-one/users-get-one.component';
import UsersCreate from './users/create/users-create.component';
import UsersUpdate from './users/update/users-update.component';
import Books from './books/books.component';
import BooksCreate from './books/create/books-create.component';
import BooksFavourites from './books/favourites/books-favourites.component';
import BooksGetOne from './books/get-one/books-get-one.component';
import BooksUpdate from './books/update/books-update.component';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { AuthenticationContext, authenticationContext } from '../authentication/authentication.context';
import React from 'react';
import { User } from '../interfaces/user/user.model';
import { H3 } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import IconButton from '@leafygreen-ui/icon-button';

export default function Application(): JSX.Element {

  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const authentication: AuthenticationContext = React.useContext(authenticationContext);

  const signOutClickHandler = (): void => {
    authentication.setToken(null);
    navigate('/', { replace: true });
  }

  const authorisedUserNavigation: JSX.Element = (
    <>
      <MenuItem onClick={() => navigate('/books')}>
        Books collection
      </MenuItem>
      <MenuItem onClick={() => navigate('/books/favourites')}>
        My favourites
      </MenuItem>
      <MenuItem onClick={() => navigate('/users/me/get-one')}>
        My account
      </MenuItem>
      <MenuItem onClick={signOutClickHandler}>Sign out</MenuItem>
    </>
  )

  const noneAdminUserNavigation: JSX.Element = (
    <Card id="application--nav">
      <H3>Books database (user)</H3>
      <Menu align="bottom" justify="start" trigger={
        <IconButton darkMode={true} size="large" aria-label="Icon menu">
          <Icon glyph="Menu" fill="#ffffff" />
        </IconButton>
      }>
        {authorisedUserNavigation}
      </Menu>
    </Card >
  )

  const adminUserNavigation: JSX.Element = (
    <Card id="application--nav">
      <H3>Books database (admin)</H3>
      <Menu align="bottom" justify="start" trigger={
        <IconButton darkMode={true} size="large" aria-label="Icon menu">
          <Icon glyph="Menu" fill="#ffffff" />
        </IconButton>
      }>
        <MenuItem onClick={() => navigate('/users/create')}>
          Add user to collection
        </MenuItem>
        <MenuItem onClick={() => navigate('/books/create')}>
          Add book to collection
        </MenuItem>
        <MenuItem onClick={() => navigate('/users')}>
          Users collection
        </MenuItem>
        {authorisedUserNavigation}
      </Menu>
    </Card >
  )

  const unathorisedUserNavigation: JSX.Element = (
    <Card id="application--nav">
      <H3>Books database</H3>
      <IconButton onClick={signOutClickHandler} darkMode={true} size="large" aria-label="Icon menu">
        <Icon glyph="Home" fill="#ffffff" />
      </IconButton>
    </Card >
  )

  const getNavigation = (): JSX.Element | null => {
    const user: User | undefined = authentication.bearerTokenAsUser();

    if (location.pathname === '/') {
      return null;
    }

    if (!user) {
      return unathorisedUserNavigation
    } else if (user.isAdmin) {
      return adminUserNavigation;
    } else {
      return noneAdminUserNavigation;
    }
  }

  const applicationBooksRoutes: JSX.Element = (
    <Route path="books">
      <Route index element={<Books />} />

      <Route path="create" element={
        <AuthenticationGuard isAdmin={true}>
          <BooksCreate />
        </AuthenticationGuard>
      } />

      <Route path="favourites" element={
        <AuthenticationGuard isAdmin={false}>
          <BooksFavourites />
        </AuthenticationGuard>
      } />

      <Route path=":id">
        <Route path="get-one" element={<BooksGetOne />} />
        <Route path="update" element={
          <AuthenticationGuard isAdmin={true}>
            <BooksUpdate />
          </AuthenticationGuard>
        } />
      </Route>
    </Route>
  );

  const applicationUsersRoutes: JSX.Element = (
    <Route path="users">
      <Route index element={
        <AuthenticationGuard isAdmin={true}>
          <Users />
        </AuthenticationGuard>
      } />
      <Route path="create" element={
        <AuthenticationGuard isAdmin={true}>
          <UsersCreate />
        </AuthenticationGuard>
      } />

      <Route path="me">
        <Route path="get-one" element={
          <AuthenticationGuard isAdmin={false}>
            <UsersGetOne />
          </AuthenticationGuard>
        } />
        <Route path="update" element={
          <AuthenticationGuard isAdmin={false}>
            <UsersUpdate />
          </AuthenticationGuard>
        } />
      </Route>

      <Route path=":id">
        <Route path="get-one" element={
          <AuthenticationGuard isAdmin={true}>
            <UsersGetOne />
          </AuthenticationGuard>
        } />
        <Route path="update" element={
          <AuthenticationGuard isAdmin={true}>
            <UsersUpdate />
          </AuthenticationGuard>
        } />
      </Route>
    </Route>
  );

  const applicationRoutes: JSX.Element = (
    <Routes>
      <Route path="" element={<Login />} />
      {applicationBooksRoutes}
      {applicationUsersRoutes}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )

  return (
    <>
      {getNavigation()}
      <div id="application--container">
        {applicationRoutes}
      </div>
    </>
  )

}
