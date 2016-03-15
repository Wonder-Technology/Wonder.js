module wd{
    export abstract class Transform extends Component{
        protected p_parent:Transform = null;
        get parent(){
            return this.p_parent;
        }
        set parent(parent:Transform){
            this.setParent(parent);
        }

        get isTransform(){
            return this.isTranslate || this.isRotate || this.isScale;
        }

        private _isTranslate:boolean = false;
        get isTranslate(){
            return this._isTranslate;
        }
        set isTranslate(isTranslate:boolean){
            this._setGlobalTransformState(ETransformState.ISTRANSLATE, isTranslate);
        }

        private _isRotate:boolean = false;
        get isRotate(){
            return this._isRotate;
        }
        set isRotate(isRotate:boolean){
            this._setGlobalTransformState(ETransformState.ISROTATE, isRotate);
        }

        private _isScale:boolean = false;
        get isScale(){
            return this._isScale;
        }
        set isScale(isScale:boolean){
            this._setGlobalTransformState(ETransformState.ISSCALE, isScale);
        }

        set isLocalTranslate(isTranslate:boolean){
            this._setLocalTransformState(ETransformState.ISLOCALTRANSLATE, isTranslate);
        }

        set isLocalRotate(isRotate:boolean){
            this._setLocalTransformState(ETransformState.ISLOCALROTATE, isRotate);
        }

        set isLocalScale(isScale:boolean){
            this._setLocalTransformState(ETransformState.ISLOCALSCALE, isScale);
        }

        public dirtyLocal:boolean = true;

        protected children:wdCb.Collection<Transform> = wdCb.Collection.create<Transform>();


        public addChild(child:Transform){
            this.children.addChild(child);
        }

        public removeChild(child:Transform){
            this.children.removeChild(child);
        }

        public setChildrenTransformState(transformState:ETransformState, state:boolean){
            if(state){
                this.children.forEach((child:Transform) => {
                    child[transformState] = true;
                });
            }
        }

        protected abstract clearCache():void;

        @virtual
        protected handleWhenSetTransformState(transformState:ETransformState):void{
        }

        protected copyHelper(newTransform:Transform){
            newTransform.parent = this.parent;

            //todo set transform state(isTranslate...)?

            return newTransform;
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

        private _setGlobalTransformState(transformState:ETransformState, state:boolean){
            this[`_${transformState}`] = state;

            if(state){
                this.dirtyLocal = true;
                this.clearCache();
                this.handleWhenSetTransformState(transformState);
            }

            if(state){
                this.setChildrenTransformState(transformState, state);
            }
        }

        private _setLocalTransformState(transformState:ETransformState, state:boolean){
            if(state){
                this.dirtyLocal = true;
                this.clearCache();
            }

            if(state){
                this.setChildrenTransformState(transformState, state);
            }
        }
    }
}
