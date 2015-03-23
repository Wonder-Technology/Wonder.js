/// <reference path="Matrix.ts"/>
module Engine3D{
    export class Camera{
        constructor(lookAtOpt, perspectiveOpt){
            this._eyeX = lookAtOpt.eyeX;
                this._eyeY = lookAtOpt.eyeY;
                this._eyeZ = lookAtOpt.eyeZ;
            this._upX = lookAtOpt.upX;
                this._upY = lookAtOpt.upY;
                this._upZ = lookAtOpt.upZ;
            this._centerX = lookAtOpt.centerX;
                this._centerY = lookAtOpt.centerY;
                this._centerZ = lookAtOpt.centerZ;

            this._zoomAngle= perspectiveOpt.angle;
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

        private _eyeX = null;
        private _eyeY = null;
        private _eyeZ = null;
        private _upX = null;
        private _upY = null;
        private _upZ = null;
        private _centerX = null;
        private _centerY = null;
        private _centerZ = null;
        private _zoomAngle= null;
        private _aspect = null;
        private _near = null;
        private _far = null;
        private _moveX = null;
        private _moveZ = null;
        private _rotateAngleX = null;
        private _rotateAngleY = null;
        private _zoomInAngle = null;
        private _zoomOutAngle = null;
        private _pMatrix:Math3D.Matrix = null;
        private _vMatrix:Math3D.Matrix = null;

        public moveSpeed = 0.05;
        public rotateSpeedX = 0.1;
        public rotateSpeedY = 0.1;
        public zoomSpeed = 10;


        onStartLoop(){
            this._vMatrix.setIdentity();
        }

        moveLeft(){
            this._moveX = this._moveX + this.moveSpeed;
        }
        moveRight(){
            this._moveX = this._moveX - this.moveSpeed;
        }
        moveBack(){
            this._moveZ = this._moveZ + this.moveSpeed;
        }
        moveFront(){
            this._moveZ = this._moveZ - this.moveSpeed;
        }

        //todo 用欧拉角或四元数来表示方向
        rotate(){
            this._rotateAngleX = this._rotateAngleX + this.rotateSpeedX;
            this._rotateAngleY = Math.max(Math.min(this._rotateAngleY + this.rotateSpeedY, 90.0), -90.0);
        }

        zoomIn(){
            this._zoomAngle = Math.min(this._zoomAngle + this.zoomSpeed, 179);
        }
        zoomOut(){
            this._zoomAngle = Math.max(this._zoomAngle - this.zoomSpeed, 1);
        }

        run(){
            this._vMatrix.rotate(this._rotateAngleY, 1.0, 0.0, 0.0);
            this._vMatrix.rotate(this._rotateAngleX, 0.0, 1.0, 0.0);
            this._vMatrix.translate(this._moveX, 0, this._moveZ);


            this._pMatrix.setPerspective(this._zoomAngle, this._aspect, this._near, this._far);
        }

        computeMvpMatrix(mMatrix){
        var matrix = this._pMatrix.copy();

        matrix.concat(this._vMatrix);
        matrix.concat(mMatrix);

        return matrix;
    }

        init(){
            this._vMatrix.setLookAt(this._eyeX, this._eyeY, this._eyeZ, this._centerX, this._centerY, this._centerZ, this._upX, this._upY, this._upZ);
            this._pMatrix.setPerspective(this._zoomAngle, this._aspect, this._near, this._far);
        }


        initWhenCreate(){
        }

        public static create(lookAtOpt, perspectiveOpt):Camera {
            var obj = new this(lookAtOpt, perspectiveOpt);

            obj.initWhenCreate();

            return obj;
        }
    }
}
