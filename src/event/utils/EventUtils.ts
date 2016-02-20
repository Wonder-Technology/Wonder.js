module wd {
    export class EventUtils {
        public static isEvent(arg:any){
            return arg.currentTarget !== void 0;
        }

        public static isEntityObject(arg:any){
            return arg.scriptList !== void 0;
        }
    }
}

