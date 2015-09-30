/// <reference path="../../definitions.d.ts"/>
module dy {
    export class ShadowMapTexture extends TwoDRenderTargetTexture {
        public static create() {
            var obj = new this();

            return obj;
        }
    }
}

