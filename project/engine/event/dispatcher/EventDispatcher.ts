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
            //var eventCategory = this._eventBinder.getEventCategory(eventType);
            //var eventCategory = EventTable.getEventCategory(eventType);
            var eventCategory= eventObject.type,
                eventType= eventObject.name;

            //eventObject.stopPropagation();

            //todo move to eventbinder?
            //may bind multi listener on eventType(based on priority)
            var listenerDataList = EventRegister.getInstance().getListenerDataList(target, eventType);

            if (listenerDataList === null || listenerDataList.getCount()=== 0) {
                return;
            }

            listenerDataList.forEach((listenerData:IEventRegisterData) => {
                //FactoryEventHandler.createEventHandler(eventCategory).trigger(target, listener.handlerDataList, eventType);
                FactoryEventHandler.createEventHandler(eventCategory).trigger(
                    //target,
                    listenerData.currentTarget,
                    //todo need copy?
                    //eventObject.copy(),
                    eventObject,
                    //FactoryEventHandler.createEvent(eventCategory, eventType, EventPhase.EMIT),
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
            var parent:GameObject = null;

            eventObject.phase = EventPhase.EMIT;

            this.trigger(target, eventObject);

            parent = this._getParent(target);
            while (parent) {
                //this.trigger(target, eventObject);
                this.trigger(parent, eventObject);

                parent = this._getParent(parent);
            }
        }

        /**
         * transfer event down
         * @param target
         * @param eventObject
         */
        public broadcast(target:GameObject, eventObject:Event) {
        }

       private _getParent(target:GameObject):GameObject {
            var parent = target.bubbleParent;

            return parent ? parent : target.parent;
        }
    }
}
