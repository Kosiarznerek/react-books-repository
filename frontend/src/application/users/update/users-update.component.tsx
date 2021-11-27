import _ from 'lodash';
import Card from '@leafygreen-ui/card';
import TextInput from '@leafygreen-ui/text-input';
import Button, { Variant } from '@leafygreen-ui/button';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Select, Option, Size } from '@leafygreen-ui/select';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import Toast from '@leafygreen-ui/toast';
import { User } from '../../../interfaces/user/user.model';
import { UsersService } from '../../../services/users.service';
import './users-update.style.css';
import React from 'react';
import { AuthenticationContext, authenticationContext } from '../../../authentication/authentication.context';
import { UserUpdate } from '../../../interfaces/user/user-update.model';

export default function UsersUpdate(): JSX.Element {

  const { id: userId = 'me' } = useParams();
  const [user, setUser] = useState<User | undefined>();
  const [plainPassword, setPlainPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const updateUser = async (user: User): Promise<User> => {
    const model: UserUpdate = {
      name: user.name,
      surname: user.surname,
      isAdmin: user.isAdmin,
      isLocked: user.isLocked,
    }

    if (plainPassword) {
      model.plainPassword = plainPassword;
    }

    if (userId === 'me') {
      return UsersService.updateOneByPayload(model);
    } else {
      return UsersService.updateOneById(user.id, model);
    }
  }

  const handleFormSubmission = async (event: SyntheticEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!user) {
      return;
    }

    try {
      await updateUser(user);

      if (plainPassword && userId === 'me') {
        navigate('/', { replace: true });
      } else {
        navigate('../get-one');
      }
    } catch (error: unknown) {
      const messages: string[] | undefined = _.get(error, 'response.data.message');
      setErrorMessage(messages?.join() ?? 'Something went wrong');
    }
  }

  if (user === undefined) {
    return (
      <Card className="users-update--card" as="p">
        Loading user data
      </Card>
    )
  }

  if (!user) {
    return (
      <Card className="users-update--card" as="p">
        Unable to find user with specifid id
      </Card>
    )
  }

  return (
    <>
      <form className="users-update--form" onSubmit={handleFormSubmission}>
        <TextInput
          label="Password"
          placeholder="Password"
          required={false}
          handleValidation={() => true}
          onChange={event => setPlainPassword(event.currentTarget.value)}
          value={plainPassword}
        />
        <Button
          type="submit"
          variant={Variant.Default}
          darkMode={true}
          size={Size.Default}
          disabled={false}
        >
          Change password
        </Button>
      </form>

      <br />
      <br />

      <form className="users-update--form" onSubmit={handleFormSubmission}>
        <TextInput
          label="Name"
          placeholder="Set user name"
          handleValidation={() => false}
          onChange={event => setUser(Object.assign({}, user, {
            name: event.currentTarget.value,
          }))}
          value={user.name}
        />
        <TextInput
          label="Surname"
          placeholder="Set user surname"
          handleValidation={() => false}
          onChange={event => setUser(Object.assign({}, user, {
            surname: event.currentTarget.value,
          }))}
          value={user.surname}
        />
        <Select
          label="Is admin"
          placeholder=""
          size={Size.Default}
          disabled={!authentication.bearerTokenAsUser()?.isAdmin}
          value={user.isAdmin ? 'yes' : 'no'}
          onChange={event => setUser(Object.assign({}, user, {
            isAdmin: event === 'yes',
          }))}
        >
          <Option value="yes">Yes</Option>
          <Option value="no">No</Option>
        </Select>
        <Select
          label="Is locked"
          placeholder=""
          size={Size.Default}
          disabled={!authentication.bearerTokenAsUser()?.isAdmin}
          value={user.isAdmin ? 'yes' : 'no'}
          onChange={event => setUser(Object.assign({}, user, {
            isLocked: event === 'yes',
          }))}
        >
          <Option value="yes">Yes</Option>
          <Option value="no">No</Option>
        </Select>
        <Button
          type="submit"
          variant={Variant.Default}
          darkMode={true}
          size={Size.Default}
          disabled={false}
        >
          Update user
        </Button>
      </form>

      <Toast
        variant="warning"
        title="Unable to update user"
        body={errorMessage ?? ''}
        open={errorMessage !== null}
        close={() => setErrorMessage(null)}
      />
    </>

  )
}