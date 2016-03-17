module wd{
    export class RenderUtils{
        public static getGameObjectRenderList(sourceList:wdCb.Collection<GameObject>){
            var list = wdCb.Collection.create<GameObject>();

            sourceList.forEach((child:GameObject, index:number) => {
                if(!child.isVisible){
                    return;
                }

                //if(child.isInstanceAndHardwareSupport()){
                //    child.instanceSource.toRenderInstanceList.addChild(child);
                //
                //    return;
                //}

                if(child.hasInstanceAndHardwareSupport()
                && !child.hasToRenderInstance()
                ){
                    //if(child.parent.toRenderInstanceList){
                    //    child.toRenderInstanceList.addChildren(child.parent.toRenderInstanceList
                    //        .filter((instance:GameObject) => {
                    //            return instance.getChild(index);
                    //        })
                    //    );
                    //}
                    child.toRenderInstanceList.addChild(child);
                    child.toRenderInstanceList.addChildren(child.instanceList);
                    //return;
                }

                if(!child.isInstanceAndHardwareSupport()){
                    list.addChild(child);
                }
            });

            return list;
        }

        public static getGameObjectRenderListForOctree(sourceList:wdCb.Collection<GameObject>){
            var list = wdCb.Collection.create<GameObject>();

            sourceList.forEach((child:GameObject) => {
                if(!child.isVisible){
                    return;
                }

                //if(child.isInstanceAndHardwareSupport()){
                //    child.instanceSource.toRenderInstanceList.addChild(child);
                //
                //    //return;
                //}
                //if(!child.isInstanceAndHardwareSupport()){
                list.addChild(child);
                //}
            });

            return list;
        }
    }
}
