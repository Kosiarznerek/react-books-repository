import axios from 'axios';
import { AuthenticationStorage } from '../authentication/authentication.storage';
import { environments } from "../environments";
import { BookCreate } from "../interfaces/book/book-create.model";
import { BookUpdate } from "../interfaces/book/book-update.model";
import { Book } from "../interfaces/book/book.model";

export abstract class BooksService {

    public static readonly controllerUrl: string = `${environments.serverOrigin}/${environments.booksController}`;

    public static async findAll(): Promise<Book[]> {
        const response = await axios.get<Book[]>(this.controllerUrl);
        return response.data;
    }

    public static async findOne(id: string): Promise<Book> {
        const response = await axios.get<Book>(`${this.controllerUrl}/${id}`);
        return response.data;
    }

    public static async createOne(model: BookCreate): Promise<Book> {
        const bearerToken: string | null = AuthenticationStorage.value;
        const response = await axios.post<Book>(this.controllerUrl, model, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
        return response.data;
    }

    public static async updateOne(id: string, model: BookUpdate): Promise<Book> {
        const bearerToken: string | null = AuthenticationStorage.value;
        const response = await axios.patch<Book>(`${this.controllerUrl}/${id}`, model, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
        return response.data;
    }

    public static async removeOne(id: string): Promise<void> {
        const bearerToken: string | null = AuthenticationStorage.value;
        await axios.delete<void>(`${this.controllerUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
    }

}