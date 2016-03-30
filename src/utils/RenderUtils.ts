module wd{
    export class RenderUtils{
        //todo correspond refactor related class
        public static isInstanceAndHardwareSupport(gameObject:GameObject){
            return GPUDetector.getInstance().extensionInstancedArrays !== null && gameObject.hasComponent(Instance);
        }

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

            return this._replaceObjectInstanceObjectWithItsSourceObject(renderList);
        }

        private static _replaceObjectInstanceObjectWithItsSourceObject(renderList:wdCb.Collection<GameObject>){
            var map = wdCb.Hash.create<GameObject>();

            renderList.forEach((child:GameObject) => {
                if(child.hasComponent(ObjectInstance)){
                    let sourceObject:GameObject = (child.getComponent<ObjectInstance>(ObjectInstance)).sourceObject;

                    map.addChild(String(sourceObject.uid), sourceObject);

                    return;
                }

                map.addChild(String(child.uid), child);
            });

            return map.toCollection();
        }
    }
}

