module wd{
    export class UIEventTriggerUtils{
        public static getTriggerListByTriggerMode(triggerList:wdCb.Collection<EventTriggerListData>){
            var topUIObject:UIObject = null,
                selectedUIObject:wdCb.Collection<UIObject> = null,
                topUIObject = this.getTopUIObject(triggerList.filter((data:EventTriggerListData) => {
                        return data.triggerMode === EventTriggerMode.TOP
                    })
                    .map((data:EventTriggerListData) => {
                    return data.entityObject;
                })
            );

            selectedUIObject = triggerList.filter((data:EventTriggerListData) => {
                    return data.triggerMode === EventTriggerMode.SELECTED;
                })
                .map((data:EventTriggerListData) => {
                    return data.entityObject;
                });

            return topUIObject ? selectedUIObject.addChild(topUIObject) : selectedUIObject;
        }

        public static getTopUIObject(triggerList:wdCb.Collection<UIObject>){
            return triggerList.sort((a:UIObject, b:UIObject) => {
                    return b.transform.zIndex - a.transform.zIndex;
                })
                .getChild(0);
        }
    }

    type EventTriggerListData = {
        entityObject:EntityObject,
        triggerMode:EventTriggerMode
    }
}

