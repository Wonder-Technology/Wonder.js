module wd{
    export class SourceInstance extends Instance{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _toRenderInstanceList:wdCb.Collection<any> = wdCb.Collection.create<GameObject>();

        @ensureGetter(function(toRenderInstanceListForDraw:wdCb.Collection<GameObject>){
            var self = this;

            assert(toRenderInstanceListForDraw.getCount() > 0, Log.info.FUNC_SHOULD("contain one at least"));

            toRenderInstanceListForDraw.forEach((instance:GameObject) => {
                assert(JudgeUtils.isEqual(instance, self.entityObject) || self.instanceList.hasChild(instance), Log.info.FUNC_SHOULD("render self entityObject or the entityObject in instanceList"));
            });

            assert(!toRenderInstanceListForDraw.hasRepeatItems(), Log.info.FUNC_SHOULD_NOT("has repeat instance which is to render"));
        })
        get toRenderInstanceListForDraw(){
            if(!this.hasToRenderInstance()){
                return this._toRenderInstanceList.clone().addChild(this.entityObject).addChildren(this.instanceList);
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
        private _enterSubscription:wdFrp.IDisposable = null;
        private _exitSubscription:wdFrp.IDisposable = null;

        @ensure(function(){
            this.entityObject.forEach((child:GameObject) => {
                IterateUtils.forEachAll(child, (child:GameObject) => {
                    assert(InstanceUtils.isSourceInstance(child), Log.info.FUNC_SHOULD("children", "contain SourceInstance component"));
                });
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

            this._enterSubscription = EventManager.fromEvent(this.entityObject, <any>EEngineEvent.ENTER)
                .subscribe(() => {
                    self._addAllInstances();
                });

            this._exitSubscription = EventManager.fromEvent(this.entityObject, <any>EEngineEvent.EXIT)
                .subscribe(() => {
                    self._removeAllInstances();
                });
        }

        @require(function(){
            this._checkInstanceIsNotOnlyInInstanceListButAlsoInLoop();
        })
        public dispose(){
            this._endLoopSubscription.dispose();
            this._enterSubscription.dispose();
            this._exitSubscription.dispose();

            this.instanceList.forEach((instance:GameObject) => {
                instance.dispose();
            })
        }

        @require(function(){
            var entityObject = this.entityObject;

            assert(!entityObject.getSpacePartition(), Log.info.FUNC_NOT_SUPPORT("space partition", "instance"));
            //todo more?
        })
        @ensure(function(instance:GameObject){
            assert(InstanceUtils.isObjectInstance(instance));
        })
        public cloneInstance(name:string):GameObject{
            var self = this;
            var clone = (name:string, entityObject:GameObject) => {
                var instance:GameObject = GameObject.create(),
                    objectInstanceComponent = ObjectInstance.create(),
                    sourceInstanceList = null;

                sourceInstanceList = entityObject.getComponent<SourceInstance>(SourceInstance).instanceList;

                instance.name = name;

                this._addComponentsFromSourceToObject(entityObject, instance);

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

                sourceInstanceList.addChild(instance);

                entityObject.forEach((child:GameObject) => {
                    instance.addChild(clone(self._buildInstanceChildName(name, child.name), child));
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

        private _addComponentsFromSourceToObject(source:GameObject, instance:GameObject){
            var isHardwareSupport:boolean = InstanceUtils.isHardwareSupport();

            instance.removeComponent(Transform);

            source.forEachComponent((component:Component) => {
                if(component instanceof SourceInstance
                || (isHardwareSupport && component instanceof LOD)){
                    return;
                }

                //todo any more component should be share, not clone(to save the memory)?
                if(component instanceof LOD){
                    instance.addComponent(component.clone(true));
                }
                else if(component instanceof Geometry){
                    instance.addComponent(component, true);
                }
                else{
                    instance.addComponent(component.clone());
                }
            });
        }

        private _addSourceInstanceToChildren(){
            var add = (child:GameObject) => {
                if(!InstanceUtils.isSourceInstance(child)){
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
            var scene:SceneDispatcher = null,
                children:wdCb.Collection<GameObject> = null,
                isInLoop:boolean = true;

            if(this.instanceList.getCount() === 0){
                return;
            }

            scene = Director.getInstance().scene;
            children = wdCb.Collection.create<GameObject>();

            IterateUtils.forEachAll(scene.gameObjectScene, (gameObject:GameObject) => {
                children.addChild(gameObject);
            });

            this.instanceList.forEach((instance:GameObject) => {
                if(!children.hasChild(instance)){
                    isInLoop = false;
                    return wdCb.$BREAK;
                }
            });

            assert(isInLoop, Log.info.FUNC_SHOULD("instance", "not only in instanceList, but also in the main loop"));
        }

        @ensure(function(){
            this.instanceList.forEach((instance:GameObject) => {
                assert(!instance.hasTag(<any>EInstanceTag.isAddSourceInstance), Log.info.FUNC_SHOULD_NOT("instance", "add EInstanceTag.isAddSourceInstance tag here"));
            });
        })
        private _addAllInstances(){
            var parent = this.entityObject.parent,
                tag:string = <any>(EInstanceTag.isAddSourceInstance);

            this.instanceList.forEach((instance:GameObject) => {
                instance.addTag(tag);
                parent.addChild(instance);
                instance.removeTag(tag);
            });
        }

        @ensure(function(){
            this.instanceList.forEach((instance:GameObject) => {
                assert(!instance.hasTag(<any>EInstanceTag.isRemoveSourceInstance), Log.info.FUNC_SHOULD_NOT("instance", "add EInstanceTag.isRemoveSourceInstance tag here"));
            });
        })
        private _removeAllInstances(){
            var tag:string = <any>(EInstanceTag.isRemoveSourceInstance);

            this.instanceList.forEach((instance:GameObject) => {
                instance.addTag(tag);
                instance.parent.removeChild(instance);
                instance.removeTag(tag);
            });
        }

        private _buildInstanceChildName(parentName:string, childName:string){
            return `${parentName}_${childName}`;
        }
    }
}
