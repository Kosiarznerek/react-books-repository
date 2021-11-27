import _ from 'lodash';
import Button, { Variant } from '@leafygreen-ui/button';
import { Select, Option, Size } from '@leafygreen-ui/select';
import TextInput from '@leafygreen-ui/text-input';
import { SyntheticEvent, useState } from 'react';
import { UserCreate } from '../../../interfaces/user/user-create.model';
import { UsersService } from '../../../services/users.service';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import './users-create.style.css';
import Toast from '@leafygreen-ui/toast';
import { User } from '../../../interfaces/user/user.model';

export default function UsersCreate(): JSX.Element {

  const navigate: NavigateFunction = useNavigate();

  const [user, setUser] = useState<UserCreate>({
    login: '',
    plainPassword: '',
    name: '',
    surname: '',
    isAdmin: false,
    isLocked: false,
    favouriteBooksIds: [],
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmission = async (event: SyntheticEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      const response: User = await UsersService.createOne(user);
      navigate(`../${response.id}/get-one`);
    } catch (error: unknown) {
      const messages: string[] | undefined = _.get(error, 'response.data.message');
      setErrorMessage(messages?.join() ?? 'Something went wrong');
    }
  }

  return (
    <form id="users-create--form" onSubmit={handleFormSubmission}>
      <TextInput
        label="Login"
        placeholder="Set user login"
        handleValidation={() => false}
        onChange={event => setUser(Object.assign({}, user, {
          login: event.currentTarget.value,
        }))}
        value={user.login}
      />
      <TextInput
        label="Password"
        placeholder="Set user password"
        handleValidation={() => false}
        onChange={event => setUser(Object.assign({}, user, {
          plainPassword: event.currentTarget.value,
        }))}
        value={user.plainPassword}
      />
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
        Add new user to collection
      </Button>

      <Toast
        variant="warning"
        title="Unable to add user"
        body={errorMessage ?? ''}
        open={errorMessage !== null}
        close={() => setErrorMessage(null)}
      />
    </form>
  )
}
