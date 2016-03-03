module wd {
    export class SkyboxRenderer extends MeshRenderer {
        public static create() {
            var obj = new this();

            return obj;
        }

        public render(renderer:Renderer, geometry:Geometry, camera:GameObject):void {
            renderer.skyboxCommand = this.createDrawCommand(geometry, camera);
        }
    }
}

