module wd {
    /*!it's flipX when viewer is inside the skybox*/

    export class Skybox extends GameObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public initWhenCreate(){
            super.initWhenCreate();

            this.addComponent(SkyboxRenderer.create());
        }
    }
}

