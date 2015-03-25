module Engine3D.Action{
    export class Rotate{
        constructor(matrix, actionData){
            this._matrix = matrix;
            this._actionData = actionData;
        }

        private _matrix = null;
        private _actionData = null;
        private _angle = null;

        update(){
            this._angle = this._angle + this._actionData.speed;
        }

        run(){
            this._matrix.rotate(this._angle, this._actionData.axis[0], this._actionData.axis[1], this._actionData.axis[2]);
        }


        initWhenCreate(){
            this._angle = 0;
        }

        public static create(matrix, actionData):Rotate {
            var obj = new this(matrix, actionData);

            obj.initWhenCreate();

            return obj;
        }
    }
}