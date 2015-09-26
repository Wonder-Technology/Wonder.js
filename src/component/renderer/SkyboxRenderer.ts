/// <reference path="../../definitions.d.ts"/>
module dy {
    export class SkyboxRenderer extends MeshRenderer {
        public static create() {
            var obj = new this();

            return obj;
        }

        public render(renderer:Renderer, geometry:Geometry, camera:GameObject, isRenderTarget:boolean):void {
            renderer.skyboxCommand = this.createDrawCommand(renderer, geometry, camera, isRenderTarget);
        }
    }
}

