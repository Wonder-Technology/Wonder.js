/// <reference path="../../definitions.d.ts"/>
module dy {
    export class Skybox extends GameObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public initWhenCreate(){
            this.addComponent(SkyboxRenderer.create());
        }
    }
}

