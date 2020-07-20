import { ILoginState } from '@cloudbase/types/auth';
import { AuthProvider } from './base';
export declare class EmailAuthProvider extends AuthProvider {
    signIn(email: string, password: string): Promise<ILoginState>;
    signUp(email: string, password: string): Promise<any>;
    resetPassword(email: string): Promise<any>;
    resetPasswordWithToken(token: string, newPassword: string): Promise<any>;
    activate(token: string): Promise<any>;
}
