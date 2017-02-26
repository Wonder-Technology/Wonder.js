export declare function cacheGetter(judgeFunc: () => boolean, returnCacheValueFunc: () => any, setCacheFunc: (returnVal: any) => void): (target: any, name: any, descriptor: any) => any;
export declare function cache(judgeFunc: any, returnCacheValueFunc: any, setCacheFunc: any): (target: any, name: any, descriptor: any) => any;
export declare function cacheBufferForBufferContainer(): (target: any, name: any, descriptor: any) => any;
export declare function cacheBufferForBufferContainerWithFuncParam(setDataNameFuncName: string): (target: any, name: any, descriptor: any) => any;
