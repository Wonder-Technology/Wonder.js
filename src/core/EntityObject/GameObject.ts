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

        public initWhenCreate(){
            super.initWhenCreate();

            this.instanceList = wdCb.Collection.create<GameObject>();
        }

        public getSpacePartition(){
            return this.getComponent<SpacePartition>(SpacePartition);
        }

        public getComponent<T>(_class:any):T{
            if(this._isGeometry(_class)){
                let lod:LODController = this.getComponent<LODController>(LODController);

                if(lod && lod.activeGeometry) {
                    return <any>lod.activeGeometry;
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







        public cloneInstance(name:string):GameObject{
            //var self = this,
            var instance = GameObject.create();

            //clone transform
            //
            //instance
            //com,tags,
            //    children

            instance.transform = this.transform.clone();

            this.components.filter((component:Component) => {
                return !(component instanceof Transform);
            })
            .forEach((component:Component) => {
                //todo any more component should be share, not clone(to save the memory)?
                if(component instanceof Geometry){
                    instance.addComponent(component, true);
                }
                else{
                    instance.addComponent(component.clone());
                }
            });

            //todo clone scriptList?

            instance.p_scriptList = this.scriptList;
            instance.bubbleParent = this.bubbleParent;
            instance.parent = this.parent;
            instance.isVisible = this.isVisible;

            this.getTagList().forEach((tag:string) => {
                instance.addTag(tag);
            });

            instance.name = name;

            instance.instanceSource = this;

            this.instanceList.addChild(instance);


            this.forEach((child:GameObject) => {
                instance.addChild(child.cloneInstance(`${name}_${child.name}`));
            });

            return instance;
        }

        public instanceSource:GameObject;



        //todo removeChild should remove its instances? no?

        public onDispose() {
            super.onDispose();

            //todo dispose instance
        }

        //public init(){
        //    if(this.hasInstance()){
        //        this.instanceList.forEach((instance:any) => {
        //            instance.init();
        //        })
        //    }
        //
        //    return <any>super.init();
        //}





        protected createTransform(){
            return ThreeDTransform.create();
        }

        //todo optimize:add cache
        protected getRenderList(){
            if(this.hasComponent(Octree)){
                //todo change
                return this.getSpacePartition().getRenderListByFrustumCull();
            }

            //todo refactor with GameObjectScene->getRenderList
            //return this.children.filter((child:GameObject) => {
            //    //todo test isVisible
            //    return child.isVisible && !child.isInstanceAndHardwareSupport();
            //});
            return RenderUtils.getGameObjectRenderList(this.children);
        }

        protected afterInitChildren(){
            if(this.hasComponent(Octree)){
                return this.getSpacePartition().build();
            }
        }

        private _isGeometry(_class:any){
            return _class.name === "Geometry";
        }
    }
}

