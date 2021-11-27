import axios from 'axios';
import { environments } from '../environments';
import { UserSignIn } from "../interfaces/user/user-sign-in.model";

export abstract class AuthService {

    public static readonly controllerUrl: string = `${environments.serverOrigin}/${environments.authController}`;

    public static async signIn(model: UserSignIn): Promise<string> {
        const response = await axios.post<string>(this.controllerUrl, model);
        return response.data;
    }

}