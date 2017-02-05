module wd{
    export class RenderUtils{
        public static getGameObjectRenderList(sourceList:wdCb.Collection<GameObject>){
            var renderList = [];
                // GameObjectLOD:any = ClassUtils.getClass("GameObjectLOD");

            sourceList.forEach((child:GameObject) => {
                var activeGameObject:GameObject = null;

                activeGameObject = child;

                // if(activeGameObject.isVisible && !InstanceUtils.isObjectInstance(activeGameObject)){
                    if(activeGameObject.isVisible){
                    renderList.push(activeGameObject);
                }
            });

            //todo optimize:use temp Collection
            return wdCb.Collection.create<GameObject>(renderList);
        }
    }
}

