/// <reference path="../../definitions.d.ts"/>
module dy {
    export class MeshRenderer extends RendererComponent {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public render(renderer:Renderer, geometry:Geometry, camera:GameObject){
            renderer.addCommand(this.createDrawCommand(renderer, geometry, camera));
        }

        protected createDrawCommand(renderer:Renderer, geometry:Geometry, camera:GameObject){
             var quadCmd = renderer.createQuadCommand(),
                cameraComponent = camera.getComponent<Camera>(Camera),
                material:Material = geometry.material;

            Log.error(!cameraComponent, "camera must add Camera Component");
            Log.error(!geometry, Log.info.FUNC_MUST("Mesh", "add geometry component"));

            quadCmd.buffers = {
                vertexBuffer: geometry.verticeBuffer,
                texCoordBuffer: geometry.texCoordBuffer,
                indexBuffer: geometry.indiceBuffer,
                normalBuffer: geometry.normalBuffer,
                tangentBuffer:geometry.tangentBuffer,
                colorBuffer: geometry.colorBuffer
            };

            //quadCmd.mMatrix = this.transform.localToWorldMatrix.copy();
            quadCmd.mMatrix = this.transform.localToWorldMatrix;

            quadCmd.vMatrix = cameraComponent.worldToCameraMatrix;
            quadCmd.pMatrix = cameraComponent.pMatrix;

            quadCmd.material = material;

            quadCmd.z = this.gameObject.transform.position.z;

            return quadCmd;
        }

    }
}
