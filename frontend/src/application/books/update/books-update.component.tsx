import _ from 'lodash';
import Button, { Size, Variant } from '@leafygreen-ui/button';
import TextArea from '@leafygreen-ui/text-area';
import TextInput from '@leafygreen-ui/text-input';
import { SyntheticEvent, useEffect, useState } from 'react';
import { BooksService } from '../../../services/books.service';
import './books-update.style.css';
import Toast from '@leafygreen-ui/toast';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import './books-update.style.css';
import { Book } from '../../../interfaces/book/book.model';
import Card from '@leafygreen-ui/card';

export default function BooksUpdate(): JSX.Element {
  const { id: bookId } = useParams();
  const [book, setBook] = useState<Book | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!book && bookId) {
      BooksService.findOne(bookId).then(setBook)
    }
  }, [book, bookId])

  const handleFormSubmission = async (event: SyntheticEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!bookId || !book) {
      return;
    }

    try {
      await BooksService.updateOne(bookId, {
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        description: book.description,
      });
      navigate('../get-one');
    } catch (error: unknown) {
      const messages: string[] | undefined = _.get(error, 'response.data.message');
      setErrorMessage(messages?.join() ?? 'Something went wrong');
    }
  }

  if (book === undefined) {
    return (
      <Card className="books-update--card" as="p">
        Loading book data
      </Card>
    )
  }

  if (!book) {
    return (
      <Card className="books-update--card" as="p">
        Unable to find book with specifid id
      </Card>
    )
  }

  return (
    <form id="books-update--form" onSubmit={handleFormSubmission}>
      <TextInput
        label="Title"
        placeholder="Enter book title"
        handleValidation={() => false}
        onChange={event => setBook(Object.assign({}, book, {
          title: event.currentTarget.value
        }))}
        value={book.title}
      />
      <TextInput
        label="Author"
        placeholder="Enter book author"
        handleValidation={() => false}
        onChange={event => setBook(Object.assign({}, book, {
          author: event.currentTarget.value
        }))}
        value={book.author}
      />
      <TextInput
        label="Cover URL"
        placeholder="Enter book cover url"
        handleValidation={() => false}
        onChange={event => setBook(Object.assign({}, book, {
          coverUrl: event.currentTarget.value
        }))}
        value={book.coverUrl}
      />
      <TextArea
        label="Description"
        handleValidation={() => false}
        onChange={event => setBook(Object.assign({}, book, {
          description: event.currentTarget.value
        }))}
        value={book.description}
      />
      <Button
        type="submit"
        variant={Variant.Default}
        darkMode={true}
        size={Size.Default}
        disabled={false}
      >
        Update book
      </Button>

      <Toast
        variant="warning"
        title="Unable to udpate book"
        body={errorMessage ?? ''}
        open={errorMessage !== null}
        close={() => setErrorMessage(null)}
      />
    </form>
  )
}
