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
            this._isTranslate = isTranslate;

            if(isTranslate){
                this.dirtyLocal = true;
                this.clearCache();
                this.handleWhenSetIsTranslate();

                this.setChildrenTransformState("isTranslate");
            }
        }

        private _isRotate:boolean = false;
        get isRotate(){
            return this._isRotate;
        }
        set isRotate(isRotate:boolean){
            this._isRotate = isRotate;

            if(isRotate){
                this.dirtyLocal = true;
                this.clearCache();
                this.handleWhenSetIsRotate();

                this.setChildrenTransformState("isRotate");
            }
        }

        private _isScale:boolean = false;
        get isScale(){
            return this._isScale;
        }
        set isScale(isScale:boolean){
            this._isScale = isScale;

            if(isScale){
                this.dirtyLocal = true;
                this.clearCache();
                this.handleWhenSetIsScale();

                this.setChildrenTransformState("isScale");
            }
        }

        public dirtyLocal:boolean = true;

        protected children:wdCb.Collection<Transform> = wdCb.Collection.create<Transform>();


        public addChild(child:Transform){
            this.children.addChild(child);
        }

        public removeChild(child:Transform){
            this.children.removeChild(child);
        }

        protected abstract clearCache():void;

        @virtual
        protected handleWhenSetIsTranslate():void{
        }

        @virtual
        protected handleWhenSetIsRotate():void{
        }

        @virtual
        protected handleWhenSetIsScale():void{
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

        protected setChildrenTransformState(transformState:string){
            if(this[transformState]){
                this.children.forEach((child:Transform) => {
                    child[transformState] = true;
                });
            }
        }

    }
}
