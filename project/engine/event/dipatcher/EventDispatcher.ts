/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    export class EventDispatcher {
        public static create() {
            var obj = new this();

            return obj;
        }

        //private _eventBinder: EventBinder = null;
        //private _eventRegister:EventRegister = null;

        constructor() {
            //this._eventBinder = binder;
            //EventRegister.getInstance() = register;
        }

        //dispatch in eventBinder->eventList


        //public setBubbleParent(target:GameObject, parent:any) {
        //    EventRegister.getInstance().setBubbleParent(target, parent);
        //}

        public trigger(target:GameObject, eventObject:Event) {
            if (!(target instanceof GameObject)) {
                dyCb.Log.log("target is not GameObject, can't trigger event");
                return;
            }

            var self = this;
            //var eventType = this._eventBinder.getEventType(eventName);
            //var eventType = EventTable.getEventType(eventName);
            var eventType= eventObject.type,
                eventName= eventObject.name;

            //eventObject.stopPropagation();

            //todo move to eventbinder?
            //may bind multi listener on eventName(based on priority)
            var listenerDataList = EventRegister.getInstance().getListenerDataList(target, eventName);

            if (listenerDataList === null || listenerDataList.getCount()=== 0) {
                return;
            }

            listenerDataList.forEach((listenerData:IEventRegisterData) => {
                //FactoryEventHandler.createEventHandler(eventType).trigger(target, listener.handlerDataList, eventName);
                FactoryEventHandler.createEventHandler(eventType).trigger(
                    //target,
                    listenerData.currentTarget,
                    //todo need copy?
                    //eventObject.copy(),
                    eventObject,
                    //FactoryEventHandler.createEvent(eventType, eventName, EventPhase.EMIT),
                    listenerData.handler
                );
            });
        }

        /**
         * transfer event up
         * @param target
         * @param eventObject
         */
        public emit(target:GameObject, eventObject:Event) {
            var eventRegister:EventRegister = EventRegister.getInstance(),
                parent:GameObject = null;

            eventObject.phase = EventPhase.EMIT;

            this.trigger(target, eventObject);

            parent = eventRegister.getParent(target);
            while (parent) {
                //this.trigger(target, eventObject);
                this.trigger(parent, eventObject);

                parent = eventRegister.getParent(parent);
            }
        }

        /**
         * transfer event down
         * @param target
         * @param eventObject
         */
        public broadcast(target:GameObject, eventObject:Event) {
        }
    }
}
