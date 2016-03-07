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

        private _normalMatrixCache:Matrix4 = null;
        private _mvpMatrixCache:Matrix4 = null;

        public execute() {
            var material = this.material;

            material.bindTexture();
            material.updateTexture();
            material.updateShader(this);

            this._draw(material);
        }

        private _draw(material:Material) {
            var startOffset:number = 0,
                vertexBuffer:ArrayBuffer = null,
                indexBuffer:ElementBuffer = null,
                gl = DeviceManager.getInstance().gl;

            this._setEffects(material);

            indexBuffer = <ElementBuffer>this.buffers.getChild(EBufferDataType.INDICE);

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
