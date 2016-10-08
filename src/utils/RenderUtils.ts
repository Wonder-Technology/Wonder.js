module wd{
    export class RenderUtils{
        public static getGameObjectRenderList(sourceList:wdCb.Collection<GameObject>){
            var renderList = [];

            sourceList.forEach((child:GameObject) => {
                var gameObjectLOD = child.getComponent<GameObjectLOD>(GameObjectLOD),
                activeGameObject:GameObject = null;

                if(gameObjectLOD){
                    if(gameObjectLOD.activeGameObject === null){
                        //todo optimize:use temp Collection
                     return wdCb.Collection.create<GameObject>();
                    }

                    activeGameObject = gameObjectLOD.activeGameObject;

                    // if(activeGameObject.isVisible && (!InstanceUtils.isObjectInstance(activeGameObject)){
                    //     if(!InstanceUtils.isObjectInstance(activeGameObject)){
                    //     renderList.push(activeGameObject);
                    // }
                }
                else{
                    activeGameObject = child;
                }

                if(activeGameObject.isVisible && !InstanceUtils.isObjectInstance(activeGameObject)){
                    renderList.push(activeGameObject);
                }
            });

            //todo optimize:use temp Collection
            return wdCb.Collection.create<GameObject>(renderList);
        }

        public static getGameObjectRenderListForOctree(sourceList:wdCb.Collection<GameObject>){
            //todo modify
            return sourceList.filter((child:GameObject) => {
                return child.isVisible;
            });
        }
    }
}

