import axios from 'axios';
import { AuthenticationStorage } from '../authentication/authentication.storage';
import { environments } from "../environments";
import { UserCreate } from "../interfaces/user/user-create.model";
import { UserUpdate } from "../interfaces/user/user-update.model";
import { User } from "../interfaces/user/user.model";

export abstract class UsersService {

    public static readonly controllerUrl: string = `${environments.serverOrigin}/${environments.usersController}`;

    public static async findAll(): Promise<User[]> {
        const bearerToken: string | null = AuthenticationStorage.value;
        const response = await axios.get<User[]>(this.controllerUrl, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
        return response.data;
    }

    public static async findOneByPayload(): Promise<User> {
        const bearerToken: string | null = AuthenticationStorage.value;
        const response = await axios.get<User>(`${this.controllerUrl}/me`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
        return response.data;
    }

    public static async findOneById(id: string): Promise<User> {
        const bearerToken: string | null = AuthenticationStorage.value;
        const response = await axios.get<User>(`${this.controllerUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
        return response.data;
    }

    public static async createOne(model: UserCreate): Promise<User> {
        const bearerToken: string | null = AuthenticationStorage.value;
        const response = await axios.post<User>(this.controllerUrl, model, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
        return response.data;
    }

    public static async updateOneByPayload(model: UserUpdate): Promise<User> {
        const bearerToken: string | null = AuthenticationStorage.value;
        const response = await axios.patch<User>(`${this.controllerUrl}/me`, model, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
        return response.data;
    }

    public static async updateOneById(id: string, model: UserUpdate): Promise<User> {
        const bearerToken: string | null = AuthenticationStorage.value;
        const response = await axios.patch<User>(`${this.controllerUrl}/${id}`, model, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
        return response.data;
    }

    public static async removeOneByPayload(): Promise<void> {
        const bearerToken: string | null = AuthenticationStorage.value;
        await axios.delete<User>(`${this.controllerUrl}/me`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
    }

    public static async removeOneById(id: string): Promise<void> {
        const bearerToken: string | null = AuthenticationStorage.value;
        await axios.delete<User>(`${this.controllerUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
    }

}