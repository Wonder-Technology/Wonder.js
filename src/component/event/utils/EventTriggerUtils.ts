module wd{
    export abstract class EventTriggerUtils{


        public getEventTriggerListByTriggerMode(triggerList:wdCb.Collection<EventTriggerListData>){
            var topEntityObject:EntityObject = null,
                selectedEntityObject:wdCb.Collection<EntityObject> = null,
                topEntityObject = this.getTopObject(triggerList.filter((data:EventTriggerListData) => {
                        return data.triggerMode === EventTriggerMode.TOP
                    })
                    .map((data:EventTriggerListData) => {
                    return data.entityObject;
                })
            );

            selectedEntityObject = triggerList.filter((data:EventTriggerListData) => {
                    return data.triggerMode === EventTriggerMode.SELECTED;
                })
                .map((data:EventTriggerListData) => {
                    return data.entityObject;
                });

            return topEntityObject ? selectedEntityObject.addChild(topEntityObject) : selectedEntityObject;
        }

        protected abstract getTopObject(triggerList:wdCb.Collection<EntityObject>):EntityObject;
    }
}

