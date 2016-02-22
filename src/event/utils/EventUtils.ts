module wd {
    export class EventUtils {
        public static isEvent(arg:any){
            return arg && arg.currentTarget !== void 0;
        }

        public static isEntityObject(arg:any){
            return arg && arg.scriptList !== void 0;
        }
    }
}

