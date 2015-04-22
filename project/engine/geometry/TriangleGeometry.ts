/// <reference path="Geometry.ts"/>
/// <reference path="../render/ArrayBuffer.ts"/>
/// <reference path="../material/MeshMaterial.ts"/>
module Engine3D{
    export class TriangleGeometry extends Geometry{
        public static create(width:number, height:number, material:MeshMaterial):TriangleGeometry {
            var geom = new this(width, height, material);

            geom.initWhenCreate();

            return geom;
        }

        private _width:number = null;
        private _height:number = null;

        constructor(width:number, height:number, material:MeshMaterial){
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
                    0.0, up, 0,
                    left, down, 0,
                    right, down, 0
                ]),
                3, BufferType.FLOAT)
        }
    }
}

