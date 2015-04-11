module Engine3D{
    export enum DrawMode{
        TRIANGLES
    }


    export class Mesh{
        //todo be Geometry,Material(add baseClass Geometry,Material)
        public static create(gemo:RectGeometry, material: MeshMaterial):Mesh {
            var obj = new this(material);

            obj.initWhenCreate(gemo);

            return obj;
        }

        constructor(material:MeshMateria){
            this._material = material;
        }

        private _matrix:Matrix = null;
        get matrix(){
            return this._matrix;
        }
        set matrix(matrix:Matrix){
            this._matrix = matrix;
        }

        private _material:MeshMaterial = null;
        get material(){
            return this._material;
        }
        set material(material:MeshMaterial){
            this._material = material;
        }

        private _buffers:{
            vertexBuffer:ArrayBuffer
            texCoordBuffer?: ArrayBuffer
            normalBuffer?:ArrayBuffer
            indexBuffer?: ElementBuffer
        }= null;

        constructor(material:MeshMaterial){
            this._material = material;
            this._matrix = Math3D.Matrix.create();
        }

        public initWhenCreate(gemo:RectGeometry){
           this._initBuffer(gemo);
        }

        private _initBuffer(gemo:RectGeometry){
            this._buffers = {
                vertexBuffer:ArrayBuffer.create(gemo.vertices, 3, BufferType.FLOAT),
                texCoordBuffer: ArrayBuffer.create(gemo.texCoords, 2, BufferType.FLOAT),
                normalBuffer: ArrayBuffer.create(gemo.normals, 3, BufferType.FLOAT),
                indexBuffer: ElementBuffer.create(gemo.indices, BufferType.UNSIGNED_SHORT)
            };
        }

        //todo extract render
        public draw(program){
            this._sendData(program);

            this._draw();
        }
        private _sendData(program){
            if(this._buffers.vertexBuffer){
                program.setAttributeData("a_position", AttributeDataType.BUFFER, this._buffers.vertexBuffer.buffer);
            }
            else{
                throw new Error("must has vertexBuffer");
            }

            if(this._material.color){
                program.setAttributeData("a_color", AttributeDataType.FLOAT_4, [this._material.color.r, this._material.color.g, this._material.color.g, 1.0]);
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
                gl.drawElements(gl[this._drawMode], totalNum, this._buffers.indexBuffer.type, this.buffers.indexBuffer.typeSize * startOffset);
            } else {
                gl.drawArrays(gl[this._drawMode], startOffset, totalNum);
            }
        }

private _drawMode:DrawMode = null;
get drawMode(){
    return this._drawMode || DrawMode.TRIANGLES;
}
set drawMode(drawMode:DrawMode){
    this._drawMode = drawMode;
}
    }
}
