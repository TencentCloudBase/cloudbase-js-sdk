interface ICatchErrorsDecoratorOptions {
    mode?: 'sync' | 'async';
    customInfo?: {
        className?: string;
        methodName?: string;
    };
    title?: string;
    messages?: string[];
}
export declare function catchErrorsDecorator(options: ICatchErrorsDecoratorOptions): (target: any, methodName: string, descriptor: TypedPropertyDescriptor<Function>) => void;
export declare function stopOAuthLoginWithAuth(): (_target: any, _methodName: string, descriptor: TypedPropertyDescriptor<Function>) => void;
export declare function stopAuthLoginWithOAuth(): (_target: any, _methodName: string, descriptor: TypedPropertyDescriptor<Function>) => void;
export {};
