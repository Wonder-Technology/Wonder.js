var Engine3D;
(function (Engine3D) {
    var Action;
    (function (Action) {
        var Rotate = (function () {
            function Rotate(matrix, actionData) {
                this._matrix = null;
                this._actionData = null;
                this._angle = null;
                this._matrix = matrix;
                this._actionData = actionData;
            }
            Rotate.prototype.update = function () {
                this._angle = this._angle + this._actionData.speed;
            };
            Rotate.prototype.run = function () {
                this._matrix.rotate(this._angle, this._actionData.axis[0], this._actionData.axis[1], this._actionData.axis[2]);
            };
            Rotate.prototype.initWhenCreate = function () {
                this._angle = 0;
            };
            Rotate.create = function (matrix, actionData) {
                var obj = new this(matrix, actionData);
                obj.initWhenCreate();
                return obj;
            };
            return Rotate;
        })();
        Action.Rotate = Rotate;
    })(Action = Engine3D.Action || (Engine3D.Action = {}));
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Rotate.js.map