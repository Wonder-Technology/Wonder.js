/// <reference path="../../../definitions.d.ts"/>
module dy {
    export class ShadowMapTextureUtils{
        public static setTextureParameters(textureType){
            var gl = DeviceManager.getInstance().gl,
                scene:Scene = Director.getInstance().scene;

            if(scene.shadowMap.softType === ShadowMapSoftType.PCF) {
                gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            }
        }
    }
}

