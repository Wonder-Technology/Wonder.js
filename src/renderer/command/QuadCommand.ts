module wd {
    export class QuadCommand extends RenderCommand{
        public static create():QuadCommand {
            var obj = new this();

            return obj;
        }

        get program(){
            return this.material.program;
        }

        @requireGetter(function(){
            assert(!!this.mMatrix, Log.info.FUNC_NOT_EXIST("mMatrix"));
        })
        @cacheGetter(function(){
            return this._normalMatrixCache !== null;
        }, function(){
            return this._normalMatrixCache;
        }, function(result){
            this._normalMatrixCache = result;
        })
        get normalMatrix(){
            return this.mMatrix.invertTo3x3().transpose();
        }

        @requireGetter(function(){
            assert(!!this.mMatrix && !!this.vMatrix && !!this.pMatrix, Log.info.FUNC_NOT_EXIST("mMatrix or vMatrix or pMatrix"));
        })
        @cacheGetter(function(){
            return this._mvpMatrixCache !== null;
        }, function(){
            return this._mvpMatrixCache;
        }, function(result){
            this._mvpMatrixCache = result;
        })
        get mvpMatrix(){
            return this.mMatrix.applyMatrix(this.vMatrix, true).applyMatrix(this.pMatrix, false);
        }

        private _mMatrix:Matrix4 = null;
        get mMatrix(){
            return this._mMatrix;
        }
        set mMatrix(mMatrix:Matrix4){
            this._mMatrix = mMatrix;

            this._normalMatrixCache = null;
            this._mvpMatrixCache = null;
        }

        private _vMatrix:Matrix4 = null;
        get vMatrix(){
            return this._vMatrix;
        }
        set vMatrix(vMatrix:Matrix4){
            this._vMatrix = vMatrix;

            this._mvpMatrixCache = null;
        }

        private _pMatrix:Matrix4 = null;
        get pMatrix(){
            return this._pMatrix;
        }
        set pMatrix(pMatrix:Matrix4){
            this._pMatrix = pMatrix;

            this._mvpMatrixCache = null;
        }

        public buffers:BufferContainer = null;
        public material:Material = null;
        public animation:Animation = null;
        public instanceList:wdCb.Collection<GameObject> = null;

        private _normalMatrixCache:Matrix4 = null;
        private _mvpMatrixCache:Matrix4 = null;

        public execute() {
            var material = this.material;

            material.bindAndUpdateTexture();
            material.updateShader(this);

            this._draw(material);
        }


        private _instancesBufferSize = 32 * 16 * 4; // let's start with a maximum of 32 instances
        //private _worldMatricesInstancesBuffer: WebGLBuffer = null;
        private _worldMatricesInstancesBuffer: any = null;
        private _worldMatricesInstancesArray: Float32Array = null;


        @ensure(function(isInstance:boolean){
            if(isInstance){
                assert(GPUDetector.getInstance().extensionInstancedArrays !== null, Log.info.FUNC_SHOULD("hardware", "support instance"));
            }
        })
        public hasInstance(){
            return this.instanceList && this.instanceList.getCount() > 0;
        }

        public createInstancesBuffer(capacity: number): WebGLBuffer {
            var gl = DeviceManager.getInstance().gl;
            var buffer = gl.createBuffer();

            //todo refactor: add capacity to InstanceBuffer
            buffer.capacity = capacity;

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, capacity, gl.DYNAMIC_DRAW);
            return buffer;
        }

        @require(function(){
            assert(GPUDetector.getInstance().extensionInstancedArrays !== null, Log.info.FUNC_SHOULD("hardware", "support instance"));
        })
        public updateAndBindInstancesBuffer(instancesBuffer: WebGLBuffer, data: Float32Array, offsetLocations: number[]): void {
            var gl = DeviceManager.getInstance().gl;
            var extension = GPUDetector.getInstance().extensionInstancedArrays;

            gl.bindBuffer(gl.ARRAY_BUFFER, instancesBuffer);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);

            for (var index = 0; index < 4; index++) {
                //for (var index = 0; index < 1; index++) {
                var offsetLocation = offsetLocations[index];
                gl.enableVertexAttribArray(offsetLocation);
                gl.vertexAttribPointer(offsetLocation, 4, gl.FLOAT, false, 64, index * 16);
                extension.vertexAttribDivisorANGLE(offsetLocation, 1);
            }
        }

        @require(function(){
            assert(GPUDetector.getInstance().extensionInstancedArrays !== null, Log.info.FUNC_SHOULD("hardware", "support instance"));
        })
        public unBindInstancesBuffer(instancesBuffer: WebGLBuffer, offsetLocations: number[]): void {
            var gl = DeviceManager.getInstance().gl;
            var extension = GPUDetector.getInstance().extensionInstancedArrays;

            gl.bindBuffer(gl.ARRAY_BUFFER, instancesBuffer);
            for (var index = 0; index < 4; index++) {
                var offsetLocation = offsetLocations[index];
                gl.disableVertexAttribArray(offsetLocation);
                extension.vertexAttribDivisorANGLE(offsetLocation, 0);
            }
        }


        private _draw(material:Material) {
            var startOffset:number = 0,
                vertexBuffer:ArrayBuffer = null,
                indexBuffer:ElementBuffer = null,
                gl = DeviceManager.getInstance().gl;

            this._setEffects(material);

            indexBuffer = <ElementBuffer>this.buffers.getChild(EBufferDataType.INDICE);


            //todo refactor

            if(this.hasInstance()){
                //todo optimize: add cache

                var matricesCount = this.instanceList.getCount() + 1;
                var bufferSize = matricesCount * 16 * 4;

                while (this._instancesBufferSize < bufferSize) {
                    this._instancesBufferSize *= 2;
                }


                if (!this._worldMatricesInstancesBuffer || this._worldMatricesInstancesBuffer.capacity < this._instancesBufferSize) {
                    if (this._worldMatricesInstancesBuffer) {
                        //engine.deleteInstancesBuffer(this._worldMatricesInstancesBuffer);
                        gl.deleteBuffer(this._worldMatricesInstancesBuffer);
                    }

                    this._worldMatricesInstancesBuffer = this.createInstancesBuffer(this._instancesBufferSize);
                    this._worldMatricesInstancesArray = new Float32Array(this._instancesBufferSize / 4);
                }

                var offset = 0;
                //todo remove it, use this.instanceList.getCount()
                var instancesCount = 0;

                //add self
                this.mMatrix.copyToArray(this._worldMatricesInstancesArray, offset);
                offset += 16;
                instancesCount++;



                //add instances

                this.instanceList.forEach((instance:GameObject) => {
                    instance.transform.localToWorldMatrix.copyToArray(this._worldMatricesInstancesArray, offset);
                    offset += 16;
                    instancesCount++;
                });

                var program = this.program;

                var offsetLocation0 = program.getAttribLocation("a_mVec4_0");
                var offsetLocation1 = program.getAttribLocation("a_mVec4_1");
                var offsetLocation2 = program.getAttribLocation("a_mVec4_2");
                var offsetLocation3 = program.getAttribLocation("a_mVec4_3");

                var offsetLocations = [offsetLocation0, offsetLocation1, offsetLocation2, offsetLocation3];

                //return;

                this.updateAndBindInstancesBuffer(this._worldMatricesInstancesBuffer, this._worldMatricesInstancesArray, offsetLocations);

                var extension = GPUDetector.getInstance().extensionInstancedArrays;
                if(indexBuffer){


                    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);


                    extension.drawElementsInstancedANGLE(gl[this.drawMode], indexBuffer.count, indexBuffer.type, indexBuffer.typeSize * startOffset, instancesCount);
                }
                else{
                    vertexBuffer = this.buffers.getChild(EBufferDataType.VERTICE);

                    //todo test

                    extension.drawArraysInstancedANGLE(gl[this.drawMode], startOffset, vertexBuffer.count, instancesCount);
                    //return;
                }


                this.unBindInstancesBuffer(this._worldMatricesInstancesBuffer, offsetLocations);




                return;
            }






            if(indexBuffer){
                this.drawElements(indexBuffer);
            }
            else{
                vertexBuffer = this.buffers.getChild(EBufferDataType.VERTICE);
                GlUtils.drawArrays(gl[this.drawMode], startOffset, vertexBuffer.count);
            }
        }

        @require(function(material:Material){
            if(material.blendFuncSeparate && material.blendEquationSeparate){
            }
            else{
                wdCb.Log.error(!material.blendSrc || !material.blendDst || !material.blendEquation, wdCb.Log.info.FUNC_MUST("material.blendSrc || material.blendDst || material.blendEquation", "be set"));
            }
        })
        private _setEffects(material:Material){
            var deviceManager = DeviceManager.getInstance();

            deviceManager.setColorWrite(material.redWrite, material.greenWrite, material.blueWrite, material.alphaWrite);
            deviceManager.polygonOffsetMode = material.polygonOffsetMode;

            deviceManager.side = this._getSide();

            deviceManager.blend = material.blend;
            if(material.blendFuncSeparate && material.blendEquationSeparate){
                deviceManager.setBlendFuncSeparate(material.blendFuncSeparate);
                deviceManager.setBlendEquationSeparate(material.blendEquationSeparate);
            }
            else{
                deviceManager.setBlendFunc(material.blendSrc, material.blendDst);
                deviceManager.setBlendEquation(material.blendEquation);
            }
        }

        private _getSide(){
            var scene:SceneDispatcher = Director.getInstance().scene;

            return scene.side ? scene.side : this.material.side;
        }
    }
}
