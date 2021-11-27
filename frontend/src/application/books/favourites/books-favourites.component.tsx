import Card from '@leafygreen-ui/card';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Book } from '../../../interfaces/book/book.model';
import { User } from '../../../interfaces/user/user.model';
import { BooksService } from '../../../services/books.service';
import { UsersService } from '../../../services/users.service';
import './books-favourites.style.css';

export default function BooksFavourites(): JSX.Element {

  const [collection, setCollection] = useState<Book[] | undefined>();
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (collection) {
      return;
    }

    Promise.all([
      BooksService.findAll(),
      UsersService.findOneByPayload(),
    ]).then(([booksCollection, user]) => {
      setCurrentUser(user);
      setCollection(booksCollection.filter(value => user.favouriteBooksIds.includes(value.id)));
    })
  }, [collection])

  const handleBookItemClick = (book: Book): void => {
    navigate(`../${book.id}/get-one`);
  }

  if (!currentUser || !Array.isArray(collection)) {
    return (
      <Card className="books-favourites--card" as="div">
        Loading your favourites books
      </Card>
    );
  }

  if (collection.length === 0) {
    return (
      <Card className="books-favourites--card" as="div">
        You do not have any favourites books
      </Card>
    );
  }

  return (
    <ul id="books-favourites--list">
      {
        collection.map(book => (
          <Card
            as="li"
            key={book.id}
            onClick={() => handleBookItemClick(book)}
            className="books-favourites--card books-favourites--card-item">
            {book.title}
          </Card>
        ))
      }
    </ul>
  );
}
