/// <reference path="../action/ActionManager"/>
/// <reference path="../action/Action"/>
/// <reference path="../math/Vector3.ts"/>
/// <reference path="../math/Matrix.ts"/>
/// <reference path="../math/Vector3.ts"/>
module Engine3D{
    export class Mesh{
        //todo push,pop matrix, so need change pos, rotate angle, scale instead of changing matrix!
        //when need push,pop matrix?

        //todo be Geometry,Material(add baseClass Geometry,Material)
        public static create(gemo:RectGeometry):Mesh {
            var obj = new this(gemo);

            return obj;
        }

        private _matrix:Matrix = Matrix.create();
        get matrix(){
            return this._matrix;
        }
        set matrix(matrix:Matrix){
            this._matrix = matrix;
        }

        private _gemo:RectGeometry = null;
        private _actionManager:ActionManager = ActionManager.create();

        constructor(gemo:RectGeometry){
            this._gemo = gemo;
        }

        public runAction(action:Action){
            //todo 判断是否已有重复的
           this._actionManager.addChild(action);
        }

        public update(){
            this._actionManager.update();
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
