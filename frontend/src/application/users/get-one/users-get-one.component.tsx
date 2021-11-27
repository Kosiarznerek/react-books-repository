import Button, { Size, Variant } from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';
import React from 'react';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { AuthenticationContext, authenticationContext } from '../../../authentication/authentication.context';
import { User } from '../../../interfaces/user/user.model';
import { UsersService } from '../../../services/users.service';
import './users-get-one.style.css';

export default function UsersGetOne(): JSX.Element {

  const { id: userId = 'me' } = useParams();
  const [user, setUser] = useState<User | undefined>();

  const navigate: NavigateFunction = useNavigate();
  const authentication: AuthenticationContext = React.useContext(authenticationContext);

  useEffect(() => {
    if (user || !userId) {
      return
    }

    if (userId === 'me') {
      UsersService.findOneByPayload().then(setUser);
    } else {
      UsersService.findOneById(userId).then(setUser);
    }
  }, [user, userId])

  const handleRemoveClick = async (): Promise<void> => {
    if (userId === 'me') {
      await UsersService.removeOneByPayload();
      authentication.setToken(null);
      navigate('/', { replace: true });
    } else {
      await UsersService.removeOneById(userId);
      navigate('../..');
    }
  }

  const handleUpdateClick = (): void => navigate('../update');

  const getUserDetailsCard = (user: User): JSX.Element => (
    <Card className="users-get-one--card" as="div">
      <div>
        <strong>Id</strong><p>{user.id}</p>
      </div>
      <div>
        <strong>Login</strong><p>{user.login}</p>
      </div>
      <div>
        <strong>Name</strong><p>{user.name}</p>
      </div>
      <div>
        <strong>Surname</strong><p>{user.surname}</p>
      </div>
      <div>
        <strong>Is admin</strong><p>{user.isAdmin ? 'true' : 'false'}</p>
      </div>
      <div>
        <strong>Is locked</strong><p>{user.isLocked ? 'true' : 'false'}</p>
      </div>
    </Card>
  )

  const userActionsCard: JSX.Element = (
    <Card className="users-get-one--card users-get-one--actions" as="div">
      <Button
        variant={Variant.Default}
        size={Size.Default}
        disabled={false}
        onClick={handleUpdateClick}
      >
        Update
      </Button>
      <Button
        variant={Variant.Danger}
        size={Size.Default}
        disabled={false}
        onClick={handleRemoveClick}
      >
        Remove
      </Button>
    </Card>
  )

  if (user === undefined) {
    return (
      <Card className="users-get-one--card" as="p">
        Loading user data
      </Card>
    )
  }

  if (!user) {
    return (
      <Card className="users-get-one--card" as="p">
        Unable to find user with specifid id
      </Card>
    )
  }

  return (
    <>
      {getUserDetailsCard(user)}
      {userActionsCard}
    </>
  )
}
