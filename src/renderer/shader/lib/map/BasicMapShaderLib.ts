/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class BasicMapShaderLib extends MapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "map_forBasic";
    }
}

