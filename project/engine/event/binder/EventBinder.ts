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

        public on(target:GameObject, arg:EventListener|{}) {
            var listener:EventListener = null,
                view = null,
                handler:EventHandler = null,
                self = this;

            if (!(target instanceof GameObject)) {
                return;
            }

            dyCb.Log.assert(target && arg, dyCb.Log.info.INVALID_PARAM);

            listener = !(arg instanceof EventListener) ?  EventListener.create(arg): arg;
            //EventRegister.getInstance().register(target, listener);

            //dyCb.Log.assert(target && listener, dyCb.Log.info.invalid_param);
            //if(!listener instanceof EventListener){
            //    listener = EventListener.create(listener);
            //}
            //
            //////priority set in listener, not in this(binder)!
            ////if(priority){
            ////    listener.setPriority(priority);
            ////}
            //
            //this._listenerList.addChild(target, listener);

            //register
            //
            //remove

            //bind event to view dom


            //var listenerList = EventRegister.getInstance().getListenerDataList(target, listener.eventCategory);

            view = this._getView();

            handler = FactoryEventHandler.createEventHandler(listener.eventCategory);

            listener.handlerDataList.forEach(function (handlerData:IEventHandlerData) {
                //var wrapHandler = handler.wrapHandler(handlerData.handler);

                //if (!EventRegister.getInstance().isBindEventOnView(handlerData.eventType)) {
                if (!EventRegister.getInstance().isBinded(target, handlerData.eventType)) {
                    //handler.on(view, handlerData.eventType, wrapHandler);
                    handler.on(view, handlerData.eventType, target);
                }

                EventRegister.getInstance().register(
                    target,
                    handlerData.eventType,
                    //wrapHandler,
                    //handler,
                    handlerData.handler,
                    listener.priority
                );
            });
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
                let handler = FactoryEventHandler.createEventHandler(EventTable.getEventType(eventType));

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
