module wd{
    //todo extract SourceInstanceForInstanceGeometry
    export class SourceInstance extends Instance{
        public static create() {
            var obj = new this();

            return obj;
        }

        @ensureGetter(function(toRenderInstanceListForDraw:wdCb.Collection<GameObject>){
            it("should not be empty", () => {
                expect(toRenderInstanceListForDraw.getCount()).greaterThan(0);
            });
            it("should render self entityObject or the entityObject in instanceList", () => {
                toRenderInstanceListForDraw.forEach((instance:GameObject) => {
                    expect(JudgeUtils.isEqual(instance, this.entityObject) || this.instanceList.hasChild(instance)).true;
                });
            }, this);
            it("shouldn't has repeat instance which is to render", () => {
                expect(toRenderInstanceListForDraw.hasRepeatItems()).false;
            });
        })
        get toRenderInstanceListForDraw(){
            if(!this.hasToRenderInstance()){
                this._toRenderInstanceList = this.defaultToRenderInstanceList;
            }

            return this._toRenderInstanceList;
        }

        get defaultToRenderInstanceList(){
            return wdCb.Collection.create().addChild(this.entityObject).addChildren(this.instanceList);
        }

        private _instanceBuffer:InstanceBuffer = null;
        get instanceBuffer(){
            if(this._instanceBuffer === null){
                this._instanceBuffer = InstanceBuffer.create();
            }

            return this._instanceBuffer;
        }

        public entityObject:GameObject;

        @cloneAttributeAsCloneable()
        public instanceList:wdCb.Collection<any> = wdCb.Collection.create<GameObject>();

        private _toRenderInstanceList:wdCb.Collection<any> = wdCb.Collection.create<GameObject>();
        private _endLoopSubscription:wdFrp.IDisposable = null;
        private _isAddSourceInstanceToChildren:boolean = false;
        private _enterSubscription:wdFrp.IDisposable = null;
        private _exitSubscription:wdFrp.IDisposable = null;

        @ensure(function(){
            it("children should contain SourceInstance component", () => {
                this.entityObject.forEach((child:GameObject) => {
                    IterateUtils.forEachAll(child, (child:GameObject) => {
                        assert(InstanceUtils.isSourceInstance(child), Log.info.FUNC_SHOULD("children", "contain SourceInstance component"));
                    });
                });
            }, this);
        })
        public init(){
            var self = this;

            //todo move to SourceInstanceForInstanceGeometry
            // if(!InstanceUtils.isHardwareSupport()){
            //     //todo exist instance geometry
            //     this.entityObject.addChildren(this._createChildrenByInstanceGeometryAttributeData());
            // }

            if(!this._isAddSourceInstanceToChildren){
                this._addSourceInstanceToChildren();
            }

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
            it("instance is not only in instanceList but also in loop", () => {
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

                expect(isInLoop).true;
            }, this);
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

            it("space partition not support instance", () => {
                expect(entityObject.getSpacePartition()).false;
            });
            //todo more?
        })
        @ensure(function(instance:GameObject){
            it("should be object instance", () => {
                expect(InstanceUtils.isObjectInstance(instance)).true;
            });
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

        @ensure(function(returnValue:any, source:GameObject, instance:GameObject){
            it("instance should contain ThreeDTransform component", () => {
                expect(instance.hasComponent(ThreeDTransform)).true;
            });
        })
        private _addComponentsFromSourceToObject(source:GameObject, instance:GameObject){
            instance.removeComponent(Transform);

            source.forEachComponent((component:Component) => {
                if(component instanceof SourceInstance
                    || (component instanceof LOD)){
                    return;
                }

                if(component instanceof Geometry
                    || component instanceof Script){
                    instance.addComponent(component, true);
                }
                else{
                    instance.addComponent(component.clone());
                }
            });
        }

        @ensure(function(){
            it("children should contain only one SourceInstance component", () => {
                IterateUtils.forEachAll(this.entityObject, (gameObject:GameObject) => {
                    expect(
                        gameObject.getComponents()
                            .filter((component:Component) =>{
                                return component instanceof SourceInstance;
                            })
                            .getCount()
                    ).equal(1);
                });
            });
        })
        private _addSourceInstanceToChildren(){
            var add = (child:GameObject) => {
                if(!InstanceUtils.isSourceInstance(child)){
                    let sourceInstanceComponent = SourceInstance.create();

                    if(!child.hasComponent(SourceInstance)){
                        child.addComponent(sourceInstanceComponent);
                    }

                    child.forEach((c:GameObject) => {
                        add(c);
                    });
                }
            };

            this.entityObject.forEach((child:GameObject) => {
                add(child);
            });
        }

        @ensure(function(){
            it("instance shouldn't add EInstanceTag.isAddSourceInstance tag here", () => {
                this.instanceList.forEach((instance:GameObject) => {
                    expect(instance.hasTag(<any>EInstanceTag.isAddSourceInstance)).false;
                });
            }, this);
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
            it("instance shouldn't add EInstanceTag.isRemoveSourceInstance tag here", () => {
                this.instanceList.forEach((instance:GameObject) => {
                    expect(instance.hasTag(<any>EInstanceTag.isRemoveSourceInstance)).false;
                });
            }, this);
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

        // private _createChildrenByInstanceGeometryAttributeData(){
        //     var children = [],
        //         instanceCount = geometry.attributeData.getCount();
        //
        //     for(let i = 0; i < instanceCount; i++){
        //         children.push(this.entityObject.clone({
        //             cloneChildren:false,
        //             shareGeometry:true,
        //             cloneGeometry:true
        //     }));
        //     }
        //
        //     return children;
        // }
    }
}
