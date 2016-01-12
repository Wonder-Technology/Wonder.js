module wd {
    export abstract class Scene extends EntityObject{
        protected eventTriggerUtils:EventTriggerUtils = ABSTRACT_ATTRIBUTE;

        public getMouseEventTriggerList(e:MouseEvent){
            var triggerList = wdCb.Collection.create<EventTriggerListData>();

            this.filter((entityObject:EntityObject) => {
                    return entityObject.hasComponent(EventTriggerDetector);
                })
                .forEach((entityObject:EntityObject) => {
                    var detector = entityObject.getComponent<EventTriggerDetector>(EventTriggerDetector);

                    if(detector.isTrigger(e)){
                        triggerList.addChild({
                            entityObject: entityObject
                            , triggerMode: detector.triggerMode
                        });
                    }
                });

            return this.eventTriggerUtils.getEventTriggerListByTriggerMode(triggerList);
        }
    }

    export type EventTriggerListData = {
        entityObject:EntityObject,
        triggerMode:EventTriggerMode
    }
}

