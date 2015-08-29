/// <reference path="../definitions.d.ts"/>
module dy.render{
    export class Buffer{
        get buffer() {
            dyCb.Log.error(this.p_buffer === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);

            return this.p_buffer;
        }

        get type() {
            dyCb.Log.error(this.p_type === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);

            return this.p_type;
        }
        set type(type:string){
            this.p_type = type;
        }

        get num() {
            dyCb.Log.error(this.p_num === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);

            return this.p_num;
        }
        set num(num:number) {
            this.p_num = num;
        }

        protected p_buffer:any = null;
        protected p_type:string = null;
        protected p_num:number = null;

        public dispose(){
            Director.getInstance().gl.deleteBuffer(this.p_buffer);
            delete this.p_buffer;
        }
    }
}

