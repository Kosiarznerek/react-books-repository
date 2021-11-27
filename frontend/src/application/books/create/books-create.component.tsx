import _ from 'lodash';
import Button, { Size, Variant } from '@leafygreen-ui/button';
import TextArea from '@leafygreen-ui/text-area';
import TextInput from '@leafygreen-ui/text-input';
import { SyntheticEvent, useState } from 'react';
import { BooksService } from '../../../services/books.service';
import './books-create.style.css';
import Toast from '@leafygreen-ui/toast';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Book } from '../../../interfaces/book/book.model';

export default function BooksCreate(): JSX.Element {

  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [coverUrl, setCoverUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate: NavigateFunction = useNavigate();

  const handleFormSubmission = async (event: SyntheticEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      const response: Book = await BooksService.createOne({
        title,
        author,
        coverUrl,
        description,
      });
      navigate(`../${response.id}/get-one`);
    } catch (error: unknown) {
      const messages: string[] | undefined = _.get(error, 'response.data.message');
      setErrorMessage(messages?.join() ?? 'Something went wrong');
    }
  }

  return (
    <form id="books-create--form" onSubmit={handleFormSubmission}>
      <TextInput
        label="Title"
        placeholder="Enter book title"
        handleValidation={() => false}
        onChange={event => setTitle(event.currentTarget.value)}
        value={title}
      />
      <TextInput
        label="Author"
        placeholder="Enter book author"
        handleValidation={() => false}
        onChange={event => setAuthor(event.currentTarget.value)}
        value={author}
      />
      <TextInput
        label="Cover URL"
        placeholder="Enter book cover url"
        handleValidation={() => false}
        onChange={event => setCoverUrl(event.currentTarget.value)}
        value={coverUrl}
      />
      <TextArea
        label="Description"
        handleValidation={() => false}
        onChange={event => setDescription(event.currentTarget.value)}
        value={description}
      />
      <Button
        type="submit"
        variant={Variant.Default}
        darkMode={true}
        size={Size.Default}
        disabled={false}
      >
        Add new book to collection
      </Button>

      <Toast
        variant="warning"
        title="Unable to add book"
        body={errorMessage ?? ''}
        open={errorMessage !== null}
        close={() => setErrorMessage(null)}
      />
    </form>
  )
}
