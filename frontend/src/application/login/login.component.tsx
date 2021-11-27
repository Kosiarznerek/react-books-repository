import './login.style.css';
import TextInput from '@leafygreen-ui/text-input';
import React, { SyntheticEvent, useState } from 'react';
import { AuthService } from '../../services/auth.service';
import { AuthenticationContext, authenticationContext } from '../../authentication/authentication.context';
import Button, { Size, Variant } from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';
import { H2 } from '@leafygreen-ui/typography';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import Toast from '@leafygreen-ui/toast';

export default function Login(): JSX.Element {

  const [login, setLogin] = useState<string>('');
  const [plainPassword, setPlainPassword] = useState<string>('');

  const [errorToastIsOpen, setErrorToastIsOpen] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();
  const auhentication: AuthenticationContext = React.useContext(authenticationContext);

  const handleLoginChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    setLogin(event.currentTarget.value);
  }

  const handlePlainPasswordChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    setPlainPassword(event.currentTarget.value);
  }

  const handleUnauthorisedButtonClick = (): void => {
    auhentication.setToken(null);
    navigate('/books', { replace: true });
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!login || !plainPassword) {
      return;
    }

    try {
      const bearerToken: string = await AuthService.signIn({
        login,
        plainPassword,
      });
      auhentication.setToken(bearerToken);
      navigate('/books', { replace: true });
    } catch {
      setErrorToastIsOpen(true);
    }
  }

  return (
    <div id="login--card-container">
      <Card id="login--card" as="form" onSubmit={handleFormSubmit}>
        <H2>Books database</H2>
        <TextInput
          type="text"
          label="Login"
          handleValidation={() => true}
          placeholder="Place your login"
          onChange={handleLoginChange}
          value={login}
        />
        <TextInput
          type="password"
          label="Password"
          handleValidation={() => true}
          placeholder="Place your password"
          onChange={handlePlainPasswordChange}
          value={plainPassword}
        />
        <Button
          type="submit"
          variant={Variant.Primary}
          size={Size.Default}
          disabled={false}
        >
          Login
        </Button>
        <Button
          type="button"
          variant={Variant.Default}
          size={Size.Default}
          disabled={false}
          onClick={handleUnauthorisedButtonClick}
        >
          Continue unathorised
        </Button>
      </Card>

      <Toast
        variant="warning"
        title="Authentication response"
        body="Invalid login, password or your account has been locked."
        open={errorToastIsOpen}
        close={() => setErrorToastIsOpen(false)}
      />
    </div>
  )

}
