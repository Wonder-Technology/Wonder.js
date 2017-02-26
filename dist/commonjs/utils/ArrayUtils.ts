import { registerClass } from "../definition/typescript/decorator/registerClass";
import { ArrayUtils as ArrayUtils$ } from "wonder-commonlib/dist/commonjs/utils/ArrayUtils";

@registerClass("ArrayUtils")
export class ArrayUtils extends ArrayUtils$ {
    public static hasRepeatItems(arr: Array<any>) {
        var noRepeatArr = [],
            hasRepeat: boolean = false;

        for (let item of arr) {
            if (!item) {
                continue;
            }

            if (this.contain(noRepeatArr, item)) {
                hasRepeat = true;

                break;
            }

            noRepeatArr.push(item);
        }

        return hasRepeat;
    }

    public static contain(arr: Array<any>, item: any): boolean {
        var c: any = null;

        for (let i = 0, len = arr.length; i < len; i++) {
            c = arr[i];

            if (item.uid && c.uid && item.uid == c.uid) {
                return true;
            }
            else if (item === c) {
                return true;
            }
        }

        return false;
    }
}