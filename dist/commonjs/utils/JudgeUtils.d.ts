/// <reference types="wonder-commonlib" />
import { JudgeUtils as JudgeUtils$ } from "wonder-commonlib/dist/commonjs/utils/JudgeUtils";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
export declare class JudgeUtils extends JudgeUtils$ {
    static isCollection(list: Collection<any>): boolean;
}
export declare var isString: typeof JudgeUtils$.isString;
export declare var isUndefined: (v: any) => boolean;
export declare var isNotUndefined: (v: any) => boolean;
