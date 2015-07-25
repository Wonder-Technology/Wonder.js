/// <reference path="definitions.d.ts"/>
module dy{
    //todo can set perspectiveParams, add updateProjectMatrix method
    //todo optimize to reduce compute
    export class Camera{
        public static create(lookAtParams, perspectiveParams):Camera {
            var obj = new this(lookAtParams, perspectiveParams);

            obj.initWhenCreate();

            return obj;
        }

        private _pMatrix:Matrix = null;
        get pMatrix(){
            return this._pMatrix;
        }
        set pMatrix(pMatrix:Matrix){
            this._pMatrix = pMatrix;
        }

        private _vMatrix:Matrix = null;
        get vMatrix(){
            return this._vMatrix;
        }
        set vMatrix(vMatrix:Matrix){
            this._vMatrix = vMatrix;
        }

        private _moveSpeed:number = 0.05;
        get moveSpeed(){
            return this._moveSpeed;
        }
        set moveSpeed(moveSpeed:number){
            this._moveSpeed = moveSpeed;
        }

        private _rotateStepX:number = 0.1;
        get rotateStepX(){
            return this._rotateStepX;
        }
        set rotateStepX(_rotateStepX:number){
            this._rotateStepX = _rotateStepX;
        }

        private _rotateStepY:number = 0.1;
        get rotateStepY(){
            return this._rotateStepY;
        }
        set rotateStepY(rotateStepY:number){
            this._rotateStepY = rotateStepY;
        }

        private _zoomSpeed:number = 10;
        get zoomSpeed(){
            return this._zoomSpeed;
        }
        set zoomSpeed(zoomSpeed:number){
            this._zoomSpeed = zoomSpeed;
        }

        private _eyeX:number = null;
        private _eyeY:number = null;
        private _eyeZ:number = null;
        private _upX:number = null;
        private _upY:number = null;
        private _upZ:number = null;
        private _centerX:number = null;
        private _centerY:number = null;
        private _centerZ:number = null;
        private _zoomAngle:number= null;
        private _aspect:number = null;
        private _near:number = null;
        private _far:number = null;
        private _moveX:number = null;
        private _moveY:number = null;
        private _moveZ:number = null;
        private _rotateAngleX:number = null;
        private _rotateAngleY:number = null;
        private _zoomInAngle:number = null;
        private _zoomOutAngle:number = null;

        constructor(lookAtParams, perspectiveParams){
            this._eyeX = lookAtParams.eyeX;
            this._eyeY = lookAtParams.eyeY;
            this._eyeZ = lookAtParams.eyeZ;
            this._upX = lookAtParams.upX;
            this._upY = lookAtParams.upY;
            this._upZ = lookAtParams.upZ;
            this._centerX = lookAtParams.centerX;
            this._centerY = lookAtParams.centerY;
            this._centerZ = lookAtParams.centerZ;

            this._zoomAngle= perspectiveParams.angle;
            this._aspect = perspectiveParams.aspect;
            this._near = perspectiveParams.near;
            this._far = perspectiveParams.far;

            this._moveX = 0;
            this._moveY = 0;
            this._moveZ = 0;
            this._rotateAngleX = 0;
            this._rotateAngleY = 0;
            this._zoomInAngle = 0;
            this._zoomOutAngle = 0;

            this._pMatrix = Matrix.create();
            this._vMatrix = Matrix.create();
        }

        public initWhenCreate(){
            this._vMatrix.setLookAt(this._eyeX, this._eyeY, this._eyeZ, this._centerX, this._centerY, this._centerZ, this._upX, this._upY, this._upZ);
            this._pMatrix.setPerspective(this._zoomAngle, this._aspect, this._near, this._far);
        }

        public computeVpMatrix(){
            var matrix = Matrix.create();

            matrix.applyMatrix(this._vMatrix);
            matrix.applyMatrix(this._pMatrix);

            return matrix;
        }

        moveLeft(){
            this._computeMoveDistance(Vector4.create(-this._moveSpeed, 0, 0, 1));


            //绕x轴旋转时，投影xy平面为垂直方向，而Left和Right移动投影到xy平面为水平方向，因此绕x轴旋转不会影响Left和Right移动
            //this._moveX = this._moveX + cos(this._rotateAngleY * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + sin(this._rotateAngleY* PI / 180) *this._moveSpeed;
        }
        moveRight(){
            this._computeMoveDistance(Vector4.create(this._moveSpeed, 0, 0, 1));

            //this._moveX = this._moveX - cos(this._rotateAngleY * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - sin(this._rotateAngleY* PI / 180) *this._moveSpeed;
        }

        moveBack(){
            this._computeMoveDistance(Vector4.create(0, 0, this._moveSpeed, 1));

            //this._moveY = this._moveY - sin(this._rotateAngleX * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + cos(this._rotateAngleX* PI / 180) *this._moveSpeed;

            //this._moveX = this._moveX + sin(this._rotateAngleY * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - cos(this._rotateAngleY* PI / 180) *this._moveSpeed;
        }
        moveFront(){
            this._computeMoveDistance(Vector4.create(0, 0, -this._moveSpeed, 1));

            //this._moveY = this._moveY + sin(this._rotateAngleX * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - cos(this._rotateAngleX* PI / 180) *this._moveSpeed;

            //this._moveX = this._moveX - sin(this._rotateAngleY * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + cos(this._rotateAngleY* PI / 180) *this._moveSpeed;
        }

        //todo 用欧拉角或四元数来表示方向
        rotate(){
            this._rotateAngleY = this._rotateAngleY + this._rotateStepY;;
            this._rotateAngleX = Math.max(Math.min(this._rotateAngleX + this._rotateStepX, 90.0), -90.0);
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

            //var vec4 = MatrixTool.multiplyVector4(this._vMatrix.values, [this._eyeX, this._eyeY, this._eyeZ, 1]);
            //this._eyeX = vec4[0];
            //this._eyeY = vec4[1];
            //this._eyeZ = vec4[2];


            //this._vMatrix.translate(this._moveX, this._moveY, this._moveZ);

            this._pMatrix.setPerspective(this._zoomAngle, this._aspect, this._near, this._far);
        }

        public pushMatrix(){
            this._vMatrix.push();
            this._pMatrix.push();
        }

        public popMatrix(){
            this._vMatrix.pop();
            this._pMatrix.pop();
        }

        /*!
         hook method
         */
        public onStartLoop(){
        }

        public onEndLoop(){
        }

        private _computeMoveDistance(speedVec4){
            /*!
             此处移动距离是针对视图坐标系的（先旋转，然后平移），因此需要计算视图坐标系旋转后移动的距离。
             */
            var matrix = Matrix.create();
            matrix.setRotate(this._rotateAngleX, 1.0, 0.0, 0.0);
            matrix.rotate(this._rotateAngleY, 0.0, 1.0, 0.0);

            var result = matrix.multiplyVector4(speedVec4).values;

            this._moveX += result[0];
            this._moveY += result[1];
            this._moveZ += result[2];
        }
    }
}
