module wd{
    export class BoneMatrix{
        public static create(localMatrix:Matrix4) {
        	var obj = new this(localMatrix);

        	return obj;
        }

        constructor(localMatrix:Matrix4){
            this._localMatrix = localMatrix;
        }

        @cloneAttributeAsCloneable()
        private _localMatrix:Matrix4 = null;
        get localMatrix(){
            return this._localMatrix;
        }

        private _globalMatrix:Matrix4 = null;
        get globalMatrix(){
            if(this.dirtyLocal){
                this.dirtyLocal = false;
                this.dirtyGlobal = true;
            }

            if(this.dirtyGlobal){
                if(this.parent === null){
                    this._globalMatrix = this._localMatrix;
                }
                else{
                    this._globalMatrix = this._localMatrix.applyMatrix(this.parent.globalMatrix, true);
                }

                this.dirtyGlobal = false;

                this._children.forEach((child:BoneMatrix) => {
                    child.dirtyGlobal = true;
                });
            }

            return this._globalMatrix;
        }

        private _parent:BoneMatrix = null;
        @cloneAttributeAsBasicType()
        get parent(){
            return this._parent;
        }
        set parent(parent:BoneMatrix){
            if(this._parent !== null){
                this._parent.removeChild(this);
            }

            if(!parent){
                this._parent = null;

                return;
            }

            this._parent = parent;
            this._parent.addChild(this);
        }

        public dirtyLocal:boolean = true;
        public dirtyGlobal:boolean = null;

        private _children:wdCb.Collection<BoneMatrix> = wdCb.Collection.create<BoneMatrix>();

        public clone(){
            return CloneUtils.clone(this);
        }

        public updateLocalMatrix(localMatrix:Matrix4){
            this._localMatrix = localMatrix;

            this.dirtyLocal = true;
        }

        public removeChild(boneMat:BoneMatrix){
            this._children.removeChild(boneMat);
        }

        public addChild(boneMat:BoneMatrix){
            this._children.addChild(boneMat);
        }
    }
}
