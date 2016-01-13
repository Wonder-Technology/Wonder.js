module wd{
    export class Transform extends Component{
        protected p_parent:Transform = null;
        get parent(){
            return this.p_parent;
        }
        set parent(parent:Transform){
            this.setParent(parent);
        }

        public dirtyLocal:boolean = true;

        protected children:wdCb.Collection<Transform> = wdCb.Collection.create<Transform>();


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

        protected setChildrenTransformState(transformState:string){
            if(this[transformState]){
                this.children.forEach((child:Transform) => {
                    child[transformState] = transformState;
                });
            }
        }

    }
}
