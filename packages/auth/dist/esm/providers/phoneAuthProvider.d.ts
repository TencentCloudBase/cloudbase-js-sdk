import { ILoginState } from '@cloudbase/types/auth';
import { AuthProvider } from './base';
export declare class PhoneAuthProvider extends AuthProvider {
    signIn(param: {
        phoneNumber: string;
        phoneCode?: string;
        password?: string;
        signMethod?: string;
    }): Promise<ILoginState>;
    signUp(phoneNumber: string, phoneCode: string, password?: string): Promise<ILoginState>;
}
