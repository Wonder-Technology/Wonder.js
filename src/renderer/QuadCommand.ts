/// <reference path="../definitions.d.ts"/>
module dy {
    //todo remove
    declare var window;

    export class QuadCommand {
        public static create():QuadCommand {
            var obj = new this();

            return obj;
        }

        private _buffers:dyCb.Hash<Buffer> = dyCb.Hash.create<Buffer>();
        get buffers() {
            return this._buffers;
        }
        set buffers(buffers:any) {
            var i = null;

            for (i in buffers) {
                if (buffers.hasOwnProperty(i)) {
                    this._buffers.addChild(i, buffers[i]);
                }
            }
        }

        get program(){
            return this.material.program;
        }

        public mMatrix:Matrix = null;
        public vMatrix:Matrix = null;
        public pMatrix:Matrix = null;
        public drawMode:DrawMode = DrawMode.TRIANGLES;
        public z:number = null;
        public material:Material = null;
        public isRenderTarget:boolean = false;

        public execute() {
            this.material.updateTexture();

            dyCb.Log.error(!this.program, dyCb.Log.info.FUNC_MUST_DEFINE("program"));
            this.program.use();

            this.material.updateShader(this);

            this.draw();
        }

        public init() {
            //this._initBuffer();
            //this.material.textureManager.init();
        }

        //private _initBuffer(){
        //    this._buffers.addChild("vertexBuffer",
        //        this._bufferData.vertices? ArrayBuffer.create(this._bufferData.vertices, 3, BufferType.FLOAT) : null
        //    );
        //    this._buffers.addChild("texCoordBuffer",
        //        this._bufferData.texCoords? ArrayBuffer.create(this._bufferData.texCoords, 2, BufferType.FLOAT) : null
        //    );
        //    this._buffers.addChild("normalBuffer",
        //        this._bufferData.normals? ArrayBuffer.create(this._bufferData.normals, 3, BufferType.FLOAT) : null
        //    );
        //    this._buffers.addChild("indexBuffer",
        //        this._bufferData.indices? ElementBuffer.create(this._bufferData.indices, BufferType.UNSIGNED_SHORT) : null
        //    );
        //    this._buffers.addChild("colorBuffer",
        //        this._bufferData.colors? ArrayBuffer.create(this._bufferData.colors, 3, BufferType.FLOAT) : null
        //    );
        //}

        private draw() {
            var totalNum = 0,
                startOffset = 0,
                vertexBuffer = this._buffers.getChild("vertexBuffer"),
                gl = Director.getInstance().gl;

            this._setEffects();

            if (this._buffers.hasChild("indexBuffer")) {
                let indexBuffer:ElementBuffer = <ElementBuffer>this._buffers.getChild("indexBuffer");

                totalNum = indexBuffer.num;

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
                gl.drawElements(gl[this.drawMode], totalNum, indexBuffer.type, indexBuffer.typeSize * startOffset);
            }
            else {
                totalNum = vertexBuffer.num;
                gl.drawArrays(gl[this.drawMode], startOffset, totalNum);
            }
        }

        private _setEffects(){
            var deviceManager = DeviceManager.getInstance();

            deviceManager.setColorWrite(this.material.redWrite, this.material.greenWrite, this.material.blueWrite, this.material.alphaWrite);
            deviceManager.polygonOffsetMode = this.material.polygonOffsetMode;

            if(this.isRenderTarget){
                deviceManager.cullMode = this._reverseCullMode(this.material.cullMode);
            }
            else{
                deviceManager.cullMode = this.material.cullMode;
            }

            deviceManager.blend = this.material.blend;
            deviceManager.setBlendFunction(this.material.blendSrc, this.material.blendDst);
            deviceManager.setBlendEquation(this.material.blendEquation);
        }

        private _reverseCullMode(cullMode:CullMode){
            var result = null;

            switch(cullMode){
                case CullMode.BACK:
                    result = CullMode.FRONT;
                    break;
                case CullMode.FRONT:
                    result = CullMode.BACK;
                    break;
                default:
                    result = cullMode;
                    break;
            }

            return result;
        }
    }
}
