/// <reference path="../../definitions.d.ts"/>
module dy {
    export class MeshRenderer extends Renderer {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public render(renderer:render.Renderer, geometry:Geometry, camera:GameObject):void {
            //this._setData(camera);
            this._addDrawCommand(renderer, geometry, camera);
        }

        private _computeMvpMatrix(camera:GameObject):Matrix{
            var cameraComponent = camera.getComponent<Camera>(Camera);

            dyCb.Log.error(!cameraComponent, "camera must add Camera Component");

            return this.transform.localToWorldMatrix.copy().applyMatrix(cameraComponent.computeVpMatrix());
        }

        //private _setData(camera){
        //    this._program.setUniformData("u_mvpMatrix", UniformDataType.FLOAT_MAT4, this._computeMvpMatrix(camera));
        //}

        private _addDrawCommand(renderer:render.Renderer, geometry:Geometry, camera:GameObject){
            var quadCmd = renderer.createQuadCommand(),
                cameraComponent = camera.getComponent<Camera>(Camera),
                material:Material = geometry.material;

            dyCb.Log.error(!geometry, dyCb.Log.info.FUNC_MUST("Mesh", "add geometry component"));

            quadCmd.buffers = {
                vertexBuffer: geometry.vertices,
                texCoordsBuffer: geometry.texCoords,
                //normals: geometry.normals,
                indexBuffer: geometry.indices,
                colorBuffer: geometry.colors
            };

            quadCmd.shader = geometry.material.shader;
            //quadCmd.mMatrix = this.transform.localToWorldMatrix.copy();
            quadCmd.mMatrix = this.transform.localToWorldMatrix;
            quadCmd.vMatrix = cameraComponent.worldToCameraMatrix;
            quadCmd.pMatrix = cameraComponent.pMatrix;


            //quadCmd.bufferData = ;
            //quadCmd.color = this._material.color;

            quadCmd.material = material;

            quadCmd.z = this.gameObject.transform.position.z;

            //todo refactor
            if(material.textureManager.isSkybox){
                quadCmd.isSkybox = true;
            }

            renderer.addCommand(quadCmd);
        }

    }
}
