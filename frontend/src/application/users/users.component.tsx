import './users.style.css';
import Card from '@leafygreen-ui/card';
import React, { useEffect, useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user/user.model';
import { AuthenticationContext, authenticationContext } from '../../authentication/authentication.context';

export default function Users(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  const authentication: AuthenticationContext = React.useContext(authenticationContext);

  const [collection, setCollection] = useState<User[] | undefined>();

  const handleUserItemClick = (user: User): void => {
    const currentUser: User | undefined = authentication.bearerTokenAsUser();

    if (currentUser?.id === user.id) {
      navigate('me/get-one');
    } else {
      navigate(`${user.id}/get-one`);
    }
  }

  const loadUsers = async () => {
    const users: User[] = await UsersService.findAll()
    setCollection(users);
  }

  useEffect(() => {
    if (Array.isArray(collection)) {
      return;
    }

    loadUsers();
  }, [collection]);

  if (!Array.isArray(collection)) {
    return (
      <Card className="users--card" as="div">Loading available users</Card>
    );
  }

  if (collection.length === 0) {
    return (
      <Card className="users--card" as="div">No users available</Card>
    );
  }

  return (
    <ul id="users--list">
      {
        collection.map(user => (
          <Card
            as="li"
            key={user.id}
            onClick={() => handleUserItemClick(user)}
            className="users--card users--card-item">
            ({user.isAdmin ? 'admin' : 'user'}) {user.name} {user.surname}
          </Card>
        ))
      }
    </ul>
  );
}
