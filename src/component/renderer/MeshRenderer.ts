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

            cmd.vaoManager = geometry.vaoManager;

            cmd.drawMode = geometry.drawMode;

            cmd.mMatrix = target.transform.localToWorldMatrix;
            cmd.vMatrix = cameraComponent.worldToCameraMatrix;
            cmd.pMatrix = cameraComponent.pMatrix;

            cmd.material = material;


            cmd.blend = material.blend;

            return cmd;
        }

        @require(function(target:GameObject){
            //if(InstanceUtils.isInstance(target) && InstanceUtils.isHardwareSupport()){
                if(InstanceUtils.isInstance(target)){
                assert(InstanceUtils.isSourceInstance(target), Log.info.FUNC_SHOULD("if use instance to batch draw, target", "be SourceInstance"));
            }
        })
        @ensure(function(cmd:RenderCommand, target:GameObject){
            if(cmd instanceof HardwareInstanceCommand){
                assert(InstanceUtils.isHardwareSupport(), Log.info.FUNC_SHOULD("hardware", "support instance"));
            }
            else if(cmd instanceof BatchInstanceCommand){
                assert(!InstanceUtils.isHardwareSupport(), Log.info.FUNC_SHOULD_NOT("hardware", "support instance"));
            }
        })
        private _createCommand(target:GameObject, material:Material){
            var cmd:any = null,
                glslData:EInstanceGLSLData = null;
            var {
                isModelMatrixInstance,
                isNormalMatrixInstance,
                isHardwareInstance,
                isBatchInstance
            } = material.shader.getInstanceState();

            glslData = this._getInstanceGLSLData(isModelMatrixInstance, isNormalMatrixInstance);

            if(isHardwareInstance){
                cmd = this._createHardwareInstanceCommand(target, material, glslData);
            }
            else if(isBatchInstance){
                cmd = this._createBatchInstanceCommand(target, material, glslData);
            }
            else{
                cmd = SingleDrawCommand.create();

                cmd.mMatrix = this.entityObject.transform.localToWorldMatrix;
                cmd.normalMatrix = this.entityObject.transform.normalMatrix;
            }

            return cmd;
        }

        private _getInstanceGLSLData(isModelMatrixInstance:boolean, isNormalMatrixInstance:boolean){
            if(isNormalMatrixInstance){
                return EInstanceGLSLData.NORMALMATRIX_MODELMATRIX;
            }

            return EInstanceGLSLData.MODELMATRIX;
        }

        private _createHardwareInstanceCommand(target:GameObject, material:Material, glslData:EInstanceGLSLData){
            var instanceComponent:SourceInstance = target.getComponent<SourceInstance>(SourceInstance),
                cmd = HardwareInstanceCommand.create();

            cmd.instanceList = instanceComponent.toRenderInstanceListForDraw;
            cmd.instanceBuffer = instanceComponent.instanceBuffer;

            cmd.glslData = glslData;

            return cmd;
        }

        private _createBatchInstanceCommand(target:GameObject, material:Material, glslData:EInstanceGLSLData){
            var instanceComponent:SourceInstance = target.getComponent<SourceInstance>(SourceInstance),
                cmd = BatchInstanceCommand.create();

            cmd.instanceList = instanceComponent.toRenderInstanceListForDraw;
            //cmd.instanceBuffer = instanceComponent.instanceBuffer;

            cmd.glslData = glslData;

            return cmd;
        }
    }
}
