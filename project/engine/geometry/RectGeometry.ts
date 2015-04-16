//has geometry vertices,indices,texCoords,normals data
/// <reference path="../render/ArrayBuffer.ts"/>
/// <reference path="../render/ElementBuffer.ts"/>
/// <reference path="../material/MeshMaterial.ts"/>
module Engine3D{
    export class RectGeometry{
        public static create(width, height, depth, material:MeshMaterial):RectGeometry {
            var geom = new this();

            geom.initWhenCreate(width, height, depth, material);

            return geom;
        }

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

        constructor(){
        }

        public initWhenCreate(width, height, depth, material){
            this._vertices = this._computeVerticesBuffer(width, height, depth);
            this._indices = this._computeIndicesBuffer();
            //this._normals = this._computeNormals();
            //this._texCoords = this._computeTexCoords();
            this._colors = this._computeColorsBuffer(material);
        }

        private _computeVerticesBuffer(width, height, depth){
            var left = -width / 2,
                right = width / 2,
                up = height / 2,
                down = -height / 2;

            return ArrayBuffer.create(new Float32Array([
                right, up, depth,
                left, up, depth,
                left, down, depth,
                right, down, depth
            ]),
                3, BufferType.FLOAT)
        }

        private _computeIndicesBuffer(){
            return ElementBuffer.create(new Uint16Array([
                0, 1, 2,   0, 2, 3
            ]), BufferType.UNSIGNED_SHORT)
        }

        ////todo set data
        //private _computeNormals(){
        //    return null;
        //}
        ////todo set data
        //private _computeTexCoords(){
        //    return null;
        //}

        private _computeColorsBuffer(material:MeshMaterial){
            var arr = [],
                color = material.color,
                i = 0,
                //todo judge by vertex?
                len = 4;

            for(i = 0; i < len; i++){
                arr.push( color.r, color.g, color.b, 1.0);
            }

            return ArrayBuffer.create(new Float32Array(arr), 4, BufferType.FLOAT);
        }
    }
}

