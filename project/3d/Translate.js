var Engine3D;
(function (Engine3D) {
    var Action;
    (function (Action) {
        var Translate = (function () {
            //todo bind actionData to private attr
            function Translate(matrix, actionData) {
                this._matrix = null;
                this._actionData = null;
                this._x = null;
                this._y = null;
                this._z = null;
                this._matrix = matrix;
                this._actionData = actionData;
            }
            Translate.prototype.update = function () {
                //todo refactor to be common
                //move around z axis
                if (this._z <= this._actionData.rangeZ[1] || this._z >= this._actionData.rangeZ[0]) {
                    this._actionData.speed = -this._actionData.speed;
                }
                this._z = this._z + this._actionData.speed;
            };
            Translate.prototype.run = function () {
                this._matrix.translate(this._x, this._y, this._z);
            };
            Translate.prototype.initWhenCreate = function () {
                this._x = 0;
                this._y = 0;
                this._z = 0;
            };
            Translate.create = function (matrix, actionData) {
                var obj = new this(matrix, actionData);
                obj.initWhenCreate();
                return obj;
            };
            return Translate;
        })();
        Action.Translate = Translate;
    })(Action = Engine3D.Action || (Engine3D.Action = {}));
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Translate.js.map