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


        public getSpacePartition(){
            return this.getComponent<SpacePartition>(SpacePartition);
        }

        public getComponent<T>(_class:any):T{
            //todo optimize "instanceof"
            //todo refactor
            if(_class.name === "Geometry"){
                let lod:LODController = this.getComponent<LODController>(LODController),
                    geometry:Geometry = null;

                if(lod) {
                    geometry = lod.activeGeometry;

                    if(geometry){
                        return <any>geometry;
                    }
                }
            }

            return <any>super.getComponent(_class);
        }

        public update(elapsedTime:number):void {
            var lod = this.getComponent<LODController>(LODController);

            if(lod){
                lod.update(elapsedTime);
            }

            super.update(elapsedTime);
        }

        protected createTransform(){
            return ThreeDTransform.create();
        }

        protected getRenderList(){
            if(this.hasComponent(Octree)){
                return this.getSpacePartition().getRenderListByFrustumCull();
            }

            return this.children;
        }

        protected afterInitChildren(){
            if(this.hasComponent(Octree)){
                return this.getSpacePartition().build();
            }
        }
    }
}

