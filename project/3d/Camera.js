/// <reference path="Matrix.ts"/>
var Engine3D;
(function (Engine3D) {
    //todo 优化，减少计算
    var Camera = (function () {
        function Camera(lookAtOpt, perspectiveOpt) {
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
            this._moveY = null;
            this._moveZ = null;
            this._rotateAngleX = null;
            this._rotateAngleY = null;
            this._zoomInAngle = null;
            this._zoomOutAngle = null;
            this._pMatrix = null;
            this._vMatrix = null;
            this._eyeX = null;
            this._eyeY = null;
            this._eyeZ = null;
            this._moveSpeed = 0.05;
            this._rotateSpeedX = 0.1;
            this._rotateSpeedY = 0.1;
            this._zoomSpeed = 10;
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
            this._moveY = 0;
            this._moveZ = 0;
            this._rotateAngleX = 0;
            this._rotateAngleY = 0;
            this._zoomInAngle = 0;
            this._zoomOutAngle = 0;
            this._pMatrix = Math3D.Matrix.create();
            this._vMatrix = Math3D.Matrix.create();
        }
        Object.defineProperty(Camera.prototype, "eyeX", {
            get: function () {
                return this._eyeX;
            },
            set: function (eyeX) {
                this._eyeX = eyeX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "eyeY", {
            get: function () {
                return this._eyeY;
            },
            set: function (eyeY) {
                this._eyeY = eyeY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "eyeZ", {
            get: function () {
                return this._eyeZ;
            },
            set: function (eyeZ) {
                this._eyeZ = eyeZ;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "moveSpeed", {
            get: function () {
                return this._moveSpeed;
            },
            set: function (moveSpeed) {
                this._moveSpeed = moveSpeed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "rotateSpeedX", {
            get: function () {
                return this._rotateSpeedX;
            },
            set: function (_rotateSpeedX) {
                this._rotateSpeedX = _rotateSpeedX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "rotateSpeedY", {
            get: function () {
                return this._rotateSpeedY;
            },
            set: function (rotateSpeedY) {
                this._rotateSpeedY = rotateSpeedY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "zoomSpeed", {
            get: function () {
                return this._zoomSpeed;
            },
            set: function (zoomSpeed) {
                this._zoomSpeed = zoomSpeed;
            },
            enumerable: true,
            configurable: true
        });
        Camera.prototype.onStartLoop = function () {
            this._vMatrix.push();
        };
        Camera.prototype.onEndLoop = function () {
            this._vMatrix.pop();
        };
        Camera.prototype.moveLeft = function () {
            this._computeMoveDistance(Math3D.Vector4.create(-this._moveSpeed, 0, 0, 1));
            //绕x轴旋转时，投影xy平面为垂直方向，而Left和Right移动投影到xy平面为水平方向，因此绕x轴旋转不会影响Left和Right移动
            //this._moveX = this._moveX + Math.cos(this._rotateAngleY * Math.PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + Math.sin(this._rotateAngleY* Math.PI / 180) *this._moveSpeed;
        };
        Camera.prototype.moveRight = function () {
            this._computeMoveDistance(Math3D.Vector4.create(this._moveSpeed, 0, 0, 1));
            //this._moveX = this._moveX - Math.cos(this._rotateAngleY * Math.PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - Math.sin(this._rotateAngleY* Math.PI / 180) *this._moveSpeed;
        };
        Camera.prototype.moveBack = function () {
            this._computeMoveDistance(Math3D.Vector4.create(0, 0, this._moveSpeed, 1));
            //this._moveY = this._moveY - Math.sin(this._rotateAngleX * Math.PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + Math.cos(this._rotateAngleX* Math.PI / 180) *this._moveSpeed;
            //this._moveX = this._moveX + Math.sin(this._rotateAngleY * Math.PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - Math.cos(this._rotateAngleY* Math.PI / 180) *this._moveSpeed;
        };
        Camera.prototype.moveFront = function () {
            this._computeMoveDistance(Math3D.Vector4.create(0, 0, -this._moveSpeed, 1));
            //this._moveY = this._moveY + Math.sin(this._rotateAngleX * Math.PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - Math.cos(this._rotateAngleX* Math.PI / 180) *this._moveSpeed;
            //this._moveX = this._moveX - Math.sin(this._rotateAngleY * Math.PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + Math.cos(this._rotateAngleY* Math.PI / 180) *this._moveSpeed;
        };
        Camera.prototype._computeMoveDistance = function (speedVec4) {
            /*!
             此处移动距离是针对视图坐标系的（先旋转，然后平移），因此需要计算视图坐标系旋转后移动的距离。
             */
            var matrix = Math3D.Matrix.create();
            matrix.setRotate(this._rotateAngleX, 1.0, 0.0, 0.0);
            matrix.rotate(this._rotateAngleY, 0.0, 1.0, 0.0);
            var result = Math3D.MatrixTool.multiplyVector4(matrix.values, speedVec4);
            this._moveX += result.values[0];
            this._moveY += result.values[1];
            this._moveZ += result.values[2];
        };
        //todo 用欧拉角或四元数来表示方向
        Camera.prototype.rotate = function () {
            this._rotateAngleY = this._rotateAngleY + this._rotateSpeedY;
            this._rotateAngleX = Math.max(Math.min(this._rotateAngleX + this._rotateSpeedX, 90.0), -90.0);
        };
        Camera.prototype.zoomIn = function () {
            this._zoomAngle = Math.min(this._zoomAngle + this._zoomSpeed, 179);
        };
        Camera.prototype.zoomOut = function () {
            this._zoomAngle = Math.max(this._zoomAngle - this._zoomSpeed, 1);
        };
        Camera.prototype.run = function () {
            /*!
            需要对视图坐标系进行变换，先进行旋转变换R，再进行平移变换T，即M=T*R
            因此相当于对视图坐标进行M的逆变换，即M-1=R-1 * T-1，即X'=(R-1 * T-1) * X（X为视图坐标，X'为变换后的坐标）

            而此处是对视图坐标进行变换，因此要进行M的逆变换。

            注意：旋转角rotateAngle和移动距离都是针对视图坐标系的！
          */
            this._vMatrix.translate(-this._moveX, -this._moveY, -this._moveZ);
            this._vMatrix.rotate(-this._rotateAngleY, 0.0, 1.0, 0.0);
            this._vMatrix.rotate(-this._rotateAngleX, 1.0, 0.0, 0.0);
            //this._vMatrix.translate(this._moveX, this._moveY, this._moveZ);
            this._pMatrix.setPerspective(this._zoomAngle, this._aspect, this._near, this._far);
        };
        Camera.prototype.computeMvpMatrix = function (mMatrix) {
            var matrix = Math3D.Matrix.create();
            matrix.concat(mMatrix);
            matrix.concat(this._vMatrix);
            matrix.concat(this._pMatrix);
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