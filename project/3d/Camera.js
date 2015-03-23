/// <reference path="Matrix.ts"/>
var Engine3D;
(function (Engine3D) {
    var Camera = (function () {
        function Camera(lookAtOpt, perspectiveOpt) {
            this._eyeX = null;
            this._eyeY = null;
            this._eyeZ = null;
            this._upX = null;
            this._upY = null;
            this._upZ = null;
            this._centerX = null;
            this._centerY = null;
            this._centerZ = null;
            this._zoomAngle = null;
            this._aspect = null;
            this._near = null;
            this._far = null;
            this._moveX = null;
            this._moveZ = null;
            this._rotateAngleX = null;
            this._rotateAngleY = null;
            this._zoomInAngle = null;
            this._zoomOutAngle = null;
            this._pMatrix = null;
            this._vMatrix = null;
            this.moveSpeed = 0.05;
            this.rotateSpeedX = 0.1;
            this.rotateSpeedY = 0.1;
            this.zoomSpeed = 10;
            this._eyeX = lookAtOpt.eyeX;
            this._eyeY = lookAtOpt.eyeY;
            this._eyeZ = lookAtOpt.eyeZ;
            this._upX = lookAtOpt.upX;
            this._upY = lookAtOpt.upY;
            this._upZ = lookAtOpt.upZ;
            this._centerX = lookAtOpt.centerX;
            this._centerY = lookAtOpt.centerY;
            this._centerZ = lookAtOpt.centerZ;
            this._zoomAngle = perspectiveOpt.angle;
            this._aspect = perspectiveOpt.aspect;
            this._near = perspectiveOpt.near;
            this._far = perspectiveOpt.far;
            this._moveX = 0;
            this._moveZ = 0;
            this._rotateAngleX = 0;
            this._rotateAngleY = 0;
            this._zoomInAngle = 0;
            this._zoomOutAngle = 0;
            this._pMatrix = Math3D.Matrix.create();
            this._vMatrix = Math3D.Matrix.create();
        }
        Camera.prototype.onStartLoop = function () {
            this._vMatrix.setIdentity();
        };
        Camera.prototype.moveLeft = function () {
            this._moveX = this._moveX + this.moveSpeed;
        };
        Camera.prototype.moveRight = function () {
            this._moveX = this._moveX - this.moveSpeed;
        };
        Camera.prototype.moveBack = function () {
            this._moveZ = this._moveZ + this.moveSpeed;
        };
        Camera.prototype.moveFront = function () {
            this._moveZ = this._moveZ - this.moveSpeed;
        };
        //todo 用欧拉角或四元数来表示方向
        Camera.prototype.rotate = function () {
            this._rotateAngleX = this._rotateAngleX + this.rotateSpeedX;
            this._rotateAngleY = Math.max(Math.min(this._rotateAngleY + this.rotateSpeedY, 90.0), -90.0);
        };
        Camera.prototype.zoomIn = function () {
            this._zoomAngle = Math.min(this._zoomAngle + this.zoomSpeed, 179);
        };
        Camera.prototype.zoomOut = function () {
            this._zoomAngle = Math.max(this._zoomAngle - this.zoomSpeed, 1);
        };
        Camera.prototype.run = function () {
            this._vMatrix.rotate(this._rotateAngleY, 1.0, 0.0, 0.0);
            this._vMatrix.rotate(this._rotateAngleX, 0.0, 1.0, 0.0);
            this._vMatrix.translate(this._moveX, 0, this._moveZ);
            this._pMatrix.setPerspective(this._zoomAngle, this._aspect, this._near, this._far);
        };
        Camera.prototype.computeMvpMatrix = function (mMatrix) {
            var matrix = this._pMatrix.copy();
            matrix.concat(this._vMatrix);
            matrix.concat(mMatrix);
            return matrix;
        };
        Camera.prototype.init = function () {
            this._vMatrix.setLookAt(this._eyeX, this._eyeY, this._eyeZ, this._centerX, this._centerY, this._centerZ, this._upX, this._upY, this._upZ);
            this._pMatrix.setPerspective(this._zoomAngle, this._aspect, this._near, this._far);
        };
        Camera.prototype.initWhenCreate = function () {
        };
        Camera.create = function (lookAtOpt, perspectiveOpt) {
            var obj = new this(lookAtOpt, perspectiveOpt);
            obj.initWhenCreate();
            return obj;
        };
        return Camera;
    })();
    Engine3D.Camera = Camera;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Camera.js.map