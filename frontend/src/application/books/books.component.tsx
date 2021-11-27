import Card from '@leafygreen-ui/card';
import TextInput from '@leafygreen-ui/text-input';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Book } from '../../interfaces/book/book.model';
import { BooksService } from '../../services/books.service';
import './books.style.css';
import { useNavigate, NavigateFunction } from 'react-router-dom';

export default function Books(): JSX.Element {

  const navigate: NavigateFunction = useNavigate();

  const [books, setBooks] = useState<Book[]>([]);
  const [collection, setCollection] = useState<Book[] | undefined>();
  const [titleSearch, setTitleSearch] = useState<string>('');

  const handleTitleSearchInputChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    const value: string = event.currentTarget.value;
    setTitleSearch(value);

    if (Array.isArray(collection)) {
      const search: string = value.toLowerCase();
      const filtedBooks: Book[] = books.filter(({ title }) => title.toLowerCase().match(search));
      setCollection(filtedBooks);
    }
  }

  const titleSearchInput: JSX.Element = (
    <div id="books--title-search-input">
      <TextInput
        type="text"
        label="Search by title"
        placeholder="Enter book title"
        handleValidation={() => false}
        onChange={handleTitleSearchInputChange}
        value={titleSearch}
      />
    </div>
  )

  const handleBookItemClick = (book: Book): void => {
    navigate(`${book.id}/get-one`);
  }

  const loadBooks = async () => {
    const books: Book[] = await BooksService.findAll();
    setBooks(books);
    setCollection(books);
  }

  useEffect(() => {
    if (Array.isArray(collection)) {
      return;
    }

    loadBooks();
  }, [collection]);

  if (!Array.isArray(collection)) {
    return (
      <Card className="books--card" as="div">Loading available books</Card>
    );
  }

  if (collection.length === 0) {
    return (
      <>
        {titleSearchInput}
        <Card className="books--card" as="div">No books available</Card>
      </>
    );
  }

  return (
    <>
      {titleSearchInput}
      <ul id="books--list">
        {
          collection.map(book => (
            <Card
              as="li"
              key={book.id}
              onClick={() => handleBookItemClick(book)}
              className="books--card books--card-item">
              {book.title}
            </Card>
          ))
        }
      </ul>
    </>
  );

}
