module wd {
    export class QuadCommand {
        public static create():QuadCommand {
            var obj = new this();

            return obj;
        }

        get program(){
            return this.material.program;
        }

        public buffers:BufferContainer = null;
        public mMatrix:Matrix4 = null;
        public vMatrix:Matrix4 = null;
        public pMatrix:Matrix4 = null;
        public drawMode:EDrawMode = EDrawMode.TRIANGLES;
        public z:number = null;
        public blend:boolean = false;
        public material:Material = null;
        public animation:Animation = null;

        public execute() {
            var material = this.material;

            material.updateTexture();
            material.updateShader(this);

            this._draw(material);
        }

        public init() {
        }

        private _draw(material:Material) {
            var totalNum:number = 0,
                startOffset:number = 0,
                vertexBuffer:ArrayBuffer = null,
                indexBuffer:ElementBuffer = null,
                gl = DeviceManager.getInstance().gl;

            this._setEffects(material);

            indexBuffer = <ElementBuffer>this.buffers.getChild(EBufferDataType.INDICE);

            if(indexBuffer){
                totalNum = indexBuffer.count;

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
                GlUtils.drawElements(gl[this.drawMode], totalNum, indexBuffer.type, indexBuffer.typeSize * startOffset);
            }
            else{
                vertexBuffer = this.buffers.getChild(EBufferDataType.VERTICE);
                totalNum = vertexBuffer.count;
                GlUtils.drawArrays(gl[this.drawMode], startOffset, totalNum);
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
