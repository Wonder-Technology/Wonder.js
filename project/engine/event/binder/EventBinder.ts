/// <reference path="EventRegister"/>
/// <reference path="../listener/EventListener"/>
/// <reference path="../factory/FactoryEventHandler"/>
/// <reference path="../object/EventTable"/>
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
            var listener:EventListener = null;

            if (!(target instanceof GameObject)) {
                return;
            }

            Log.assert(target && arg, Log.info.INVALID_PARAM);

            listener = !(arg instanceof EventListener) ?  EventListener.create(arg): arg;
            //EventRegister.getInstance().register(target, listener);

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


            //var listenerList = EventRegister.getInstance().getListenerDataList(target, listener.eventType);

            var view = this._getView();

            var handler = FactoryEventHandler.createEventHandler(listener.eventType);

            var self = this;


            listener.handlerDataList.forEach(function (handlerData:IEventHandlerData) {
                //var wrapHandler = handler.wrapHandler(handlerData.handler);

                EventRegister.getInstance().register(
                    target,
                    handlerData.eventName,
                    //wrapHandler,
                    //handler,
                    handlerData.handler,
                    listener.priority
                );

                if (!EventRegister.getInstance().isBindEventOnView(handlerData.eventName)) {
                    //handler.on(view, handlerData.eventName, wrapHandler);
                    handler.on(view, handlerData.eventName, target);
                }
            });
        }

        public off(target:GameObject, eventName?:EventName) {
            var handler = FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName));

            EventRegister.getInstance().remove(target);

            handler.off.apply(
                handler,
                Array.prototype.slice.call(arguments, 0).unshift(this._getView())
            );
        }

        //public remove(target:GameObject) {
        //    EventRegister.getInstance().remove(target);
        //    this.off(target);
        //}

        public getListenerDataList(target:GameObject, eventName:EventName) {
            return EventRegister.getInstance().getListenerDataList(target, eventName);
        }

        private _getView() {
            return Director.getInstance().getView();
        }
    }
}
