/// <reference path="../definitions.d.ts"/>
module dy {
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
            for (let i in buffers) {
                if (buffers.hasOwnProperty(i)) {
                    this._buffers.addChild(i, buffers[i]);
                }
            }
        }

        get program(){
            return this.material.program;
        }

        public mMatrix:Matrix4 = null;
        public vMatrix:Matrix4 = null;
        public pMatrix:Matrix4 = null;
        public drawMode:DrawMode = DrawMode.TRIANGLES;
        public z:number = null;
        public material:Material = null;

        public execute() {
            this.material.updateTexture();
            this.material.useProgram();
            this.material.updateShader(this);

            this._draw();
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

        private _draw() {
            var totalNum = 0,
                startOffset = 0,
                vertexBuffer = this._buffers.getChild("vertexBuffer"),
                gl = DeviceManager.getInstance().gl;

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

            deviceManager.cullMode = this._getCullMode();

            deviceManager.blend = this.material.blend;
            deviceManager.setBlendFunction(this.material.blendSrc, this.material.blendDst);
            deviceManager.setBlendEquation(this.material.blendEquation);
        }

        private _getCullMode(){
            var stage:Stage = Director.getInstance().stage;

            return stage.cullMode ? stage.cullMode : this.material.cullMode;
        }
    }
}
