module wd{
    export abstract class EventTriggerUtils{
        public getEventTriggerListByTriggerMode(triggerList:wdCb.Collection<EventTriggerListData>){
            var topEntityObject:EntityObject = null,
                topEntityObject = this.getTopObject(
                    triggerList
                    .map((data:EventTriggerListData) => {
                        return data.entityObject;
                    })
                );

            //todo direct return one
            return topEntityObject ? wdCb.Collection.create([topEntityObject]) : wdCb.Collection.create();
        }

        protected abstract getTopObject(triggerList:wdCb.Collection<EntityObject>):EntityObject;
    }
}

