/// <reference path="../definitions.d.ts"/>
module Engine3D{
    export class QuadCommand{
        public static create():QuadCommand {
            var obj = new this();

            return obj;
        }

        private _buffers:dyCb.Hash = dyCb.Hash.create();
        get buffers(){
            return this._buffers;
        }
        set buffers(buffers:any){
            var i = null;

            for(i in buffers){
                if(buffers.hasOwnProperty(i)){
                    this._buffers.addChild(i, buffers[i]);
                }
            }
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

        public execute(scene:Scene){
            this._sendData(scene.program);

            this._draw();
        }

        public init(){
            //this._initBuffer();
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

        private _sendData(program:Program){
            if(this._buffers.hasChild("vertexBuffer")){
                program.setAttributeData("a_position", AttributeDataType.BUFFER, this._buffers.getChild("vertexBuffer"));
            }
            else{
                throw new Error("must has vertexBuffer");
            }

            //if(this.color){
                /*!
                this cause warn:"PERFORMANCE WARNING: Attribute 0 is disabled. This has signficant performance penalty" here?
                because a_color'pos is 0, and it should be array data(like Float32Array)
                refer to: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Vertex_Attribute_0
                */


                program.setAttributeData("a_color", AttributeDataType.BUFFER, this._buffers.getChild("colorBuffer"));
            //}
        }


        private _draw(){
            var totalNum = 0,
                startOffset = 0,
                vertexBuffer = this._buffers.getChild("vertexBuffer"),
                gl = WebGLContext.gl;


            if (this._buffers.hasChild("indexBuffer")) {
                let indexBuffer = this._buffers.getChild("indexBuffer");
                totalNum = indexBuffer.num;

                gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.buffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
                gl.drawElements(gl[this._drawMode], totalNum, indexBuffer.type, indexBuffer.typeSize * startOffset);
            }
            else {
                totalNum = vertexBuffer.num;
                gl.drawArrays(gl[this._drawMode], startOffset, totalNum);
            }
        }
    }
}
