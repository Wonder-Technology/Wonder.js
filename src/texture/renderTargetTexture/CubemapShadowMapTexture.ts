/// <reference path="../../definitions.d.ts"/>
module dy {
    export class CubemapShadowMapTexture extends RenderTargetTexture {
        public static create() {
            var obj = new this();

            return obj;
        }

        public target:TextureTarget = TextureTarget.TEXTURE_CUBE_MAP;
        //
        //public init() {
        //    super.init();
        //
        //    //this.width = this.size;
        //    //this.height = this.size;
        //
        //    Director.getInstance().stage.addRenderTargetRenderer(CubemapShadowMapRenderTargetRenderer.create(this));
        //
        //    return this;
        //}

        public sendData(program:Program, index:number) {
            this.sendSamplerVariable(VariableType.SAMPLER_CUBE, program, index);

            //todo repeat?
            //program.sendUniformData("u_repeatRegion", VariableType.FLOAT_4, this.repeatRegion);

            return this;
        }

        public createEmptyTexture() {
            var gl = DeviceManager.getInstance().gl,
                texture = gl.createTexture(),
                i = null;

            this.setEmptyTexture(texture);

            for (i = 0; i < 6; i++) {
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            }

            return texture;
        }

        //protected setTextureParameters(textureType, isSourcePowerOfTwo){
        //    var gl = DeviceManager.getInstance().gl,
        //        stage:Stage = Director.getInstance().stage;
        //
        //    super.setTextureParameters(textureType, isSourcePowerOfTwo);
        //    //
        //    //if(stage.shadowMap.softType === CubemapShadowMapSoftType.PCF) {
        //    //    gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        //    //    gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        //    //}
        //}
    }
}

