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

        public trigger(event:Event):void;
        public trigger(target:GameObject, event:Event):void;

        public trigger(args) {
            if(arguments.length === 1){
                let event = arguments[0],
                    eventType= event.name,
                    listenerDataList = EventRegister.getInstance().getListenerDataList(eventType);

                if (listenerDataList === null || listenerDataList.getCount()=== 0) {
                    return;
                }

                listenerDataList.forEach((listenerDataList:IEventRegisterData) => {
                    listenerDataList.handler(event);
                });
            }
            else if(arguments.length === 2){
                let target = arguments[0],
                    event = arguments[1],
                    eventType= event.name,
                    eventCategory = event.type,
                    listenerDataList:dyCb.Collection = null,
                    self = this;

                if (!(target instanceof GameObject)) {
                    dyCb.Log.log("target is not GameObject, can't trigger event");
                    return;
                }

                listenerDataList = EventRegister.getInstance().getListenerDataList(target, eventType);

                if (listenerDataList === null || listenerDataList.getCount()=== 0) {
                    return;
                }

                listenerDataList.forEach((listenerData:IEventRegisterData) => {
                    FactoryEventHandler.createEventHandler(eventCategory).trigger(
                        listenerData.currentTarget,
                        //todo need copy?
                        //eventObject.copy(),
                        event,
                        listenerData.handler
                    );
                });
            }
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
