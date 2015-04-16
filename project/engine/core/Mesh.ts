/// <reference path="../geometry/RectGeometry.ts"/>
/// <reference path="../math/Matrix.ts"/>
module Engine3D{
    export class Mesh{
        //todo be Geometry,Material(add baseClass Geometry,Material)
        public static create(gemo:RectGeometry):Mesh {
            var obj = new this(gemo);

            return obj;
        }

        private _matrix:Matrix = null;
        get matrix(){
            return this._matrix;
        }
        set matrix(matrix:Matrix){
            this._matrix = matrix;
        }

        private _gemo:RectGeometry = null;

        constructor(gemo:RectGeometry){
            this._gemo = gemo;
            this._matrix = Matrix.create();
        }

        public draw(){
            this._addDrawCommand();
        }

        private _addDrawCommand(){
            var renderer = Director.getInstance().renderer,
                quadCmd = renderer.createQuadCommand();

            quadCmd.buffers = {
                vertexBuffer: this._gemo.vertices,
                //texCoords: this._gemo.texCoords,
                //normals: this._gemo.normals,
                indexBuffer: this._gemo.indices,
                colorBuffer: this._gemo.colors
            };
            //quadCmd.bufferData = ;
            //quadCmd.color = this._material.color;

            renderer.addCommand(quadCmd);
        }
    }
}
