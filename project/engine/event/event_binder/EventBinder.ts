module Engine3D {
    //responsibilty:on, off event(manage list)

    export class EventBinder {
        //private _listenerList:EventListener = EventListener.create();
        private _eventRegister:EventRegister = null;

        constructor(eventRegister:EventRegister) {
            this._eventRegister = eventRegister;
        }

        //todo target type should be GameObject(target:GameObject)
        public on(target:GameObject, listener:{}|EventListener) {
            if (!target instanceof GameObject) {
                return;
            }

            Log.assert(target && listener, Log.info.invalid_param);
            if (!listener instanceof EventListener) {
                listener = EventListener.create(listener);
            }
            //this._eventRegister.register(target, listener);

            //Log.assert(target && listener, Log.info.invalid_param);
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


            //var listenerList = this._eventRegister.getListenerList(target, listener.eventType);

            var view = this._getView();

            var handler = FactoryEventHandler.create(listener.eventType, this._eventRegister);

            var self = this;


            listener.handlerDataList.forEach(function (handlerData:IEventHandlerData) {
                //var wrapHandler = handler.wrapHandler(handlerData.handler);

                self._eventRegister.register(
                    target,
                    handlerData.eventName,
                    //wrapHandler,
                    //handler,
                    handlerData.handler,
                    listener.priority
                );

                if (!self._eventRegister.isBindEventOnView(handlerData.eventName)) {
                    //handler.on(view, handlerData.eventName, wrapHandler);
                    handler.on(view, handlerData.eventName, target);
                }
            });

            //FactoryEventHandler.create(this._eventRegister, listener).on(view, target, listener);
            //FactoryEventHandler.create(listener).on(view, target, listener);
            //FactoryEventHandler.create(listener.eventType).on(view, target, listener.handlerDataList);
        }

        public off(target:GameObject, eventName?:EventName) {
            var handler = FactoryEventHandler.create(EventTable.getEventType(eventName), this._eventRegister);

            this._eventRegister.remove(target);

            handler.off.apply(
                handler,
                Array.prototype.slice.call(arguments, 0).unshift(this._getView())
            );
        }

        //public remove(target:GameObject) {
        //    this._eventRegister.remove(target);
        //    this.off(target);
        //}

        public getListenerList(target:GameObject, eventName:EventName) {
            return this._eventRegister.getListenerList(target, eventName);
        }

        private _getView() {
            return Director.getInstance().getView();
        }
    }
}
