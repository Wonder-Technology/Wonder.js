import { describe as describeCommonLib, it as itCommonLib } from "wonder-commonlib/dist/es2015/typescript/decorator/contract";
export declare const describe: typeof describeCommonLib;
export declare const it: typeof itCommonLib;
export declare function requireCheck(inFunc: any): (target: any, name: any, descriptor: any) => any;
export declare function requireCheckFunc(checkFunc: Function, bodyFunc: Function): Function;
export declare function ensure(outFunc: any): (target: any, name: any, descriptor: any) => any;
export declare function ensureFunc(checkFunc: Function, bodyFunc: Function): Function;
export declare function ensureGetter(outFunc: any): (target: any, name: any, descriptor: any) => any;
