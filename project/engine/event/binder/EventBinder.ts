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

        public on(eventType:EventType, handler:Function, priority:number):void;
        public on(target:GameObject, arg:{}|EventListener):void;
        public on(target:GameObject, eventType:EventType, handler:Function, priority:number):void;

        public on(args) {
            if(arguments.length === 2){
                let target = arguments[0],
                    arg = arguments[1],
                    listener:EventListener = null,
                    eventHandler:EventHandler = null,
                    self = this;

                dyCb.Log.error(!(target instanceof GameObject), dyCb.Log.info.FUNC_MUST_BE("target", "GameObject"));

                listener = !(arg instanceof EventListener) ?  EventListener.create(arg): arg;

                eventHandler = FactoryEventHandler.createEventHandler(listener.eventCategory);

                listener.handlerDataList.forEach(function (handlerData:IEventHandlerData) {
                    self._handler(eventHandler, target, handlerData.eventType, listener.priority, handlerData.handler);
                });
            }
            else if(arguments.length === 3){
                let eventType = arguments[0],
                    handler = arguments[1],
                    priority = arguments[2];

                EventRegister.getInstance().register(
                    null,
                    eventType,
                    handler,
                    null,
                    priority
                );
            }
            else if(arguments.length === 4) {
                let target = arguments[0],
                    eventType = arguments[1],
                    handler = arguments[2],
                    priority = arguments[3];

                dyCb.Log.error(!(target instanceof GameObject), dyCb.Log.info.FUNC_MUST_BE("target", "GameObject"));

                this._handler(
                    FactoryEventHandler.createEventHandler(EventTable.getEventCategory(eventType)),
                    target, eventType, priority, handler
                );
            }
        }

        public off(eventType:EventType):void;
        public off(eventType:EventType, handler:Function):void;
        public off(target:GameObject):void;
        public off(target:GameObject, eventType:EventType):void;
        public off(target:GameObject, eventType:EventType, handler:Function):void;

        public off(args) {
            var eventRegister = EventRegister.getInstance(),
                eventOffDataList:dyCb.Collection = null,
                argArr = Array.prototype.slice.call(arguments, 0);

            eventOffDataList = eventRegister.remove.apply(eventRegister, argArr);

            if(eventOffDataList){
                this._unBind(eventOffDataList);
            }
        }

        public getListenerDataList(target:GameObject, eventType:EventType) {
            return EventRegister.getInstance().getListenerDataList(target, eventType);
        }

        private _getView() {
            return Director.getInstance().getView();
        }

        private _handler(eventHandler, target, eventType, priority, handler){
            var wrapHandler = null;

            if (!EventRegister.getInstance().isBinded(target, eventType)) {
                wrapHandler = eventHandler.on(this._getView(), eventType, target, handler);
            }
            else{
                wrapHandler = EventRegister.getInstance().getWrapHandler(target, eventType);
            }

            EventRegister.getInstance().register(
                target,
                eventType,
                handler,
                wrapHandler,
                priority
            );
        }

        private _unBind(eventOffDataList){
            var view = this._getView();

            eventOffDataList.forEach((eventOffData:IEventOffData) => {
                FactoryEventHandler.createEventHandler(EventTable.getEventCategory(eventOffData.eventType))
                    .off(view, eventOffData.eventType, eventOffData.wrapHandler);
            })
        }
    }
}
