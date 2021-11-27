export abstract class AuthenticationStorage {

    private static readonly storageKey: string = 'AuthenticationSession';

    public static get value(): string | null {
        return localStorage.getItem(this.storageKey);
    }

    public static set value(bearerToken: string | null) {
        if (!bearerToken) {
            localStorage.removeItem(this.storageKey);
        } else {
            localStorage.setItem(this.storageKey, bearerToken);
        }
    }

}