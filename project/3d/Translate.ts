module Engine3D.Action{
    export class Translate{
        //todo bind actionData to private attr
        constructor(matrix, actionData){
            this._matrix = matrix;
            this._actionData = actionData;
        }

        private _matrix = null;
        private _actionData = null;
        private _x = null;
        private _y = null;
        private _z = null;

        update(){
            //todo refactor to be common
            //move around z axis
            if(this._z <= this._actionData.rangeZ[1] || this._z >=  this._actionData.rangeZ[0]){
                this._actionData.speed = -this._actionData.speed

            }

            this._z = this._z + this._actionData.speed;
        }

        run(){
            this._matrix.translate(this._x, this._y, this._z);
        }


        initWhenCreate(){
            this._x = 0;
            this._y = 0;
            this._z = 0;
        }

        public static create(matrix, actionData) {
            var obj = new this(matrix, actionData);

            obj.initWhenCreate();

            return obj;
        }
    }
}