import { JudgeUtils as JudgeUtils$ } from "wonder-commonlib/dist/commonjs/utils/JudgeUtils";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";

// @registerClass("JudgeUtils")
export class JudgeUtils extends JudgeUtils$ {
    public static isCollection(list: Collection<any>) {
        return list instanceof Collection;
    }
}

export var isString = JudgeUtils.isString;

export var isUndefined = (v: any) => v === void 0;

export var isNotUndefined = (v: any) => v !== void 0;
