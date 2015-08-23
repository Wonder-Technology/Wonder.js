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

        private _color:Color = null;
        get color() {
            return this._color;
        }
        set color(color:Color) {
            this._color = color;
        }

        //todo remove it?
        set shader(shader:Shader) {
            if (Director.getInstance().stage.program.isChangeShader(shader)) {
                Director.getInstance().stage.program.initWithShader(shader);
                Director.getInstance().stage.program.use();
            }
        }

        private _mvpMatrix:Matrix = null;
        get mvpMatrix() {
            return this._mvpMatrix;
        }
        set mvpMatrix(mvpMatrix:Matrix) {
            this._mvpMatrix = mvpMatrix;
        }

        private _drawMode:DrawMode = DrawMode.TRIANGLES;
        get drawMode() {
            return this._drawMode;
        }
        set drawMode(drawMode:DrawMode) {
            this._drawMode = drawMode;
        }

        //todo move default value to GLManager?
        public polygonOffsetMode:PolygonOffsetMode = PolygonOffsetMode.NONE;
        public cullMode:CullMode = CullMode.BACK;
        public blend:boolean = false;
        public blendSrc:BlendFunction = BlendFunction.SRC_COLOR;
        public blendDst:BlendFunction = BlendFunction.DST_COLOR;
        public blendEquation:BlendEquation = BlendEquation.FUNC_ADD;
        public z:number = null;

        public execute() {
            this._sendData();

            this._draw();
        }

        public init() {
            //this._initBuffer();
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

        private _sendData() {
            var program = Director.getInstance().stage.program;

            if (this._buffers.hasChild("vertexBuffer")) {
                program.setAttributeData("a_position", AttributeDataType.BUFFER, <render.ArrayBuffer>this._buffers.getChild("vertexBuffer"));
            }
            else {
                dyCb.Log.error(true, dyCb.Log.info.FUNC_MUST("has vertexBuffer"));
            }

            //if(this.color){
            /*!
             this cause warn:"PERFORMANCE WARNING: Attribute 0 is disabled. This has signficant performance penalty" here?
             because a_color'pos is 0, and it should be array data(like Float32Array)
             refer to: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Vertex_Attribute_0
             */


            program.setAttributeData("a_color", AttributeDataType.BUFFER, <render.ArrayBuffer>this._buffers.getChild("colorBuffer"));
            //}


            program.setUniformData("u_mvpMatrix", UniformDataType.FLOAT_MAT4, this._mvpMatrix);
        }


        private _draw() {
            var totalNum = 0,
                startOffset = 0,
                vertexBuffer = this._buffers.getChild("vertexBuffer"),
                gl = Director.getInstance().gl;
            var glManager = GLManager.getInstance();

            glManager.polygonOffsetMode = this.polygonOffsetMode;
            glManager.cullMode = this.cullMode;

            glManager.blend = this.blend;
            glManager.setBlendFunction(this.blendSrc, this.blendDst);
            glManager.setBlendEquation(this.blendEquation);

            if (this._buffers.hasChild("indexBuffer")) {
                let indexBuffer:ElementBuffer = <ElementBuffer>this._buffers.getChild("indexBuffer");

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
