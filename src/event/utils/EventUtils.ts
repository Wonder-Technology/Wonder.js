module wd {
    export class EventUtils {
        public static isEvent(arg:any){
            return arg && arg.currentTarget !== void 0;
        }

        @ensure(function(isEntityObject:boolean, arg:EntityObject){
            if(isEntityObject){
                assert(arg instanceof EntityObject, Log.info.FUNC_MUST_BE(`EntityObject, but actual is ${arg}`));
            }
        })
        public static isEntityObject(arg:EntityObject){
            return arg && arg.bubbleParent !== void 0;
        }
    }
}

