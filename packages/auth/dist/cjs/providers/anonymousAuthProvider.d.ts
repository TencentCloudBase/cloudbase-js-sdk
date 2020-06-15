import { AuthProvider } from './base';
import { ICloudbaseAuthConfig, ILoginState } from '@cloudbase/types/auth';
import { ICloudbaseCache } from '@cloudbase/types/cache';
import { ICloudbaseRequest } from '@cloudbase/types/request';
export declare class AnonymousAuthProvider extends AuthProvider {
    constructor(config: ICloudbaseAuthConfig & {
        cache: ICloudbaseCache;
        request: ICloudbaseRequest;
    });
    signIn(): Promise<ILoginState>;
    linkAndRetrieveDataWithTicket(ticket: string): Promise<ILoginState>;
    private _setAnonymousUUID;
    private _clearAnonymousUUID;
    private _onConverted;
}
