import { ILoginState } from '@cloudbase/types/auth';
import { AuthProvider } from './base';
export declare class CustomAuthProvider extends AuthProvider {
    signIn(ticket: string): Promise<ILoginState>;
}
