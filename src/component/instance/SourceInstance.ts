module wd{
    export class SourceInstance extends Instance{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _toRenderInstanceList:wdCb.Collection<any> = wdCb.Collection.create<GameObject>();

        @ensureGetter(function(toRenderInstanceListForDraw){
            var self = this;

            assert(toRenderInstanceListForDraw.getCount() > 0, Log.info.FUNC_SHOULD("contain one at least"));

            toRenderInstanceListForDraw.forEach((instance:GameObject) => {
                assert(JudgeUtils.isEqual(instance, self.entityObject) || self.instanceList.hasChild(instance), Log.info.FUNC_SHOULD("render self entityObject or the entityObject in instanceList"));
            });
        })
        get toRenderInstanceListForDraw(){
            if(!this.hasToRenderInstance()){
                return this._toRenderInstanceList.addChild(this.entityObject).addChildren(this.instanceList);
            }

            return this._toRenderInstanceList;
        }

        private _instanceBuffer:InstanceBuffer = null;
        get instanceBuffer(){
            return this._instanceBuffer;
        }

        public entityObject:GameObject;

        public instanceList:wdCb.Collection<any> = wdCb.Collection.create<GameObject>();

        private _endLoopSubscription:wdFrp.IDisposable = null;
        private _isAddSourceInstanceToChildren:boolean = false;

        @ensure(function(){
            var checkChildren = (child:GameObject) => {
                assert(child.hasComponent(SourceInstance), Log.info.FUNC_SHOULD("children", "contain SourceInstance component"));

                child.forEach((c:GameObject) => {
                    checkChildren(c);
                });
            };

            this.entityObject.forEach((child:GameObject) => {
                checkChildren(child);
            });
        })
        public init(){
            var self = this;

            if(!this._isAddSourceInstanceToChildren){
                this._addSourceInstanceToChildren();
            }

            this._instanceBuffer = InstanceBuffer.create();

            this._endLoopSubscription = EventManager.fromEvent(<any>EEngineEvent.ENDLOOP)
            .subscribe(() => {
                self._toRenderInstanceList.removeAllChildren();
            });
        }

        @require(function(){
            /*! so here not dispose instance in instanceList */
            this._checkInstanceIsNotOnlyInInstanceListButAlsoInLoop();
        })
        public dispose(){
            this._endLoopSubscription.dispose();
        }

        @require(function(){
            var entityObject = this.entityObject;

            assert(!entityObject.getSpacePartition(), Log.info.FUNC_NOT_SUPPORT("space partition", "instance"));
            //todo more?
        })
        @ensure(function(instance:GameObject){
            assert(instance.hasComponent(ObjectInstance));
        })
        public cloneInstance(name:string):GameObject{
            var clone = (name:string, entityObject:GameObject) => {
                var instance:GameObject = GameObject.create(),
                    objectInstanceComponent = ObjectInstance.create(),
                    sourceInstanceList = null;


                //if(!entityObject.hasComponent(SourceInstance)){
                //    let sourceInstanceComponent = SourceInstance.create();
                //    sourceInstanceList = sourceInstanceComponent.instanceList;
                //
                //    entityObject.addComponent(sourceInstanceComponent);
                //}
                //else{
                    sourceInstanceList = entityObject.getComponent<SourceInstance>(SourceInstance).instanceList;
                //}

                this._addInstanceComponentsFromSource(entityObject, instance);

                objectInstanceComponent.sourceObject = entityObject;

                instance.addComponent(objectInstanceComponent);

                //todo clone scriptList?

                //instance.p_scriptList = this.scriptList;
                instance.bubbleParent = entityObject.bubbleParent;
                instance.parent = entityObject.parent;
                instance.isVisible = entityObject.isVisible;

                entityObject.getTagList().forEach((tag:string) => {
                    instance.addTag(tag);
                });

                instance.name = name;

                sourceInstanceList.addChild(instance);

                entityObject.forEach((child:GameObject) => {
                    instance.addChild(clone(`${name}_${child.name}`, child));
                });

                return instance;
            };

            this._addSourceInstanceToChildren();
            this._isAddSourceInstanceToChildren = true;

            return clone(name, this.entityObject);
        }

        public hasToRenderInstance(){
            return this._toRenderInstanceList && this._toRenderInstanceList.getCount() > 0;
        }

        public addToRenderIntance(instanceObj:GameObject){
            this._toRenderInstanceList.addChild(instanceObj);
        }

        public forEachToRenderInstanceList(func:(toRenderInstance:GameObject) => void){
            this._toRenderInstanceList.forEach(func);
        }

        private _addInstanceComponentsFromSource(source:GameObject, instance:GameObject){
            instance.removeComponent(Transform);

            source.forEachComponent((component:Component) => {
                //todo if hardware support, not add lod
                if(component instanceof SourceInstance){
                    return;
                }

                if(GPUDetector.getInstance().extensionInstancedArrays !== null){
                    if(component instanceof LOD){
                        return;
                    }
                }
                else if(component instanceof LOD){
                    instance.addComponent(component.clone(true));
                    return;
                }

                //todo any more component should be share, not clone(to save the memory)?
                //if(component instanceof Geometry || component instanceof LOD){
                    //if(component instanceof LOD){
                if(component instanceof Geometry){
                    instance.addComponent(component, true);
                }
                else{
                    instance.addComponent(component.clone());
                }
            });
        }

        private _addSourceInstanceToChildren(){
            var add = (child:GameObject) => {
                if(!child.hasComponent(SourceInstance)){
                    let sourceInstanceComponent = SourceInstance.create();

                    child.addComponent(sourceInstanceComponent);

                    child.forEach((c:GameObject) => {
                        add(c);
                    })
                }
            };

            this.entityObject.forEach((child:GameObject) => {
                add(child);
            });
        }

        private _checkInstanceIsNotOnlyInInstanceListButAlsoInLoop(){
            var scene:SceneDispatcher = Director.getInstance().scene,
                isInLoop:boolean = false;
            var isContainInstance = (instance, gameObject) => {
                gameObject.forEach((child:GameObject) => {
                    if(JudgeUtils.isEqual(child, instance)){
                        isInLoop = true;
                        return wdCb.$BREAK;
                    }

                    isContainInstance(instance, child);
                })
            };

            this.instanceList.forEach((instance:GameObject) => {
                isContainInstance(instance, scene);
            });

            assert(isInLoop, Log.info.FUNC_SHOULD("instance", "not only in instanceList, but also in the main loop"));
        }
    }
}
