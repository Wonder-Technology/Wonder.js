module wd {
    export class CubemapShadowMapRenderTargetRendererUtils extends ShadowMapRenderTargetRendererUtils{
        public static create(light:PointLight, texture:CubemapShadowMapTexture) {
            var obj = new this(light, texture);

            obj.initWhenCreate();

            return obj;
        }
    }
}
