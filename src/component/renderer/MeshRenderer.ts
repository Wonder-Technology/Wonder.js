module wd {
    export class MeshRenderer extends RendererComponent {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public entityObject:GameObject;

        public render(renderer:Renderer, geometry:Geometry, camera:GameObject){
            renderer.addCommand(this.createDrawCommand(geometry, camera));
        }

        public clone(){
            return MeshRenderer.create();
        }

        @require(function(geometry:Geometry, camera:GameObject){
            var controller = camera.getComponent<CameraController>(CameraController);

            assert(!!controller && !!controller.camera, Log.info.FUNC_MUST("camera" , "add Camera Component"));
            assert(!!geometry, Log.info.FUNC_MUST("Mesh", "add geometry component"));
        })
        protected createDrawCommand(geometry:Geometry, camera:GameObject){
             var cmd:QuadCommand = null,
                cameraComponent = camera.getComponent<CameraController>(CameraController),
                material:Material = geometry.material,
                 position:Vector3 = this.entityObject.transform.position,
                 target:GameObject = geometry.entityObject;

            cmd = this._createCommand(target, material);

            cmd.target = target;

            cmd.buffers = geometry.buffers;

            cmd.drawMode = geometry.drawMode;

            cmd.vMatrix = cameraComponent.worldToCameraMatrix;
            cmd.pMatrix = cameraComponent.pMatrix;

            cmd.material = material;

            cmd.z = position.z;

            cmd.blend = material.blend;

            return cmd;
        }

        @require(function(target:GameObject){
            if(target.hasComponent(Instance) && GPUDetector.getInstance().extensionInstancedArrays !== null){
                assert(target.hasComponent(SourceInstance) && !target.hasComponent(ObjectInstance), Log.info.FUNC_SHOULD("if use instance to batch draw, target", "be SourceInstance"));
            }
        })
        @ensure(function(cmd, target:GameObject){
            if(cmd instanceof InstanceCommand){
                assert(GPUDetector.getInstance().extensionInstancedArrays !== null, Log.info.FUNC_SHOULD("hardware", "support instance"));
            }
        })
        private _createCommand(target:GameObject, material:Material){
            var cmd:any = null;

            if(target.hasComponent(Instance) && GPUDetector.getInstance().extensionInstancedArrays !== null){
                let instanceComponent:Instance = target.getComponent<Instance>(Instance);

                cmd = InstanceCommand.create();

                cmd.instanceList = instanceComponent.toRenderInstanceListForDraw;
                cmd.instanceBuffer = instanceComponent.instanceBuffer;

                //todo test
                if(material instanceof StandardLightMaterial){
                    cmd.glslData = EInstanceGLSLData.NORMALMATRIX_MODELMATRIX;
                }
            }
            else{
                cmd = SingleDrawCommand.create();

                cmd.mMatrix = this.entityObject.transform.localToWorldMatrix;
            }

            return cmd;
        }
    }
}
