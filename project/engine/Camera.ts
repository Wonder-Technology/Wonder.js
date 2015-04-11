/// <reference path="math/Matrix.ts"/>
module Engine3D{
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

        private _eyeX:number = null;
        private _eyeY:number = null;
        private _eyeZ:number = null;
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

            this._pMatrix = Matrix.create();
            this._vMatrix = Matrix.create();
        }

        public initWhenCreate(){
            this._vMatrix.setLookAt(this._eyeX, this._eyeY, this._eyeZ, this._centerX, this._centerY, this._centerZ, this._upX, this._upY, this._upZ);
            this._pMatrix.setPerspective(this._zoomAngle, this._aspect, this._near, this._far);
        }

        public computeVpMatrix(){
            var matrix = Math3D.Matrix.create();

            matrix.applyMatrix(this._vMatrix);
            matrix.applyMatrix(this._pMatrix);

            return matrix;
        }
    }
}
