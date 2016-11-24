import JudgeUtils = require("../../../ts/JudgeUtils")

export class Utils{
    public static hasData(data: Array<any>) {
        return data && data.length > 0;
    }

    public static isArrayEmpty(data:string|Array<any>){
        return JudgeUtils.isArrayExactly(data) && data.length === 0;
    }
}
