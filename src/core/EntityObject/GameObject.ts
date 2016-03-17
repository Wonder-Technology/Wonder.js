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

            //todo refactor?
            this.instanceList = wdCb.Collection.create<GameObject>();
            this.toRenderInstanceList = wdCb.Collection.create<GameObject>();
        }

        //todo refactor?
        public onEndLoop() {
            super.onEndLoop();

            this.toRenderInstanceList.removeAllChildren();
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







        @require(function(){
            assert(!this.getSpacePartition(), Log.info.FUNC_NOT_SUPPORT("space partition", "instance"));
            assert(!this.getComponent(LODController), Log.info.FUNC_NOT_SUPPORT("lod", "instance"));
            //todo more?
        })
        public cloneInstance(name:string):GameObject{
            //var self = this,
            var instance = GameObject.create();

            //clone transform
            //
            //instance
            //com,tags,
            //    children


            this.components
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
                //todo optimize
                let renderList = this.getSpacePartition().getRenderListByFrustumCull();

                var instanceSourceMap = wdCb.Hash.create<GameObject>();

                //var list = wdCb.Collection.create<GameObject>();
                var map = wdCb.Hash.create<GameObject>();





                renderList.forEach((child:GameObject) => {
                    if(!child.isInstance()){
                        if(child.hasInstance()) {
                            child.toRenderInstanceList.addChild(child);
                        }

                        map.addChild(String(child.uid), child);
                        return;
                    }

                    child.instanceSource.toRenderInstanceList.addChild(child);
                    instanceSourceMap.addChild(String(child.instanceSource.uid), child.instanceSource);
                });



                var self = this;

                instanceSourceMap.forEach((instanceSource:GameObject, uid:string) => {
                    map.addChild(uid, instanceSource);



                    if(instanceSource.hasToRenderInstance()){
                        self._setToRenderInstanceListOfChildren(instanceSource);
                    }
                });


                //instanceSourceMap
                //.forEach((child:GameObject) => {
                //    if(child.hasToRenderInstance()){
                //
                //    }
                //});

                //return map.toCollection();
            }

            //todo refactor with GameObjectScene->getRenderList
            //return this.children.filter((child:GameObject) => {
            //    //todo test isVisible
            //    return child.isVisible && !child.isInstanceAndHardwareSupport();
            //});
            return RenderUtils.getGameObjectRenderList(this.children);
        }

        private _setToRenderInstanceListOfChildren(instanceSource:GameObject){
            var set = (instanceSource:GameObject) => {
                instanceSource.forEach((childSource:GameObject, index:number) => {
                    instanceSource.toRenderInstanceList.forEach((toRenderInstance:GameObject) => {
                        childSource.toRenderInstanceList.addChild(toRenderInstance.getChild(index));

                    });
                    set(childSource);
                })
            }

            set(instanceSource);
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

