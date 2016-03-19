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

        public init(){
            var self = this;

            this._instanceBuffer = InstanceBuffer.create();

            this._endLoopSubscription = EventManager.fromEvent(<any>EEngineEvent.ENDLOOP)
            .subscribe(() => {
                self._toRenderInstanceList.removeAllChildren();
            });
        }

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


                if(!entityObject.hasComponent(SourceInstance)){
                    let sourceInstanceComponent = SourceInstance.create();
                    sourceInstanceList = sourceInstanceComponent.instanceList;

                    entityObject.addComponent(sourceInstanceComponent);
                }
                else{
                    sourceInstanceList = entityObject.getComponent<SourceInstance>(SourceInstance).instanceList;
                }

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
                if(component instanceof SourceInstance){
                    return;
                }

                //todo any more component should be share, not clone(to save the memory)?
                if(component instanceof Geometry){
                    instance.addComponent(component, true);
                }
                else{
                    instance.addComponent(component.clone());
                }
            });
        }
    }
}
