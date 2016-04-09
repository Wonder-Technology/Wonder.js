module wd {
    export class TwoDShadowMapRenderTargetRendererUtils extends ShadowMapRenderTargetRendererUtils{
        public static create(light:DirectionLight, texture:TwoDShadowMapTexture) {
            var obj = new this(light, texture);

            obj.initWhenCreate();

            return obj;
        }
    }
}

