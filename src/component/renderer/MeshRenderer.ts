module wd {
    export class MeshRenderer extends RendererComponent {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public entityObject:GameObject;

        public drawMode:DrawMode = DrawMode.TRIANGLES;

        public render(renderer:Renderer, geometry:Geometry, camera:GameObject){
            renderer.addCommand(this.createDrawCommand(renderer, geometry, camera));
        }

        @require(function(renderer:Renderer, geometry:Geometry, camera:GameObject){
            var controller = camera.getComponent<CameraController>(CameraController);

            assert(!!controller && !!controller.camera, Log.info.FUNC_MUST("camera" , "add Camera Component"));
            assert(!!geometry, Log.info.FUNC_MUST("Mesh", "add geometry component"));
        })
        protected createDrawCommand(renderer:Renderer, geometry:Geometry, camera:GameObject){
             var quadCmd = renderer.createQuadCommand(),
                cameraComponent = camera.getComponent<CameraController>(CameraController),
                material:Material = geometry.material;

            quadCmd.buffers = geometry.buffers;

            quadCmd.animation = geometry.entityObject.getComponent(Animation);

            quadCmd.mMatrix = this.entityObject.transform.localToWorldMatrix;

            quadCmd.vMatrix = cameraComponent.worldToCameraMatrix;
            quadCmd.pMatrix = cameraComponent.pMatrix;

            quadCmd.material = material;

            quadCmd.z = this.entityObject.transform.position.z;

            quadCmd.drawMode = this.drawMode;

            return quadCmd;
        }
    }
}
