module wd {
    export class GameObject extends EntityObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public transform:ThreeDTransform;

        public name:string = `gameObject${String(this.uid)}`;

        protected children:wdCb.Collection<GameObject>;

        protected createTransform(){
            return ThreeDTransform.create();
        }

        protected getRenderList(){
            if(this.hasComponent(Octree)){
                console.log(this._getOctree().getRenderListByFrustumCull().getCount());
                return this._getOctree().getRenderListByFrustumCull();
            }

            return this.children;
        }

        protected afterInitChildren(){
            if(this.hasComponent(Octree)){
                return this._getOctree().build();
            }
        }

        private _getOctree(){
            return this.getComponent<Octree>(Octree);
        }
    }
}

