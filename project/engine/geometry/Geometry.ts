/// <reference path="../definitions.d.ts"/>
module Engine3D{
    export class Geometry{
        private _vertices:ArrayBuffer = null;
        get vertices(){
            return this._vertices;
        }
        set vertices(vertices:ArrayBuffer){
            this._vertices = vertices;
        }

        private _indices:ElementBuffer = null;
        get indices(){
            return this._indices;
        }
        set indices(indices:ElementBuffer){
            this._indices = indices;
        }

        private _colors:ArrayBuffer = null;
        get colors(){
            return this._colors;
        }
        set colors(colors:ArrayBuffer){
            this._colors = colors;
        }

        protected material:MeshMaterial = null;

        constructor(material){
            this.material = material;
        }

        public initWhenCreate(){
            this._vertices = this.computeVerticesBuffer();
            this._indices = this.computeIndicesBuffer();
            //this._normals = this._computeNormals();
            //this._texCoords = this._computeTexCoords();
            this._colors = this._computeColorsBuffer(this.material);
        }

        protected computeVerticesBuffer():ArrayBuffer{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        protected computeIndicesBuffer():ElementBuffer{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        private _computeColorsBuffer(material:MeshMaterial){
            var arr = [],
                color = material.color,
                i = 0,
                len = this._vertices.count;

            for(i = 0; i < len; i++){
                arr.push( color.r, color.g, color.b, 1.0);
            }

            return ArrayBuffer.create(new Float32Array(arr), 4, BufferType.FLOAT);
        }
    }
}

