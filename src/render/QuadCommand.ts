/// <reference path="../definitions.d.ts"/>
module dy.render {
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

        public execute() {
            this._update();

            dyCb.Log.error(!this.program, dyCb.Log.info.FUNC_MUST_DEFINE("program"));
            this.program.use();

            this._sendData();
            this.draw();
        }

        public init() {
            //this._initBuffer();
            //this.material.textureManager.init();
        }

        //private _initBuffer(){
        //    this._buffers.addChild("vertexBuffer",
        //        this._bufferData.vertices? render.ArrayBuffer.create(this._bufferData.vertices, 3, BufferType.FLOAT) : null
        //    );
        //    this._buffers.addChild("texCoordBuffer",
        //        this._bufferData.texCoords? render.ArrayBuffer.create(this._bufferData.texCoords, 2, BufferType.FLOAT) : null
        //    );
        //    this._buffers.addChild("normalBuffer",
        //        this._bufferData.normals? render.ArrayBuffer.create(this._bufferData.normals, 3, BufferType.FLOAT) : null
        //    );
        //    this._buffers.addChild("indexBuffer",
        //        this._bufferData.indices? ElementBuffer.create(this._bufferData.indices, BufferType.UNSIGNED_SHORT) : null
        //    );
        //    this._buffers.addChild("colorBuffer",
        //        this._bufferData.colors? render.ArrayBuffer.create(this._bufferData.colors, 3, BufferType.FLOAT) : null
        //    );
        //}

        private _update(){
            this.material.textureManager.update();
        }

        private _sendData() {
            var program = this.program;

            this._sendAttributeData();

            this.material.textureManager.sendData(this.program);

            program.setUniformData("u_mMatrix", ShaderDataType.FLOAT_MAT4, this.mMatrix);
            program.setUniformData("u_vMatrix", ShaderDataType.FLOAT_MAT4, this.vMatrix);
            program.setUniformData("u_pMatrix", ShaderDataType.FLOAT_MAT4, this.pMatrix);
            program.setUniformData("u_normalMatrix", ShaderDataType.FLOAT_MAT4, this.mMatrix.copy().invert().transpose());

            program.setUniformDataFromShader();
        }

        private _sendAttributeData(){
            var program = this.program;

            if (this._buffers.hasChild("vertexBuffer")) {
                program.setAttributeData("a_position", ShaderDataType.BUFFER, <render.ArrayBuffer>this._buffers.getChild("vertexBuffer"));
            }
            else {
                dyCb.Log.error(true, dyCb.Log.info.FUNC_MUST("has vertexBuffer"));
            }

            if (this._buffers.hasChild("texCoordsBuffer")) {
                program.setAttributeData("a_texCoord", ShaderDataType.BUFFER, <render.ArrayBuffer>this._buffers.getChild("texCoordsBuffer"));
            }

            if (this._buffers.hasChild("normalBuffer")) {
                program.setAttributeData("a_normal", ShaderDataType.BUFFER, <render.ArrayBuffer>this._buffers.getChild("normalBuffer"));
            }

            if(this._buffers.hasChild("colorBuffer")){
                /*!
                 this cause warn:"PERFORMANCE WARNING: Attribute 0 is disabled. This has signficant performance penalty" here?
                 because a_color'pos is 0, and it should be array data(like Float32Array)
                 refer to: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Vertex_Attribute_0
                 */


                program.setAttributeData("a_color", ShaderDataType.BUFFER, <render.ArrayBuffer>this._buffers.getChild("colorBuffer"));
            }

            program.setAttributeDataFromShader();
        }

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
            deviceManager.cullMode = this.material.cullMode;

            deviceManager.blend = this.material.blend;
            deviceManager.setBlendFunction(this.material.blendSrc, this.material.blendDst);
            deviceManager.setBlendEquation(this.material.blendEquation);
        }
    }
}
