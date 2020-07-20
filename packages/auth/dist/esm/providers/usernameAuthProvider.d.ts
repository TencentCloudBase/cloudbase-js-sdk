import { AuthProvider } from './base';
import { ILoginState } from '@cloudbase/types/auth';
export declare class UsernameAuthProvider extends AuthProvider {
    signIn(username: string, password: string): Promise<ILoginState>;
}
