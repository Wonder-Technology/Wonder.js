/// <reference path="../../definitions.d.ts"/>
module dy{
    export class BoxGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        private _width:number = null;
        get width(){
            return this._width;
        }
        set width(width:number){
            this._width = width;
        }

        private _height:number = null;
        get height(){
            return this._height;
        }
        set height(height:number){
            this._height = height;
        }

        private _depth:number = null;
        get depth(){
            return this._depth;
        }
        set depth(depth:number){
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

            return render.ArrayBuffer.create(new Float32Array([
                    right, up, front, left, up, front,  left, down, front,  right, down, front,  // v0-v1-v2-v3 front
                    right, up, front,  right, down, front,  right, down, back,  right, up, back,  // v0-v3-v4-v5 right
                    right, up, front,  right, up, back,  left, up, back,  left, up, front,  // v0-v5-v6-v1 up
                    left, up, front,  left, up, back,  left, down, back,  left, down, front,  // v1-v6-v7-v2 left
                    left, down, back,  right, down, back,  right, down, front,  left, down, front,  // v7-v4-v3-v2 down
                    right, down, back,  left, down, back,  left, up, back,  right, up, back// v4-v7-v6-v5 back
                ]),
                3, render.BufferType.FLOAT)
        }

        protected computeIndicesBuffer(){
            return render.ElementBuffer.create(new Uint16Array([
                0, 1, 2,   0, 2, 3,    // front
                4, 5, 6,   4, 6, 7,    // right
                8, 9,10,   8,10,11,    // up
                12,13,14,  12,14,15,    // left
                16,17,18,  16,18,19,    // down
                20,21,22,  20,22,23     // back
            ]), render.BufferType.UNSIGNED_SHORT)
        }
    }
}

