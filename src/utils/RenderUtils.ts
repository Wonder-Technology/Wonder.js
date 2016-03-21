module wd{
    export class RenderUtils{
        public static getGameObjectRenderList(sourceList:wdCb.Collection<GameObject>){
            return sourceList.filter((child:GameObject, index:number) => {
                return child.isVisible && (GPUDetector.getInstance().extensionInstancedArrays === null || !child.hasComponent(ObjectInstance));
            });
        }

        public static getGameObjectRenderListForOctree(sourceList:wdCb.Collection<GameObject>){
            return sourceList.filter((child:GameObject) => {
                return child.isVisible;
            });
        }

        public static getGameObjectRenderListFromSpacePartition(renderList:wdCb.Collection<GameObject>){
            if(GPUDetector.getInstance().extensionInstancedArrays === null){
                return renderList;
            }

            return this.getRenderListByConsiderInstance(renderList);
        }

        @require(function(sourceObject:GameObject, sourceInstanceComponent:SourceInstance){
            assert(sourceInstanceComponent.hasToRenderInstance(), Log.info.FUNC_SHOULD("top SourceInstance", "has to render instance"));
        })
        private static _setToRenderInstanceListOfChildren(sourceObject:GameObject, sourceInstanceComponent:SourceInstance){
            var set = (sourceObject:GameObject, sourceInstanceComponent:SourceInstance) => {
                sourceObject.forEach((childSource:GameObject, index:number) => {
                    var childSourceInstance:SourceInstance = childSource.getComponent<SourceInstance>(SourceInstance);

                    sourceInstanceComponent.forEachToRenderInstanceList((toRenderInstance:GameObject) => {
                        childSourceInstance.addToRenderIntance(toRenderInstance.getChild(index));

                    });
                    set(childSource, childSourceInstance);
                })
            };

            set(sourceObject, sourceInstanceComponent);
        }

        @require(function(self:GameObject, instanceComponent:SourceInstance){
            assert(instanceComponent instanceof SourceInstance, Log.info.FUNC_ONLY("SourceInstance has toRenderList"));

            instanceComponent.forEachToRenderInstanceList((instance:GameObject) => {
                assert(!JudgeUtils.isEqual(instance, self), Log.info.FUNC_SHOULD_NOT("toRenderInstanceList", "contain self"));
            })
        })
        private static _addSelfToToRenderInstanceList(self:GameObject, instanceComponent:SourceInstance){
            instanceComponent.addToRenderIntance(self);
        }

        private static getRenderListByConsiderInstance(renderList:wdCb.Collection<GameObject>){
            var self = this,
                instanceSourceMap = wdCb.Hash.create<GameObject>(),
                map = wdCb.Hash.create<GameObject>();

            instanceSourceMap = wdCb.Hash.create<GameObject>(),
                map = wdCb.Hash.create<GameObject>();

            renderList.forEach((child:GameObject) => {
                if(!child.hasComponent(Instance)){
                    map.addChild(String(child.uid), child);
                    return;
                }

                if(child.hasComponent(SourceInstance)){
                    let instanceComponent:SourceInstance = child.getComponent<SourceInstance>(SourceInstance);

                    self._addSelfToToRenderInstanceList(child, instanceComponent);

                    map.addChild(String(child.uid), child);
                    return;
                }

                let sourceObject:GameObject = (child.getComponent<ObjectInstance>(ObjectInstance)).sourceObject,
                    sourceInstanceComponent:SourceInstance = sourceObject.getComponent<SourceInstance>(SourceInstance);

                self._addSelfToToRenderInstanceList(child, sourceInstanceComponent);
                instanceSourceMap.addChild(String(sourceObject.uid), sourceObject);
            });

            instanceSourceMap.forEach((sourceObject:GameObject, uid:string) => {
                var sourceInstanceComponent:SourceInstance = sourceObject.getComponent<SourceInstance>(SourceInstance);

                map.addChild(uid, sourceObject);

                self._setToRenderInstanceListOfChildren(sourceObject, sourceInstanceComponent);
            });

            return map.toCollection();
        }
    }
}

