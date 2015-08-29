/// <reference path="../../definitions.d.ts"/>
module dy{
    export class TriangleGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        public width:number = null;
        public height:number = null;

        protected computeVerticesBuffer(){
            var width = this.width,
                height = this.height,
                left = -width / 2,
                right = width / 2,
                up = height / 2,
                down = -height / 2;

            return render.ArrayBuffer.create(new Float32Array([
                    0.0, up, 0,
                    left, down, 0,
                    right, down, 0
                ]),
                3, render.BufferType.FLOAT);
        }

        protected computeIndicesBuffer(){
            return render.ElementBuffer.create(new Uint8Array([
                0, 1, 2
            ]), render.BufferType.UNSIGNED_BYTE);
        }

        protected computeTexCoordsBuffer(){
            return render.ArrayBuffer.create(new Float32Array([
                    0.5, 1.0,
                    0.0, 0.0,
                    1.0, 0.0
                ]),
                2, render.BufferType.FLOAT);
        }
    }
}

