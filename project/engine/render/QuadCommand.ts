/// <reference path="DrawMode.ts"/>
/// <reference path="ArrayBuffer.ts"/>
/// <reference path="ElementBuffer.ts"/>
/// <reference path="Program.ts"/>
module Engine3D{
    export class QuadCommand{
        public static create():QuadCommand {
            var obj = new this();

            return obj;
        }

        //todo precise type
        private _bufferData:any = null;
        get bufferData(){
            return this._bufferData;
        }
        set bufferData(bufferData:any){
            this._bufferData = bufferData;
        }

        private _color:Color = null;
        get color(){
            return this._color;
        }
        set color(color:Color){
            this._color = color;
        }

        private _drawMode:DrawMode = DrawMode.TRIANGLES;
        get drawMode(){
            return this._drawMode;
        }
        set drawMode(drawMode:DrawMode){
            this._drawMode = drawMode;
        }

        private _buffers:{
            vertexBuffer:ArrayBuffer
            texCoordBuffer?: ArrayBuffer
            normalBuffer?:ArrayBuffer
            indexBuffer?: ElementBuffer
        }= null;

        public execute(scene:Scene){
            this._sendData(scene.program);

            this._draw();
        }

        public init(){
            this._initBuffer();
        }

        private _initBuffer(){
            this._buffers = {
                vertexBuffer:this._bufferData.vertices? ArrayBuffer.create(this._bufferData.vertices, 3, BufferType.FLOAT) : null,
                texCoordBuffer: this._bufferData.texCoords? ArrayBuffer.create(this._bufferData.texCoords, 2, BufferType.FLOAT) : null,
                normalBuffer: this._bufferData.normals? ArrayBuffer.create(this._bufferData.normals, 3, BufferType.FLOAT) : null,
                indexBuffer: this._bufferData.indices? ElementBuffer.create(this._bufferData.indices, BufferType.UNSIGNED_SHORT) : null
            };
        }

        private _sendData(program:Program){
            if(this._buffers.vertexBuffer){
                program.setAttributeData("a_position", AttributeDataType.BUFFER, this._buffers.vertexBuffer);
            }
            else{
                throw new Error("must has vertexBuffer");
            }

            if(this.color){
                /*!
                this cause warn:"PERFORMANCE WARNING: Attribute 0 is disabled. This has signficant performance penalty" here?
                because a_color'pos is 0, and it should be array data(like Float32Array)
                refer to: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Vertex_Attribute_0
                */
                program.setAttributeData("a_color", AttributeDataType.FLOAT_4, [this.color.r, this.color.g, this.color.b, 1.0]);
            }
        }

        private _draw(){
            var totalNum = 0,
                startOffset = 0,
                gl = WebGLContext.gl;


            if (this._buffers.indexBuffer) {
                totalNum = this._buffers.indexBuffer.num;
                gl.bindBuffer(gl.ARRAY_BUFFER, this._buffers.vertexBuffer.buffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffers.indexBuffer.buffer);
                gl.drawElements(gl[this._drawMode], totalNum, this._buffers.indexBuffer.type, this._buffers.indexBuffer.typeSize * startOffset);
            } else {
                totalNum = this._buffers.vertexBuffer.num;
                gl.drawArrays(gl[this._drawMode], startOffset, totalNum);
            }
        }
    }
}
