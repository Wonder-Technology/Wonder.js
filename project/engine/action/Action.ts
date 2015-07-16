/// <reference path="../definitions.d.ts"/>
module Engine3D{
    export class Action{
        private _isFinish:boolean = false;
        get isFinish(){
            return this._isFinish;
        }
        set isFinish(isFinish:boolean){
            this._isFinish = isFinish;
        }

        protected matrix:Matrix = null;

        constructor(matrix:Matrix){
            this.matrix = matrix;
        }

        public update(){
            throw new Error("abstract method need override");
        }

        protected finish(){
            this._isFinish = true;
        }
    }
}
