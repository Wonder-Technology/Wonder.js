module wd{
    export class RenderUtils{
        //todo test
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

        //todo refactor
        public static getGameObjectRenderListFromSpacePartition(renderList:wdCb.Collection<GameObject>){
            var instanceSourceMap = wdCb.Hash.create<GameObject>();

            var map = wdCb.Hash.create<GameObject>();




            renderList.forEach((child:GameObject) => {
                if(!child.hasComponent(Instance)){
                    map.addChild(String(child.uid), child);
                    return;
                }


                if(child.hasComponent(SourceInstance)){
                    let instanceComponent:SourceInstance = child.getComponent<SourceInstance>(SourceInstance);

                    instanceComponent.addToRenderIntance(child);

                    map.addChild(String(child.uid), child);
                    return;
                }

                //todo add ensure ObjectInstance exist

                let sourceObject:GameObject = (child.getComponent<ObjectInstance>(ObjectInstance)).sourceObject,
                    sourceInstanceComponent:SourceInstance = sourceObject.getComponent<SourceInstance>(SourceInstance);

                sourceInstanceComponent.addToRenderIntance(child);
                instanceSourceMap.addChild(String(sourceObject.uid), sourceObject);
            });



            var self = this;

            instanceSourceMap.forEach((sourceObject:GameObject, uid:string) => {
                var sourceInstanceComponent:SourceInstance = sourceObject.getComponent<SourceInstance>(SourceInstance);

                map.addChild(uid, sourceObject);



                if(sourceInstanceComponent.hasToRenderInstance()){
                    self._setToRenderInstanceListOfChildren(sourceObject, sourceInstanceComponent);
                }
            });

            return map.toCollection();
        }

        private static _setToRenderInstanceListOfChildren(sourceObject:GameObject, sourceInstanceComponent:SourceInstance){
            var set = (sourceObject:GameObject) => {
                sourceObject.forEach((childSource:GameObject, index:number) => {
                    sourceInstanceComponent.forEachToRenderInstanceList((toRenderInstance:GameObject) => {
                        childSource.getComponent<SourceInstance>(SourceInstance).addToRenderIntance(toRenderInstance.getChild(index));

                    });
                    set(childSource);
                })
            }

            set(sourceObject);
        }
    }
}

