import JudgeUtils = require("../JudgeUtils");

export = class TestTool{
    public static getValues(values:any, digit:number = 1):any{
        if(JudgeUtils.isArray(values)){
            let arr:Array<number> = values;

            return arr.map((value:number) => {
                return Number(value.toFixed(digit));
            });
        }

        return Number(values.toFixed(digit));
    }
}
