module wd {
    export class MeshRenderer extends RendererComponent {
        public static create() {
            var obj = new this();

            return obj;
        }

        public entityObject:GameObject;

        public render(renderer:Renderer, target:GameObject, camera:GameObject){
            var geometry = target.getGeometry();

            if(!geometry){
                return;
            }

            renderer.addCommand(this.createDrawCommand(target, geometry, camera));
        }

        @require(function(target:GameObject, geometry:Geometry, camera:GameObject){
            var controller = camera.getComponent<CameraController>(CameraController);

            it("camera must add Camera Component", () => {
                expect(!!controller && !!controller.camera).true;
            });
            it("Mesh must add geometry component", () => {
                expect(!!geometry).true;
            });
        })
        protected createDrawCommand(target:GameObject, geometry:Geometry, camera:GameObject){
            var cmd:QuadCommand = null,
                cameraComponent = camera.getComponent<CameraController>(CameraController),
                material:Material = geometry.material;

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
            var {
               isModelMatrixInstance,
               isNormalMatrixInstance,
               isOneToManyInstance,
               isHardwareInstance,
               isBatchInstance
               } = this._getInstanceState(material);

            glslData = this._getInstanceGLSLData(isOneToManyInstance, isModelMatrixInstance, isNormalMatrixInstance);

            if(isHardwareInstance){
                if(isOneToManyInstance){
                    cmd = this._createOneToManyHardwareInstanceCommand(target, material, glslData);
                }
                else{
                    cmd = this._createOneToOneHardwareInstanceCommand(target, material, glslData);
                }
            }
            else if(isBatchInstance){
                if(isOneToManyInstance){
                    cmd = this._createOneToManyBatchInstanceCommand(target, material, glslData);
                }
                else{
                    cmd = this._createOneToOneBatchInstanceCommand(target, material, glslData);
                }
            }
            else{
               cmd = SingleDrawCommand.create();

               cmd.normalMatrix = this.entityObject.transform.normalMatrix;
            }

            return cmd;
        }

        private _getInstanceState(material:Material){
            if(material.geometry instanceof InstanceGeometry){
                let isHardwareInstance = InstanceUtils.isHardwareSupport(),
                    isBatchInstance = !isHardwareInstance;

                return {
                    isModelMatrixInstance:false,
                    isNormalMatrixInstance:false,
                    isOneToManyInstance:true,
                    isHardwareInstance:isHardwareInstance,
                    isBatchInstance:isBatchInstance
                }
            }

            let {
                isModelMatrixInstance,
                isNormalMatrixInstance,
                isHardwareInstance,
                isBatchInstance
            } = material.shader.getInstanceState();

            return {
                isModelMatrixInstance:isModelMatrixInstance,
                isNormalMatrixInstance:isNormalMatrixInstance,
                isOneToManyInstance:false,
                isHardwareInstance:isHardwareInstance,
                isBatchInstance:isBatchInstance
            }
        }

        private _getInstanceGLSLData(isOneToManyInstance:boolean, isModelMatrixInstance:boolean, isNormalMatrixInstance:boolean){
            if(isOneToManyInstance){
                return EInstanceGLSLData.ONE_MANY;
            }

            if(isNormalMatrixInstance){
                return EInstanceGLSLData.NORMALMATRIX_MODELMATRIX;
            }

            return EInstanceGLSLData.MODELMATRIX;
        }

        private _createOneToOneHardwareInstanceCommand(target:GameObject, material:Material, glslData:EInstanceGLSLData){
            var instanceComponent:OneToOneSourceInstance = target.getComponent<OneToOneSourceInstance>(OneToOneSourceInstance),
                cmd = OneToOneHardwareInstanceCommand.create();

            cmd.instanceList = instanceComponent.toRenderInstanceListForDraw;
            cmd.instanceBuffer = instanceComponent.instanceBuffer;
            cmd.glslData = glslData;

            return cmd;
        }

        private _createOneToManyHardwareInstanceCommand(target:GameObject, material:Material, glslData:EInstanceGLSLData){
            var instanceComponent:OneToManySourceInstance= target.getComponent<OneToManySourceInstance>(OneToManySourceInstance),
                cmd = OneToManyHardwareInstanceCommand.create();

            cmd.instanceBuffer = instanceComponent.instanceBuffer;
            cmd.geometry = <InstanceGeometry>material.geometry;
            cmd.glslData = glslData;

            return cmd;
        }

        private _createOneToOneBatchInstanceCommand(target:GameObject, material:Material, glslData:EInstanceGLSLData){
            var instanceComponent:OneToOneSourceInstance = target.getComponent<OneToOneSourceInstance>(OneToOneSourceInstance),
                cmd = OneToOneBatchInstanceCommand.create();

            cmd.instanceList = instanceComponent.toRenderInstanceListForDraw;
            cmd.glslData = glslData;

            return cmd;
        }

        private _createOneToManyBatchInstanceCommand(target:GameObject, material:Material, glslData:EInstanceGLSLData){
            var instanceComponent:OneToManySourceInstance = target.getComponent<OneToManySourceInstance>(OneToManySourceInstance),
                cmd = OneToManyBatchInstanceCommand.create();

            cmd.geometry = <InstanceGeometry>material.geometry;
            cmd.glslData = glslData;

            return cmd;
        }
    }
}
