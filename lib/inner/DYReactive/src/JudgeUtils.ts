/// <reference path="definitions.d.ts"/>
module dyRt {
    export class JudgeUtils extends dyCb.JudgeUtils {
        public static isPromise(obj){
            return !!obj
                && !super.isFunction(obj.subscribe)
                && super.isFunction(obj.then);
        }

        public static isEqual(ob1:Entity, ob2:Entity){
            return ob1.uid === ob2.uid;
        }
    }
}
