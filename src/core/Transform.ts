/// <reference path="../filePath.d.ts"/>
module wd{
    export class Transform extends Entity{
        protected p_parent:Transform = null;

        @virtual
        public init(){
        }


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
    }
}
