module wd{
    export class Transform extends Component{
        private _isTranslate:boolean = false;
        get isTranslate(){
            return this._isTranslate;
        }
        set isTranslate(isTranslate:boolean){
            this._isTranslate = isTranslate;

            if(isTranslate){
                this.dirtyLocal = true;
            }

            this.children.forEach((child:ThreeDTransform) => {
                child.isTranslate = isTranslate;
            });
        }

        private _isRotate:boolean = false;
        get isRotate(){
            return this._isRotate;
        }
        set isRotate(isRotate:boolean){
            this._isRotate = isRotate;

            if(isRotate){
                this.dirtyLocal = true;
            }

            this.children.forEach((child:ThreeDTransform) => {
                child.isRotate = isRotate;
            });
        }

        private _isScale:boolean = false;
        get isScale(){
            return this._isScale;
        }
        set isScale(isScale:boolean){
            this._isScale = isScale;

            if(isScale){
                this.dirtyLocal = true;
            }

            this.children.forEach((child:ThreeDTransform) => {
                child.isScale = isScale;
            });
        }

        protected p_parent:Transform = null;
        get parent(){
            return this.p_parent;
        }
        set parent(parent:Transform){
            this.setParent(parent);
        }

        public dirtyLocal:boolean = true;

        protected children:wdCb.Collection<Transform> = wdCb.Collection.create<Transform>();


        public init(){
            var self = this;

            EventManager.on(<any>EngineEvent.ENDLOOP, () => {
                self._resetThreeDTransformFlag();
            });
        }

        public addChild(child:Transform){
            this.children.addChild(child);
        }

        public removeChild(child:Transform){
            this.children.removeChild(child);
        }

        protected setParent(parent:Transform){
            if(this.p_parent){
                this.p_parent.removeChild(this);
            }

            if(!parent){
                this.p_parent = null;

                return;
            }

            this.p_parent = parent;
            this.p_parent.addChild(this);

            //todo can has multi parent?
        }

        protected getMatrix(syncMethod:string, matrixAttriName:string){
            var syncList = wdCb.Collection.create<Transform>(),
                current = this.p_parent;

            syncList.addChild(this);

            while (current !== null) {
                syncList.addChild(current);
                current = current.parent;
            }

            syncList.reverse().forEach((transform:Transform) => {
                transform[syncMethod]();
            });

            return this[matrixAttriName];
        }

        private _resetThreeDTransformFlag(){
            this.isTranslate = false;
            this.isScale = false;
            this.isRotate = false;
        }
    }
}
