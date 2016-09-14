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

            it("camera must add Camera Component", () => {
                expect(!!controller && !!controller.camera).true;
            });
            it("Mesh must add geometry component", () => {
                expect(!!geometry).true;
            });
        })
        protected createDrawCommand(geometry:Geometry, camera:GameObject){
            var cmd:QuadCommand = null,
                cameraComponent = camera.getComponent<CameraController>(CameraController),
                material:Material = geometry.material,
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
                it("if use instance to batch draw, target should be SourceInstance", () => {
                    expect(InstanceUtils.isSourceInstance(target)).true;
                });
            }
        })
        @ensure(function(cmd:RenderCommand, target:GameObject){
            if(cmd instanceof HardwareInstanceCommand){
                it("hardware should support instance", () => {
                    expect(InstanceUtils.isHardwareSupport()).true;
                });
            }
            else if(cmd instanceof BatchInstanceCommand){
                it("hardware shouldn't support instance", () => {
                    expect(InstanceUtils.isHardwareSupport()).false;
                });
            }
        })
        private _createCommand(target:GameObject, material:Material){
            var cmd:any = null,
                glslData:EInstanceGLSLData = null;
            //todo finish!
            //var {
            //    isModelMatrixInstance,
            //    isNormalMatrixInstance,
            //    isHardwareInstance,
            //    isBatchInstance
            //    } = this._getInstanceState(material);
            //
            //glslData = this._getInstanceGLSLData(isModelMatrixInstance, isNormalMatrixInstance);
            glslData = EInstanceGLSLData.CUSTOM;

            //if(isHardwareInstance){
                cmd = this._createHardwareInstanceCommand(target, material, glslData);
            //}
            //else if(isBatchInstance){
            //    cmd = this._createBatchInstanceCommand(target, material, glslData);
            //}
            //else{
            //    cmd = SingleDrawCommand.create();
            //
            //todo remove? duplicate with createDrawCommand->cmd.mMatrix = target.transform.localToWorldMatrix;
            //    cmd.mMatrix = this.entityObject.transform.localToWorldMatrix;

            //    cmd.normalMatrix = this.entityObject.transform.normalMatrix;
            //}

            return cmd;
        }

        private _getInstanceState(material:Material){
            if(material.geometry instanceof InstanceGeometry){
                //todo finish
                //return {
                //    isModelMatrixInstance:false,
                //    isNormalMatrixInstance:false,
                //    isHardwareInstance:false,
                //    isBatchInstance:false
                //}
            }

            return material.shader.getInstanceState();
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

            //todo extract HardwareCustomInstanceCommand
            cmd.geometry = <InstanceGeometry>material.geometry;

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
