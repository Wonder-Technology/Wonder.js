module wd{
    export class RenderUtils{
        public static getGameObjectRenderList(sourceList:wdCb.Collection<GameObject>){
            return sourceList.filter((child:GameObject, index:number) => {
                return child.isVisible && (!InstanceUtils.isHardwareSupport() || !InstanceUtils.isObjectInstance(child));
            });
        }

        public static getGameObjectRenderListForOctree(sourceList:wdCb.Collection<GameObject>){
            return sourceList.filter((child:GameObject) => {
                return child.isVisible;
            });
        }

        public static getGameObjectRenderListFromSpacePartition(renderList:wdCb.Collection<GameObject>){
            if(!InstanceUtils.isHardwareSupport()){
                return renderList;
            }

            return this._replaceObjectWhichContainObjectInstanceWithItsSourceObject(renderList);
        }

        private static _replaceObjectWhichContainObjectInstanceWithItsSourceObject(renderList:wdCb.Collection<GameObject>){
            var map = wdCb.Hash.create<GameObject>();

            renderList.forEach((child:GameObject) => {
                if(InstanceUtils.isObjectInstance(child)){
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

