import React from 'react';
import Card from '@leafygreen-ui/card';
import { H1, H2, Body } from '@leafygreen-ui/typography';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthenticationContext, authenticationContext } from '../../../authentication/authentication.context';
import { Book } from '../../../interfaces/book/book.model';
import { BooksService } from '../../../services/books.service';
import './books-get-one.style.css';
import { User } from '../../../interfaces/user/user.model';
import Button, { Size, Variant } from '@leafygreen-ui/button';
import { UsersService } from '../../../services/users.service';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export default function BooksGetOne(): JSX.Element {

  const { id: bookId } = useParams();
  const [book, setBook] = useState<Book | undefined>();
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const navigate: NavigateFunction = useNavigate();
  const authentication: AuthenticationContext = React.useContext(authenticationContext);

  useEffect(() => {
    if (!book && bookId) {
      BooksService.findOne(bookId).then(setBook)
    }

    const user: User | undefined = authentication.bearerTokenAsUser();
    if (user && !currentUser) {
      UsersService.findOneByPayload().then(setCurrentUser)
    }
  }, [book, bookId, authentication, currentUser])

  const handleAddToFavouritesClick = async (book: Book, user: User): Promise<void> => {
    user.favouriteBooksIds.push(book.id);
    await UsersService.updateOneByPayload({
      favouriteBooksIds: user.favouriteBooksIds
    });
    setCurrentUser(Object.assign({}, user));
  }

  const handleRemoveFromFavouritesClick = async (book: Book, user: User): Promise<void> => {
    user.favouriteBooksIds = user.favouriteBooksIds.filter(id => id !== book.id);
    await UsersService.updateOneByPayload({
      favouriteBooksIds: user.favouriteBooksIds
    });
    setCurrentUser(Object.assign({}, user));
  }

  const handleUpdateClick = (): void => navigate('../update');

  const handleRemoveClick = async (book: Book): Promise<void> => {
    await BooksService.removeOne(book.id);
    navigate('../../')
  }

  const getUserFavouriteButton = (book: Book): JSX.Element | null => {
    if (!currentUser) {
      return null;
    }

    const inFavourites: boolean = currentUser.favouriteBooksIds.some(id => id === book.id);
    if (inFavourites) {
      return (
        <Button
          variant={Variant.DangerOutline}
          size={Size.Default}
          disabled={false}
          onClick={() => handleRemoveFromFavouritesClick(book, currentUser)}
        >
          Remove from favourites
        </Button>
      )
    } else {
      return (
        <Button
          variant={Variant.Default}
          size={Size.Default}
          disabled={false}
          onClick={() => handleAddToFavouritesClick(book, currentUser)}
        >
          Add to favourites
        </Button>
      )
    }
  }

  const getAdminActionButtons = (book: Book): JSX.Element => (
    <>
      {getUserFavouriteButton(book)}
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
        onClick={() => handleRemoveClick(book)}
      >
        Remove
      </Button>
    </>
  );

  const getUserActionButtons = (book: Book): JSX.Element => (
    <>
      {getUserFavouriteButton(book)}
    </>
  );

  const getBookActionsCard = (book: Book): JSX.Element | null => {
    if (!currentUser) {
      return null;
    } else {
      return (
        <Card className="books-get-one--card books-get-one--actions" as="div">
          {currentUser.isAdmin ? getAdminActionButtons(book) : getUserActionButtons(book)}
        </Card>
      )
    }

  }

  const getBookDetailsCard = (book: Book): JSX.Element => (
    <Card className="books-get-one--card" as="div">
      <H1>{book.title}</H1>
      <H2>{book.author}</H2>
      <img alt="Book cover" src={book.coverUrl} />
      <Body weight="medium">{book.description}</Body>
    </Card>
  )

  if (book === undefined) {
    return (
      <Card className="books-get-one--card" as="p">
        Loading book data
      </Card>
    )
  }

  if (!book) {
    return (
      <Card className="books-get-one--card" as="p">
        Unable to find book with specifid id
      </Card>
    )
  }

  return (
    <>
      {getBookDetailsCard(book)}
      {getBookActionsCard(book)}
    </>
  )
}
