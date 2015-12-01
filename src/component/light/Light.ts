/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class Light extends Component {
        get position(){
            return this.gameObject.transform.position;
        }

        private _shadowMapWidth:number = null;
        get shadowMapWidth(){
            var maxCubemapTextureSize = GPUDetector.getInstance().maxCubemapTextureSize;

            if(!this._shadowMapWidth || this._shadowMapWidth > maxCubemapTextureSize){
                return maxCubemapTextureSize
            }

            return this._shadowMapWidth;
        }
        set shadowMapWidth(shadowMapWidth:number){
            this._shadowMapWidth = shadowMapWidth;
        }

        private _shadowMapHeight:number = null;
        get shadowMapHeight(){
            var maxCubemapTextureSize = GPUDetector.getInstance().maxCubemapTextureSize;

            if(!this._shadowMapHeight || this._shadowMapHeight > maxCubemapTextureSize){
                return maxCubemapTextureSize
            }

            return this._shadowMapHeight;
        }
        set shadowMapHeight(shadowMapHeight:number){
            this._shadowMapHeight = shadowMapHeight;
        }

        public color:Color = Color.create("#ffffff");
        public castShadow:boolean = false;
        public shadowCameraNear:number = 0.1;
        public shadowCameraFar:number = 5000;
        public shadowBias:number = ShaderChunk.NULL;
        public shadowDarkness:number = 0;
        public shadowMap:IShadowMapTexture = null;
        public shadowMapRenderer:RenderTargetRenderer = null;
    }
}

