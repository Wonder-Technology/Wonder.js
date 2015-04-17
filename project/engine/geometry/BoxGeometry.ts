/// <reference path="../render/ArrayBuffer.ts"/>
/// <reference path="../render/ElementBuffer.ts"/>
/// <reference path="../material/MeshMaterial.ts"/>
module Engine3D{
    export class BoxGeometry{
        public static create(width, height, depth, material:MeshMaterial):BoxGeometry {
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
                down = -height / 2,
                front = depth / 2,
                back = -depth /2;

            return ArrayBuffer.create(new Float32Array([
                    right, up, front, left, up, front,  left, down, front,  right, down, front,  // v0-v1-v2-v3 front
                    right, up, front,  right, down, front,  right, down, back,  right, up, back,  // v0-v3-v4-v5 right
                    right, up, front,  right, up, back,  left, up, back,  left, up, front,  // v0-v5-v6-v1 up
                    left, up, front,  left, up, back,  left, down, back,  left, down, front,  // v1-v6-v7-v2 left
                    left, down, back,  right, down, back,  right, down, front,  left, down, front,  // v7-v4-v3-v2 down
                    right, down, back,  left, down, back,  left, up, back,  right, up, back// v4-v7-v6-v5 back
                ]),
                3, BufferType.FLOAT)
        }

        private _computeIndicesBuffer(){
            return ElementBuffer.create(new Uint16Array([
                0, 1, 2,   0, 2, 3,    // front
                4, 5, 6,   4, 6, 7,    // right
                8, 9,10,   8,10,11,    // up
                12,13,14,  12,14,15,    // left
                16,17,18,  16,18,19,    // down
                20,21,22,  20,22,23     // back
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
                len = this._vertices.count;

            for(i = 0; i < len; i++){
                arr.push( color.r, color.g, color.b, 1.0);
            }

            return ArrayBuffer.create(new Float32Array(arr), 4, BufferType.FLOAT);
        }
    }
}

