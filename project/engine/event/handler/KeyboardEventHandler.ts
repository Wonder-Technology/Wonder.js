/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    declare var document:any;

    //todo bind on GameObject which has the focus
    export class KeyboardEventHandler extends EventHandler{
        private static _instance:KeyboardEventHandler = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public on(eventName:EventName, handler:Function, priority:number) {
            this._handler(null, eventName, handler, priority);
        }

        public off(eventName:EventName):void;
        public off(eventName:EventName, handler:Function):void;

        public off(args) {
            var self = this,
                view = this._getView(),
                eventRegister = EventRegister.getInstance(),
                eventOffDataList:dyCb.Collection = null;

            eventOffDataList = eventRegister.remove.apply(eventRegister, Array.prototype.slice.call(arguments, 0));

            if(eventOffDataList){
                eventOffDataList.forEach((eventOffData:IEventOffData) => {
                    self._unBind(view, eventOffData.eventName, eventOffData.wrapHandler);
                })
            }
        }

        public trigger(event:Event):boolean{
            var eventName = event.name,
                eventType = event.type,
                listenerDataList:dyCb.Collection = null,
                //isStopPropagation = false,
                self = this;

            //if (!(target instanceof GameObject)) {
            //    dyCb.Log.log("target is not GameObject, can't trigger event");
            //    return;
            //}

            //if(!notSetTarget){
            //    event.target = target;
            //}

            listenerDataList = EventRegister.getInstance().getEventRegisterDataList(eventName);

            if (listenerDataList === null || listenerDataList.getCount()=== 0) {
                return;
            }

            listenerDataList.forEach((listenerData:IEventRegisterData) => {
                var eventCopy = event.copy();

                listenerData.handler(eventCopy);
                //if(eventCopy.isStopPropagation){
                //    isStopPropagation = true;
                //}
            });

            //return isStopPropagation;
            return true;
        }

        private _handler(target, eventName, handler, priority){
            var wrapHandler = null;

            if (!EventRegister.getInstance().isBinded(target, eventName)) {
                wrapHandler = this._bind(this._getView(), eventName, target);
            }
            else{
                wrapHandler = EventRegister.getInstance().getWrapHandler(target, eventName);
            }

            EventRegister.getInstance().register(
                target,
                eventName,
                handler,
                wrapHandler,
                priority
            );
        }

        private _getView() {
            //return Director.getInstance().getView();
            return document;
        }

        //private _bind(view:IView, eventName:EventName, target:GameObject){
        private _bind(view:any, eventName:EventName, target:GameObject){
            var self = this,
                context = window,
                wrapHandler = null;

            wrapHandler = dyCb.EventUtils.bindEvent(context, function (event) {
                //var eventObject:KeyboardEvent = self._createEventObject(event, eventName, target);
                var eventObject:KeyboardEvent = self._createEventObject(event, eventName);
                    //topTarget = Director.getInstance().getTopUnderPoint(eventObject.locationInView);

                //EventManager.emit(topTarget, eventObject);
                EventManager.trigger(eventObject);
            });

            dyCb.EventUtils.addEvent(
                //view.dom,
                view,
                eventName,
                wrapHandler
            )

            return wrapHandler;
        }

        private _unBind(view, eventName, handler){
            //dyCb.EventUtils.removeEvent(view.dom, eventName, handler);
            dyCb.EventUtils.removeEvent(view, eventName, handler);
        }


        private _isTrigger(result){
            return result && result.getCount() > 0;
        }

        private _createEventObject(event:any, eventName:EventName) {
            var obj = KeyboardEvent.create(event ? event : window.event, eventName);

            //obj.currentTarget = currentTarget;

            return obj;
        }
    }
}
