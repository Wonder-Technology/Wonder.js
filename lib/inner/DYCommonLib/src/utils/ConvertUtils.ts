/// <reference path="../definitions.d.ts"/>
module dyCb{
    export class ConvertUtils{
        public static toString(obj:any){
            if (JudgeUtils.isNumber(obj)) {
                return String(obj);
            }
            //if (JudgeUtils.isjQuery(obj)) {
            //    return _jqToString(obj);
            //}
            if (JudgeUtils.isFunction(obj)) {
                return this._convertCodeToString(obj);
            }
            if (JudgeUtils.isDirectObject(obj) || JudgeUtils.isArray(obj)) {
                return JSON.stringify(obj);
            }
            return String(obj);
        }

        private static _convertCodeToString(fn) {
            return fn.toString().split('\n').slice(1, -1).join('\n') + '\n';
        }
    }
}
