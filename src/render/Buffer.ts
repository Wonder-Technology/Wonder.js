/// <reference path="../definitions.d.ts"/>
module dy.render{
    export class Buffer{
        public buffer:any = null;
        public type:string = null;
        public num:number = null;

        public dispose(){
            Director.getInstance().gl.deleteBuffer(this.buffer);
            delete this.buffer;
        }
    }
}

