/// <reference path="../definitions.d.ts"/>
module Engine3D{
    export class RectGeometry extends Geometry{
        public static create(width:number, height:number, material:MeshMaterial):RectGeometry {
            var geom = new this(width, height, material);

            geom.initWhenCreate();

            return geom;
        }

        private _width:number = null;
        private _height:number = null;

        constructor(width, height, material){
            super(material);

            this._width = width;
            this._height = height;
        }

        protected computeVerticesBuffer(){
            var width = this._width,
                height = this._height,
            left = -width / 2,
                right = width / 2,
                up = height / 2,
                down = -height / 2;

            return ArrayBuffer.create(new Float32Array([
                right, up, 0,
                left, up, 0,
                left, down, 0,
                right, down, 0
            ]),
                3, BufferType.FLOAT)
        }

        protected computeIndicesBuffer(){
            return ElementBuffer.create(new Uint16Array([
                0, 1, 2,   0, 2, 3
            ]), BufferType.UNSIGNED_SHORT)
        }
    }
}

