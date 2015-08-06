/// <reference path="../../definitions.d.ts"/>
module dy{
    export class Action extends Component{
        //enabled:boolean = true;

        private _isFinish:boolean = false;
        get isFinish(){
            return this._isFinish;
        }
        set isFinish(isFinish:boolean){
            this._isFinish = isFinish;
        }
        //
        //protected matrix:Matrix = null;
        //
        //constructor(matrix:Matrix){
        //    this.matrix = matrix;
        //}

        public update(){
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        protected finish(){
            this._isFinish = true;
        }

        //todo add hook method like onEnter/onExit?
    }
}
