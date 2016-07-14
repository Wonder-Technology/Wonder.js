module wd{
    export class LightMaterial extends StandardLightMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public getTextureForRenderSort():Texture{
            return this.diffuseMap;
        }
    }
}

