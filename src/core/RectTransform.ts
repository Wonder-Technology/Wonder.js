/// <reference path="../filePath.d.ts"/>
module wd{
    export class RectTransform extends Transform{
        public static create(uiObject:UIObject) {
            var obj = new this(uiObject);

            return obj;
        }

        get parent(){
            return this.p_parent;
        }
        set parent(parent:RectTransform){
            //todo Scene add TopUIObject?
            if(parent instanceof ThreeDTransform){
                return;
            }

            this.setParent(parent);
        }

        private _rotationMatrix:Matrix3 = null;
        get rotationMatrix(){
            var syncList = wdCb.Collection.create<RectTransform>(),
                current = this.p_parent;

            syncList.addChild(this);

            while (current !== null) {
                syncList.addChild(current);
                current = <RectTransform>(current.parent);
            }

            syncList.reverse().forEach((transform:RectTransform) => {
                transform.syncRotation();
            });

            return this._rotationMatrix;
        }

        private _positionAndScaleMatrix:Matrix3 = null;
        get positionAndScaleMatrix(){
            var syncList = wdCb.Collection.create<RectTransform>(),
                current = this.p_parent;

            syncList.addChild(this);

            while (current !== null) {
                syncList.addChild(current);
                current = <RectTransform>(current.parent);
            }

            syncList.reverse().forEach((transform:RectTransform) => {
                transform.syncPositionAndScale();
            });

            return this._positionAndScaleMatrix;
        }
        //set positionAndScaleMatrix(positionAndScaleMatrix:Matrix3){
        //    this._positionAndScaleMatrix = positionAndScaleMatrix;
        //}

        private _position:Vector2 = Vector2.create();
        get position(){
            this._position = this.positionAndScaleMatrix.getTranslation();

            return this._position;
        }
        set position(position:Vector2){
            this._localPositionAndScaleMatrix.setPosition(position.x, position.y);

            this.dirtyPositionAndScale = true;
        }

        private _rotation:number = 0;
        get rotation(){
            this._rotation = this.rotationMatrix.getRotation();

            return this._rotation;
        }
        set rotation(angle:number){
            this._localRotationMatrix.setRotation(angle);

            this.dirtyRotation = true;
        }

        private _scale:Vector2 = Vector2.create(1, 1);
        get scale(){
            this._scale = this.positionAndScaleMatrix.getScale();

            return this._scale;
        }
        set scale(scale:Vector2){
            this._localPositionAndScaleMatrix.setScale(scale.x, scale.y);

            this.dirtyPositionAndScale = true;
        }

        //todo add skew attri

        public dirtyRotation:boolean = true;
        public dirtyPositionAndScale:boolean = true;
        public pivot:Vector2 = Vector2.create(0, 0);

        protected p_parent:RectTransform;
        protected children:wdCb.Collection<RectTransform>;

        private _uiObject:UIObject = null;
        private _localRotationMatrix:Matrix3 = Matrix3.create();
        private _localPositionAndScaleMatrix:Matrix3 = Matrix3.create();


        constructor(uiObject:UIObject){
            super();

            this._uiObject = uiObject;
        }

        public init(){
        }

        public syncRotation(){
            if(this.dirtyRotation){
                if (this.p_parent === null) {
                    this._rotationMatrix = this._localRotationMatrix.copy();
                }
                else {
                    this._rotationMatrix = this.p_parent.rotationMatrix.copy().multiply(this._localRotationMatrix);
                }

                this.children.forEach((child:RectTransform) => {
                    child.dirtyRotation = true;
                });
            }
        }

        public syncPositionAndScale(){
            if(this.dirtyPositionAndScale){
                if (this.p_parent === null) {
                    this._positionAndScaleMatrix = this._localPositionAndScaleMatrix.copy();
                }
                else {
                    //this._positionAndScaleMatrix = this.p_parent.positionAndScaleMatrix.copy().multiply(this._localPositionAndScaleMatrix);
                    this._positionAndScaleMatrix =this._localPositionAndScaleMatrix.copy().multiply(this.p_parent.positionAndScaleMatrix);
                }

                this.children.forEach((child:RectTransform) => {
                    child.dirtyPositionAndScale = true;
                });
            }
        }

        public translate(translation:Vector2);
        public translate(x:number, y:number);

        public translate(...args){
            var translation = null;

            if(args.length === 2){
                translation = Vector2.create(args[0], args[1]);
            }
            else{
                translation = args[0];
            }

            //this._localPositionAndScaleMatrix.translate(translation.x, translation.y);
            this._localPositionAndScaleMatrix.translateOnlyAffectPosition(translation.x, translation.y);

            return this;
        }

        public rotate(angle:number){
            var position = this.position;

            this.rotateAround(angle, position.x + this.pivot.x, position.y - this.pivot.y);

            this.dirtyRotation = true;

            return this;
        }

        public rotateAround(angle:number, center:Vector2);
        public rotateAround(angle:number, centerX:number, centerY:number);

        public rotateAround(...args){
            var angle = null,
                center = null,
                position = null,
                x = null,
                y = null;

            if(args.length === 2){
                angle = args[0];
                center = args[1];
            }
            else{
                angle = args[0];
                center = Vector2.create(args[1], args[2]);
            }

            //position = this.position;
            //x = center.x - position.x;
            //y = center.y - position.y;
            x = center.x;
            y = center.y;


            this._translateInRotationMatrix(x, y);
            this._rotateAroundCanvasOriginPoint(angle);
            this._translateInRotationMatrix(-x, -y);

            return this;
        }

        //todo refactor
        private _translateInRotationMatrix(x:number, y:number){
            //var translation = null;

            //if(args.length === 2){
            //    translation = Vector2.create();
            //}
            //else{
            //    translation = args[0];
            //}

            this._localRotationMatrix.translate(x, y);

            return this;
        }

        public zoom(scale:Vector2);
        public zoom(x:number, y:number);

        public zoom(...args){
            var scale = null;

            if(args.length === 2){
                scale = Vector2.create(args[0], args[1]);
            }
            else{
                scale = args[0];
            }

            this._localPositionAndScaleMatrix.scale(scale.x, scale.y);

            return this;
        }

        public reset(){
            this._localRotationMatrix.setIdentity();
            this._localPositionAndScaleMatrix.setIdentity();
        }

        /*!
         //todo add skew to implement rotate around x/y/z axis for 3d rotate?

         can refer to http://www.senocular.com/flash/tutorials/transformmatrix/
         */


        private _rotateAroundCanvasOriginPoint(angle:number){
            this._localRotationMatrix.rotate(angle);

            this.dirtyRotation = true;

            return this;
        }
    }
}

