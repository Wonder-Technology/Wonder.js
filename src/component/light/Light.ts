/// <reference path="../../filePath.d.ts"/>
module dy {
    export abstract class Light extends Component {
        get position(){
            return this.gameObject.transform.position;
        }

        public color:Color = Color.create("#ffffff");

        public castShadow:boolean = false;
        public shadowCameraNear:number = 0.1;
        public shadowCameraFar:number = 5000;
        public shadowBias:number = ShaderChunk.NULL;
        public shadowDarkness:number = 0;
        public shadowMapWidth:number = 1024;
        public shadowMapHeight:number = 1024;
        public shadowMap:IShadowMapTexture = null;
        public shadowMapRenderer:RenderTargetRenderer = null;

        public abstract dispose();
    }
}

