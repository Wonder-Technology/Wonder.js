/// <reference path="../filePath.d.ts"/>
module wd{
    export class RectTransform extends Transform{
        public static create() {
            var obj = new this();

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

        private _localToParentMatrix:Matrix3 = Matrix3.create();
        get localToParentMatrix(){
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

            return this._localToParentMatrix;
        }
        //set localToParentMatrix(localToParentMatrix:Matrix3){
        //    this._localToParentMatrix = localToParentMatrix;
        //}

        private _position:Vector2 = Vector2.create();
        get position(){
            this._position = this.localToParentMatrix.getTranslation();

            return this._position;
        }
        set position(position:Vector2){
            if (this.p_parent === null) {
                this._localPosition = position.copy();
            }
            else {
                this._localPosition = this.p_parent.localToParentMatrix.copy().invert().multiplyPoint(position);
            }

            this.isTranslate = true;
        }

        private _rotation:number = 0;
        get rotation(){
            this._rotation = this.rotationMatrix.getRotation();

            return this._rotation;
        }
        set rotation(angle:number){
            this.resetRotation();
            this.rotate(angle);

            this.dirtyRotation = true;
            this.isRotate = true;
        }

        private _scale:Vector2 = Vector2.create(1, 1);
        get scale(){
            this._scale = this.localToParentMatrix.getScale();

            return this._scale;
        }
        set scale(scale:Vector2){
            if (this.p_parent === null) {
                this._localScale = scale.copy();
            }
            else {
                this._localScale = this.p_parent.localToParentMatrix.copy().invert().multiplyVector2(scale);
            }

            this.isScale = true;
        }

        //todo add skew attri


        private _localPosition:Vector2 = Vector2.create(0, 0);
        get localPosition(){
            return this._localPosition;
        }
        set localPosition(position:Vector2){
            this._localPosition = position.copy();

            this.isTranslate = true;
        }

        private _localScale:Vector2 = Vector2.create(1, 1);
        get localScale(){
            return this._localScale;
        }
        set localScale(scale:Vector2){
            this._localScale = scale.copy();

            this.isScale = true;
        }

        private _anchorX:Vector2 = Vector2.create(0.5, 0.5);
        get anchorX(){
            return this._anchorX;
        }
        set anchorX(anchorX:Vector2){
            this._anchorX = anchorX;

            if(anchorX.x === anchorX.y){
                let widthFromAnchorToPosition = (anchorX.x - 0.5) * this.p_parent.width;

                this.position = Vector2.create(this.p_parent.position.x + widthFromAnchorToPosition, this.position.y);

                return;
            }

            this.position = Vector2.create(this.p_parent.position.x + (anchorX.x + anchorX.y - 1) / 2 * this.p_parent.width, this.position.y);

            this.width = this.p_parent.width / this.p_parent.scale.x * (anchorX.y - anchorX.x) * this.scale.x;
        }

        private _anchorY:Vector2 = Vector2.create(0.5, 0.5);
        get anchorY(){
            return this._anchorY;
        }
        set anchorY(anchorY:Vector2){
            this._anchorY = anchorY;

            if(anchorY.x === anchorY.y){
                let heightFromAnchorToPosition = (anchorY.x - 0.5) * this.p_parent.height;

                this.position = Vector2.create(this.position.x, this.p_parent.position.y + heightFromAnchorToPosition);

                return;
            }

            this.position = Vector2.create(this.position.x, this.p_parent.position.y + (anchorY.x + anchorY.y - 1) / 2 * this.p_parent.height);

            this.height = this.p_parent.height / this.p_parent.scale.y * (anchorY.y - anchorY.x) * this.scale.y;
        }

        private _width:number = null;
        get width(){
            return this._width * this.scale.x;
        }
        set width(width:number){
            if(width !== this._width){
                this._width = width;

                EventManager.trigger(this.entityObject, CustomEvent.create(<any>EngineEvent.UI_WIDTH_CHANGE));
            }
        }

        private _height:number = null;
        get height(){
            return this._height * this.scale.y;
        }
        set height(height:number){
            if(height !== this._height){
                this._height = height;

                EventManager.trigger(this.entityObject, CustomEvent.create(<any>EngineEvent.UI_HEIGHT_CHANGE));
            }
        }

        public dirtyRotation:boolean = true;
        public dirtyPositionAndScale:boolean = true;
        public pivot:Vector2 = Vector2.create(0, 0);

        protected p_parent:RectTransform;
        protected children:wdCb.Collection<RectTransform>;

        private _localRotationMatrix:Matrix3 = Matrix3.create();
        private _localPositionAndScaleMatrix:Matrix3 = Matrix3.create();


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
            if (this.dirtyLocal) {
                this._localPositionAndScaleMatrix.setTS(this._localPosition, this._localScale);

                this.dirtyLocal = false;
                this.dirtyPositionAndScale = true;
            }

            if (this.dirtyPositionAndScale) {
                if (this.p_parent === null) {
                    this._localToParentMatrix = this._localPositionAndScaleMatrix.copy();
                }
                else {
                    this._localToParentMatrix = this.p_parent.localToParentMatrix.copy().multiply(this._localPositionAndScaleMatrix);
                }

                this.dirtyLocal = false;

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

            this.position = translation.add(this.position);

            return this;
        }

        /*!
        if pivot is not the center point, the actual position will change, but the "position" attr will not change now!

        //todo change "position" when rotate to get the actual position
         */

        public rotate(angle:number){
            var position = this.position;

            this.rotateAround(angle, position.x + this.pivot.x, position.y - this.pivot.y);

            this.dirtyRotation = true;
            this.isRotate = true;

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

        public resetPosition(){
            this.position = Vector2.create(0, 0);
        }

        public resetScale(){
            this.scale = Vector2.create(1, 1);
        }

        public resetRotation(){
            this._localRotationMatrix.setIdentity();
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

