/// <reference path="../../definitions.d.ts"/>
module dy{
    export class AmbientLight extends Light{
        public static type:string = "ambientLight";

        public static create() {
            var obj = new this();

            return obj;
        }

        public dispose(){
        }
    }
}

