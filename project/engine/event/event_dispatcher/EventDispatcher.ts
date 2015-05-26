module Engine3D {
    export class EventDispatcher {
        //private _eventBinder: EventBinder = null;
        private _eventRegister:EventRegister = null;

        constructor(register:EventRegister) {
            //this._eventBinder = binder;
            this._eventRegister = register;
        }

        //dispatch in eventBinder->eventList


        //public setBubbleParent(target:GameObject, parent:any) {
        //    this._eventRegister.setBubbleParent(target, parent);
        //}

        public trigger(target:GameObject, eventObject:Event) {
            if (!target instanceof GameObject) {
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
            var listenerDataList = this._eventRegister.getListenerDataList(target, eventName);

            if (listenerDataList.length === 0) {
                return;
            }


            listenerDataList.forEach(function (listenerData) {
                //FactoryEventHandler.createEventHandler(eventType).trigger(target, listener.handlerDataList, eventName);
                FactoryEventHandler.createEventHandler(eventType, self._eventRegister).trigger(
                    target,
                    eventObject.copy(),
                    //FactoryEventHandler.createEvent(eventType, eventName, EventPhase.EMIT),
                    listenerData.handlelr
                );
            });
        }

        public broadcast(target:GameObject,eventObject:Event) {
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
            var parent = this._eventRegister.getBubbleParent(target);

            //try to get from register first
            return parent ? parent : target.parent;
        }
    }
}
