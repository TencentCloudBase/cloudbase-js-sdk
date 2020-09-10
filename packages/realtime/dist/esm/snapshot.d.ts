import { SnapshotType, ISnapshot } from '@cloudbase/types/realtime';
import { ISingleDBEvent } from '@cloudbase/types/database';
interface ISnapshotConstructorOptions {
    id: number;
    docChanges: ISingleDBEvent[];
    docs: Record<string, any>[];
    type?: SnapshotType;
    msgType?: String;
}
export declare class Snapshot implements ISnapshot {
    id: number;
    docChanges: ISingleDBEvent[];
    docs: Record<string, any>[];
    type?: 'init';
    constructor(options: ISnapshotConstructorOptions);
}
export {};
