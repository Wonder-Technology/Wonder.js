module wd{
    export class RenderUtils{
        public static getGameObjectRenderList(sourceList:wdCb.Collection<GameObject>){
            //var isHardwareSupport = InstanceUtils.isHardwareSupport();

            //return sourceList.filter((child:GameObject, index:number) => {
            //    return child.isVisible && (!isHardwareSupport || !InstanceUtils.isObjectInstance(child));
            //});
            return sourceList.filter((child:GameObject, index:number) => {
                return child.isVisible && (!InstanceUtils.isObjectInstance(child));
            });
        }

        public static getGameObjectRenderListForOctree(sourceList:wdCb.Collection<GameObject>){
            return sourceList.filter((child:GameObject) => {
                return child.isVisible;
            });
        }
    }
}

