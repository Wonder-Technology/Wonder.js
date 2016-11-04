import wdCb = require("wdcb");

const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

export = class JudgeUtils extends wdCb.JudgeUtils{
    public static isArray(arr:any) {
        var length = arr && arr.length;

        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    }
}
