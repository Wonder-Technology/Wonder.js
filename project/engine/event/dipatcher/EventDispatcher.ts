/// <reference path="../object/Event"/>
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
                Log.log("target is not GameObject, can't trigger event");
                return;
            }

            var self = this;
            //var eventType = this._eventBinder.getEventType(eventName);
            //var eventType = EventTable.getEventType(eventName);
            var eventType = eventObject.type,
                eventName = eventObject.name;

            eventObject.stopPropagation();

            //todo move to eventbinder?
            //may bind multi listener on eventName(based on priority)
            var listenerDataList = EventRegister.getInstance().getListenerDataList(target, eventName);

            if (listenerDataList.length === 0) {
                return;
            }


            listenerDataList.forEach(function (listenerData) {
                //FactoryEventHandler.createEventHandler(eventType).trigger(target, listener.handlerDataList, eventName);
                FactoryEventHandler.createEventHandler(eventType).trigger(
                    target,
                    eventObject.copy(),
                    //FactoryEventHandler.createEvent(eventType, eventName, EventPhase.EMIT),
                    listenerData.handlelr
                );
            });
        }

        public broadcast(target:GameObject, eventObject:Event) {
            var parent = this._getParent(target);

            this.trigger(target, eventObject);

            while (parent) {
                this.trigger(target, eventObject);
                parent = this._getParent(parent.parent);
            }
        }

        public emit(target:GameObject, eventObject:Event) {

        }

        private _getParent(target) {
            var parent = EventRegister.getInstance().getBubbleParent(target);

            //try to get from register first
            return parent ? parent : target.parent;
        }
    }
}
