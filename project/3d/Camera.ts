/// <reference path="Matrix.ts"/>
module Engine3D{
    //todo 优化，减少计算
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
            this._moveY = 0;
            this._moveZ = 0;
            this._rotateAngleX = 0;
            this._rotateAngleY = 0;
            this._zoomInAngle = 0;
            this._zoomOutAngle = 0;

            this._pMatrix = Math3D.Matrix.create();
            this._vMatrix = Math3D.Matrix.create();
        }

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
        private _moveY = null;
        private _moveZ = null;
        private _rotateAngleX = null;
        private _rotateAngleY = null;
        private _zoomInAngle = null;
        private _zoomOutAngle = null;



        private _eyeX:number = null;
        get eyeX(){
            return this._eyeX;
        }
        set eyeX(eyeX:number){
            this._eyeX = eyeX;
        }

        private _eyeY:number = null;
        get eyeY(){
            return this._eyeY;
        }
        set eyeY(eyeY:number){
            this._eyeY = eyeY;
        }

        private _eyeZ:number = null;
        get eyeZ(){
            return this._eyeZ;
        }
        set eyeZ(eyeZ:number){
            this._eyeZ = eyeZ;
        }



        private _moveSpeed:number = 0.05;
        get moveSpeed(){
            return this._moveSpeed;
        }
        set moveSpeed(moveSpeed:number){
            this._moveSpeed = moveSpeed;
        }

        private _rotateSpeedX:number = 0.1;
        get rotateSpeedX(){
            return this._rotateSpeedX;
        }
        set rotateSpeedX(_rotateSpeedX:number){
            this._rotateSpeedX = _rotateSpeedX;
        }

        private _rotateSpeedY:number = 0.1;
        get rotateSpeedY(){
            return this._rotateSpeedY;
        }
        set rotateSpeedY(rotateSpeedY:number){
            this._rotateSpeedY = rotateSpeedY;
        }

        private _zoomSpeed:number = 10;
        get zoomSpeed(){
            return this._zoomSpeed;
        }
        set zoomSpeed(zoomSpeed:number){
            this._zoomSpeed = zoomSpeed;
        }


        private _pMatrix:Math3D.Matrix = null;
        get pMatrix(){
            return this._pMatrix;
        }
        set pMatrix(pMatrix:Math3D.Matrix){
            this._pMatrix = pMatrix;
        }
        
        private _vMatrix:Math3D.Matrix = null;
        get vMatrix(){
            return this._vMatrix;
        }
        set vMatrix(vMatrix:Math3D.Matrix){
            this._vMatrix = vMatrix;
        }


        onStartLoop(){
            this._vMatrix.push();
        }
        onEndLoop(){
            this._vMatrix.pop();
        }

        moveLeft(){
            this._computeMoveDistance(Math3D.Vector4.create(-this._moveSpeed, 0, 0, 1));


            //绕x轴旋转时，投影xy平面为垂直方向，而Left和Right移动投影到xy平面为水平方向，因此绕x轴旋转不会影响Left和Right移动
            //this._moveX = this._moveX + Math.cos(this._rotateAngleY * Math.PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + Math.sin(this._rotateAngleY* Math.PI / 180) *this._moveSpeed;
        }
        moveRight(){
            this._computeMoveDistance(Math3D.Vector4.create(this._moveSpeed, 0, 0, 1));

            //this._moveX = this._moveX - Math.cos(this._rotateAngleY * Math.PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - Math.sin(this._rotateAngleY* Math.PI / 180) *this._moveSpeed;
        }


        moveBack(){
            this._computeMoveDistance(Math3D.Vector4.create(0, 0, this._moveSpeed, 1));

            //this._moveY = this._moveY - Math.sin(this._rotateAngleX * Math.PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + Math.cos(this._rotateAngleX* Math.PI / 180) *this._moveSpeed;

            //this._moveX = this._moveX + Math.sin(this._rotateAngleY * Math.PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - Math.cos(this._rotateAngleY* Math.PI / 180) *this._moveSpeed;
        }
        moveFront(){
            this._computeMoveDistance(Math3D.Vector4.create(0, 0, -this._moveSpeed, 1));

            //this._moveY = this._moveY + Math.sin(this._rotateAngleX * Math.PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - Math.cos(this._rotateAngleX* Math.PI / 180) *this._moveSpeed;

            //this._moveX = this._moveX - Math.sin(this._rotateAngleY * Math.PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + Math.cos(this._rotateAngleY* Math.PI / 180) *this._moveSpeed;
        }

        private _computeMoveDistance(speedVec4){
            /*!
             此处移动距离是针对视图坐标系的（先旋转，然后平移），因此需要计算视图坐标系旋转后移动的距离。
             */
            var matrix = Math3D.Matrix.create();
            matrix.setRotate(this._rotateAngleX, 1.0, 0.0, 0.0);
            matrix.rotate(this._rotateAngleY, 0.0, 1.0, 0.0);

            var result = Math3D.MatrixTool.multiplyVector4(matrix.values, speedVec4.values);

            this._moveX += result[0];
            this._moveY += result[1];
            this._moveZ += result[2];
        }

        //todo 用欧拉角或四元数来表示方向
        rotate(){
            this._rotateAngleY = this._rotateAngleY + this._rotateSpeedY;
            this._rotateAngleX = Math.max(Math.min(this._rotateAngleX + this._rotateSpeedX, 90.0), -90.0);
        }

        zoomIn(){
            this._zoomAngle = Math.min(this._zoomAngle + this._zoomSpeed, 179);
        }
        zoomOut(){
            this._zoomAngle = Math.max(this._zoomAngle - this._zoomSpeed, 1);
        }

        run(){
            /*!
            需要对视图坐标系进行变换，先进行旋转变换R，再进行平移变换T，即M=T*R
            因此相当于对视图坐标进行M的逆变换，即M-1=R-1 * T-1，即X'=(R-1 * T-1) * X（X为视图坐标，X'为变换后的坐标）

            而此处是对视图坐标进行变换，因此要进行M的逆变换。

            注意：旋转角rotateAngle和移动距离都是针对视图坐标系的！
          */
            this._vMatrix.translate(-this._moveX, -this._moveY, -this._moveZ);

            this._vMatrix.rotate(-this._rotateAngleY, 0.0, 1.0, 0.0);
            this._vMatrix.rotate(-this._rotateAngleX, 1.0, 0.0, 0.0);

            //var vec4 = Math3D.MatrixTool.multiplyVector4(this._vMatrix.values, [this._eyeX, this._eyeY, this._eyeZ, 1]);
            //this._eyeX = vec4[0];
            //this._eyeY = vec4[1];
            //this._eyeZ = vec4[2];


            //this._vMatrix.translate(this._moveX, this._moveY, this._moveZ);

            this._pMatrix.setPerspective(this._zoomAngle, this._aspect, this._near, this._far);
        }

        computeVpMatrix(){
            var matrix = Math3D.Matrix.create();
            matrix.concat(this._vMatrix);
            matrix.concat(this._pMatrix);

            return matrix;
        }

        computeViewPosInWorldCoordinate(){
            //todo not copy and make sure that not change vMatrix
            return Math3D.MatrixTool.multiplyVector4(this._vMatrix.copy().inverseOf().values, [0, 0, 0, 1]);
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
