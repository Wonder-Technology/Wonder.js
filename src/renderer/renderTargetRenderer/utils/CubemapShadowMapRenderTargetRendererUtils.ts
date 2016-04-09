module wd {
    export class CubemapShadowMapRenderTargetRendererUtils extends ShadowMapRenderTargetRendererUtils{
        public static create(light:PointLight, texture:CubemapShadowMapTexture) {
            var obj = new this(light, texture);

            obj.initWhenCreate();

            return obj;
        }

        protected texture:CubemapShadowMapTexture;

        public initWhenCreate(){
            super.initWhenCreate();

            if (!this.mapManager.hasCubemapShadowMap(this.texture)) {
                this.mapManager.addCubemapShadowMap(this.texture);
            }
        }
    }
}
