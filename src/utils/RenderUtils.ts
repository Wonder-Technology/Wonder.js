module wd{
    export class RenderUtils{
        public static getGameObjectRenderList(sourceList:wdCb.Collection<GameObject>){
            var list = wdCb.Collection.create<GameObject>();
                //isHardwareSupportInstance = GPUDetector.getInstance().extensionInstancedArrays !== null;

            sourceList.forEach((child:GameObject) => {
                if(!child.isVisible){
                    return;
                }

                list.addChild(child);

                //if(child.hasInstance() && !isHardwareSupportInstance){
                if(!child.isInstanceAndHardwareSupport()){
                    list.addChildren(child.instanceList);
                }
            });

            return list;
        }
    }
}
