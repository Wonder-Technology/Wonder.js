/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    //responsibilty:on, off event(manage list)

    export class EventBinder {
        public static create() {
            var obj = new this();

            return obj;
        }

        //private _listenerList:EventListener = EventListener.create();
        //private _eventRegister:EventRegister = null;

        constructor() {
            //EventRegister.getInstance() = eventRegister;
        }

        public on(target:GameObject, arg:{}|EventListener):void;
        public on(target:GameObject, eventType:EventType, handler:Function, priority):void;

        public on(args) {
            var target = null,
                view = null;

            target = arguments[0];

            dyCb.Log.error(!(target instanceof GameObject), dyCb.Log.info.FUNC_MUST_BE("target", "GameObject"));

            view = this._getView();

            if(arguments.length === 2){
                let arg = arguments[1],
                    listener:EventListener = null,
                    eventHandler:EventHandler = null,
                    self = this;

                listener = !(arg instanceof EventListener) ?  EventListener.create(arg): arg;

                eventHandler = FactoryEventHandler.createEventHandler(listener.eventCategory);

                listener.handlerDataList.forEach(function (handlerData:IEventHandlerData) {
                    self._handler(eventHandler, view, target, handlerData.eventType, listener.priority, handlerData.handler);
                });
            }
            else if(arguments.length === 4) {
                let eventType = arguments[1],
                    handler = arguments[2],
                    priority = arguments[3];

                this._handler(
                    FactoryEventHandler.createEventHandler(EventTable.getEventCategory(eventType)),
                    view, target, eventType, priority, handler
                );
            }
        }

        private _handler(eventHandler, view, target, eventType, priority, handler){
            if (!EventRegister.getInstance().isBinded(target, eventType)) {
                eventHandler.on(view, eventType, target);
            }

            EventRegister.getInstance().register(
                target,
                eventType,
                handler,
                priority
            );
        }

        public off(target:GameObject, eventType?:EventType) {
            var eventRegister = EventRegister.getInstance(),
                argArr = Array.prototype.slice.call(arguments, 0),
                argArrCopy = argArr.concat();

            argArr.unshift(this._getView());

            if(arguments.length === 1){
                let handlerList:dyCb.Collection = FactoryEventHandler.createEventHandler();

                handlerList.forEach((handler:EventHandler) => {
                    handler.off.apply(
                        handler,
                        argArr
                    );
                });
            }
            else if(arguments.length === 2){
                let handler = FactoryEventHandler.createEventHandler(EventTable.getEventCategory(eventType));

                handler.off.apply(
                    handler,
                    argArr
                );
            }

            eventRegister.remove.apply(eventRegister, argArrCopy);
        }

        //public remove(target:GameObject) {
        //    EventRegister.getInstance().remove(target);
        //    this.off(target);
        //}

        public getListenerDataList(target:GameObject, eventType:EventType) {
            return EventRegister.getInstance().getListenerDataList(target, eventType);
        }

        private _getView() {
            return Director.getInstance().getView();
        }
    }
}
