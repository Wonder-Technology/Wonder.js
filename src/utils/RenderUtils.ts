module wd{
    export class RenderUtils{
        public static getGameObjectRenderList(sourceList:wdCb.Collection<GameObject>){
            var list = wdCb.Collection.create<GameObject>();

            sourceList.forEach((child:GameObject) => {
                if(!child.isVisible){
                    return;
                }

                if(!child.isInstanceAndHardwareSupport()){
                    list.addChild(child);
                }
            });

            return list;
        }
    }
}
