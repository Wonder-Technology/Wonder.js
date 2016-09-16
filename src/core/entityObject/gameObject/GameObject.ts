module wd {
    export class GameObject extends EntityObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        @require(function(gameObjectArr:Array<GameObject>){
            var checkShouldContainGeometry = (gameObject:GameObject) => {
                    assert(gameObject.hasComponent(Geometry), Log.info.FUNC_SHOULD("contain geometry component"));
                },
                checkShouldHasTheSameMaterialClass = () => {
                    var sourceObject = gameObjectArr[0],
                        materialClassName:string = null;

                    checkShouldContainGeometry(sourceObject);

                    materialClassName = ClassUtils.getClassName(sourceObject.getComponent<Geometry>(Geometry).material);

                    for(let i = 1, len = gameObjectArr.length; i < len; i++){
                        let gameObject = gameObjectArr[i];

                        checkShouldContainGeometry(gameObject);

                        assert(ClassUtils.getClassName(gameObject.getComponent<Geometry>(Geometry).material) === materialClassName, Log.info.FUNC_SHOULD("gameObjectArr", "has the same material class"));
                    }
                };

            assert(gameObjectArr.length > 1, Log.info.FUNC_SHOULD("object count", "> 1"));

            checkShouldHasTheSameMaterialClass();
        })
        @ensure(function(mergedObject:GameObject){
            assert(mergedObject.getChildren().getCount() === 0, Log.info.FUNC_SHOULD("merged object", "has no children"));
        })
        public static merge(gameObjectArr:Array<GameObject>){
            var source:GameObject = gameObjectArr[0],
            resultObject:GameObject = source.clone({
                cloneChildren:false,
                cloneGeometry:false
            }),
                mergedGeometry:ModelGeometry = ModelGeometry.create();

            resultObject.removeAllChildren();

            for(let gameObject of gameObjectArr){
                mergedGeometry.merge(gameObject.getComponent<Geometry>(Geometry), gameObject.transform);
            }

            mergedGeometry.material = source.getComponent<Geometry>(Geometry).material.clone();

            resultObject.addComponent(mergedGeometry);

            return resultObject;
        }

        public transform:ThreeDTransform;
        public parent:GameObject;

        public renderGroup:number = 0;
        public renderPriority:number = 0;

        protected children:wdCb.Collection<GameObject>;

        public initWhenCreate(){
            super.initWhenCreate();

            this.name = `gameObject${String(this.uid)}`;
        }

        public getSpacePartition(){
            return this.getComponent<SpacePartition>(SpacePartition);
        }

        public getGeometry():Geometry{
            var lod:LOD = this.getComponent<LOD>(LOD);

            if(lod && lod.activeGeometry) {
                return <any>lod.activeGeometry;
            }

            return super.getGeometry();
        }

        protected createTransform(){
            return ThreeDTransform.create();
        }

        protected getRenderList(){
            if(this.hasComponent(Octree)){
                return this.getSpacePartition().getRenderList();
            }

            return RenderUtils.getGameObjectRenderList(this.getChildren());
        }

        protected afterInitChildren(){
            if(this.hasComponent(Octree)){
                return this.getSpacePartition().build();
            }
        }
    }
}

