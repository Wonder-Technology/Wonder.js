/// <reference path="../filePath.d.ts"/>
module wd{
    export class TwoDTransform extends Transform{
        public static create(uiObject:UIObject) {
            var obj = new this(uiObject);

            return obj;
        }

        private _matrix:Matrix3 = Matrix3.create();

        private _worldMatrix:Matrix3 = null;
        get worldMatrix(){
            var syncList = wdCb.Collection.create<TwoDTransform>(),
                current = this.p_parent;

            syncList.addChild(this);

            while (current !== null) {
                syncList.addChild(current);
                current = <TwoDTransform>(current.parent);
            }

            syncList.reverse().forEach((transform:TwoDTransform) => {
                transform.sync();
            });

            return this._worldMatrix;
        }
        //set worldMatrix(worldMatrix:Matrix3){
        //    this._worldMatrix = worldMatrix;
        //}

        private _position:Vector2 = Vector2.create();
        get position(){
            this._position = this.worldMatrix.getTranslation();

            return this._position;
        }
        set position(position:Vector2){
            this._matrix.setPosition(position.x, position.y);

            this.dirty = true;
        }

        private _rotation:number = 0;
        get rotation(){
            this._rotation = this.worldMatrix.getRotation();

            return this._rotation;
        }
        set rotation(angle:number){
            this._matrix.setRotation(angle);

            this.dirty = true;
        }

        private _scale:Vector2 = Vector2.create(1, 1);
        get scale(){
            this._scale = this.worldMatrix.getScale();

            return this._scale;
        }
        set scale(scale:Vector2){
            this._matrix.setScale(scale.x, scale.y);

            this.dirty = true;
        }

        //todo add skew attri

        public dirty:boolean = true;

        protected p_parent:TwoDTransform;
        protected children:wdCb.Collection<TwoDTransform>;

        private _uiObject:UIObject = null;


        constructor(uiObject:UIObject){
            super();

            this._uiObject = uiObject;
        }

        public init(){
        }

        public sync(){
            if(this.dirty){
                if (this.p_parent === null) {
                    this._worldMatrix = this._matrix.copy();
                }
                else {
                    this._worldMatrix = this.p_parent.worldMatrix.copy().multiply(this._matrix);
                }

                this.children.forEach((child:TwoDTransform) => {
                    child.dirty = true;
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

            this._matrix.translate(translation.x, translation.y);

            return this;
        }

        public rotate(angle:number){
            this._matrix.rotate(angle);

            this.dirty = true;

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

            position = this.position;
            x = center.x - position.x;
            y = center.y - position.y;


            this.translate(x, y);
            this.rotate(angle);
            this.translate(-x, -y);

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

            this._matrix.scale(scale.x, scale.y);

            return this;
        }

        public reset(){
            this._matrix.setIdentity();
        }

        /*!
         //todo add skew to implement rotate around x/y/z axis for 3d rotate?

         can refer to http://www.senocular.com/flash/tutorials/transformmatrix/
         */
    }
}

