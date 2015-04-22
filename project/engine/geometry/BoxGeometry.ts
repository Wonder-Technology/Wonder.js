/// <reference path="IndexGeometry.ts"/>
/// <reference path="../render/ArrayBuffer.ts"/>
/// <reference path="../render/ElementBuffer.ts"/>
/// <reference path="../material/MeshMaterial.ts"/>
module Engine3D{
    export class BoxGeometry extends IndexGeometry{
        public static create(width:number, height:number, depth:number, material:MeshMaterial):BoxGeometry {
            var geom = new this(width, height, depth, material);

            geom.initWhenCreate();

            return geom;
        }

        private _width:number = null;
        private _height:number = null;
        private _depth:number = null;

        constructor(width:number, height:number, depth:number, material:MeshMaterial){
            super(material);

            this._width = width;
            this._height = height;
            this._depth = depth;
        }

        protected computeVerticesBuffer(){
            var width = this._width,
                height = this._height,
                depth = this._depth,
                left = -width / 2,
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

        protected computeIndicesBuffer(){
            return ElementBuffer.create(new Uint16Array([
                0, 1, 2,   0, 2, 3,    // front
                4, 5, 6,   4, 6, 7,    // right
                8, 9,10,   8,10,11,    // up
                12,13,14,  12,14,15,    // left
                16,17,18,  16,18,19,    // down
                20,21,22,  20,22,23     // back
            ]), BufferType.UNSIGNED_SHORT)
        }
    }
}

