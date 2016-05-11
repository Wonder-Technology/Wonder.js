module wd {
    export abstract class Light extends Component {
        get position(){
            return this.entityObject.transform.position;
        }

        private _shadowMapWidth:number = null;
        @cloneAttributeAsBasicType()
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
        @cloneAttributeAsBasicType()
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

        public entityObject:GameObject;

        @cloneAttributeAsCloneable()
        public color:Color = Color.create("#ffffff");
        @cloneAttributeAsBasicType()
        public castShadow:boolean = false;
        @cloneAttributeAsBasicType()
        public shadowCameraNear:number = 0.1;
        @cloneAttributeAsBasicType()
        public shadowCameraFar:number = 5000;
        @cloneAttributeAsBasicType()
        public shadowBias:number = ShaderChunk.NULL;
        @cloneAttributeAsBasicType()
        public shadowDarkness:number = 0;
    }
}

