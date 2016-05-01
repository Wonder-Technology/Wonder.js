module wd{
    export class ClassUtils{
        @require(function(objInstance:any){
            assert(JudgeUtils.isFunction(objInstance.constructor), Log.info.FUNC_MUST_BE("objInstance.constructor", "Function"));
        })
        @ensure(function(className:string){
            assert(!!className, Log.info.FUNC_CAN_NOT("get class name from objInstance.constructor.name"));
        })
        public static getClassName(objInstance:any){
            return objInstance.constructor.name;
        }
    }
}
