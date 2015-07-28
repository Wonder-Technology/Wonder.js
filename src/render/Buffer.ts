/// <reference path="../definitions.d.ts"/>
module dy{
    export class Buffer{
        get buffer() {
            dyCb.Log.error(this.innerBuffer === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);

            return this.innerBuffer;
        }

        get type() {
            dyCb.Log.error(this.innerType === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);

            return this.innerType;
        }
        set type(type:string){
            this.innerType = type;
        }

        get num() {
            dyCb.Log.error(this.innerNum === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);

            return this.innerNum;
        }
        set num(num:number) {
            this.innerNum = num;
        }

        protected innerBuffer = null;
        protected innerType = null;
        protected innerNum = null;
    }
}

