module wd{
    export class CommonProceduralShader extends ProceduralShader{
        public static create(){
            var obj = new this(null);

            obj.initWhenCreate();

            return obj;
        }
    }
}

