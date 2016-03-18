module wd{
    export class SourceInstance extends Instance{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _toRenderInstanceList:wdCb.Collection<any> = wdCb.Collection.create<GameObject>();
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
            //assert(!entityObject.getComponent(LODController), Log.info.FUNC_NOT_SUPPORT("lod", "instance"));
            //todo more?
        })
        public cloneInstance(name:string):GameObject{
            var clone = (name:string, entityObject:GameObject) => {
                var instance:GameObject = GameObject.create(),
                    objectInstanceComponent = ObjectInstance.create(),
                    //todo check exist
                    sourceInstanceList = null;

                if(!entityObject.hasComponent(SourceInstance)){
                    let sourceInstanceComponent = SourceInstance.create();
                    sourceInstanceList = sourceInstanceComponent.instanceList;

                    entityObject.addComponent(sourceInstanceComponent);
                }
                else{
                    sourceInstanceList = entityObject.getComponent<SourceInstance>(SourceInstance).instanceList;
                }




                //todo @ensure

                entityObject.forEachComponent((component:Component) => {
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



                objectInstanceComponent.sourceObject = entityObject;

                sourceInstanceList.addChild(instance);

                //todo test
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

                entityObject.forEach((child:GameObject) => {
                    instance.addChild(clone(`${name}_${child.name}`, child));
                });

                return instance;
            };

            return clone(name, this.entityObject);
        }

        @ensure(function(hasInstance){
            if(hasInstance){
                assert(!this.isInstance(), Log.info.FUNC_SHOULD_NOT("instance", "contain instance"));
            }
        })
        public hasInstance(){
            return this.instanceList && this.instanceList.getCount() > 0;
        }

        public hasInstanceAndHardwareSupport(){
            return GPUDetector.getInstance().extensionInstancedArrays !== null && this.hasInstance();
        }

        public hasToRenderInstance(){
            return this._toRenderInstanceList && this._toRenderInstanceList.getCount() > 0;
        }

        public isInstance(){
            return false;
        }

        public isInstanceAndHardwareSupport(){
            return false;
        }

        public addToRenderIntance(instanceObj:GameObject){
            this._toRenderInstanceList.addChild(instanceObj);
        }

        public forEachToRenderInstanceList(func:(toRenderInstance:GameObject) => void){
            this._toRenderInstanceList.forEach(func);
        }
    }
}
