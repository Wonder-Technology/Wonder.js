/// <reference path="../../definitions.d.ts"/>

//responsiblity:handle logic with specify event category
//judge is under point
//wrap event object
module Engine3D {
    export class MouseEventHandler extends EventHandler{
        private static _instance:MouseEventHandler = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public on(target:GameObject, eventName:EventName, handler:Function, priority:number) {
            dyCb.Log.error(!(target instanceof GameObject), dyCb.Log.info.FUNC_MUST_BE("target", "GameObject"));

            this._handler(target, eventName, handler, priority);
        }

        public off(target:GameObject, eventName:EventName):void;
        public off(uid:number, eventName:EventName):void;
        public off(target:GameObject, eventName:EventName, handler:Function):void;

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

        public trigger(target:GameObject, event:Event, notSetTarget:boolean){
            var eventName = event.name,
                eventType = event.type,
                listenerDataList:dyCb.Collection = null,
                self = this;

            if (!(target instanceof GameObject)) {
                dyCb.Log.log("target is not GameObject, can't trigger event");
                return;
            }

            if(!notSetTarget){
                event.target = target;
            }

            listenerDataList = EventRegister.getInstance().getEventRegisterDataList(target, eventName);

            if (listenerDataList === null || listenerDataList.getCount()=== 0) {
                return;
            }

            listenerDataList.forEach((listenerData:IEventRegisterData) => {
                //event.target = listenerData.target;
                listenerData.handler(event.copy());
            });
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
            return Director.getInstance().getView();
        }

        private _bind(view:IView, eventName:EventName, target:GameObject){
            var self = this,
                context = window,
                wrapHandler = null;

            wrapHandler = dyCb.EventUtils.bindEvent(context, function (event) {
                var eventObject:MouseEvent = self._createEventObject(event, eventName, target),
                    topTarget = Director.getInstance().getTopUnderPoint(eventObject.locationInView);

                EventManager.emit(topTarget, eventObject);
            });

            dyCb.EventUtils.addEvent(
                view.dom,
                eventName,
                wrapHandler
            )

            return wrapHandler;
        }

        private _unBind(view, eventName, handler){
            dyCb.EventUtils.removeEvent(view.dom, eventName, handler);
        }


        private _isTrigger(result){
            return result && result.getCount() > 0;
        }

        private _createEventObject(event:any, eventName:EventName, currentTarget:GameObject) {
            var obj = MouseEvent.create(event ? event : window.event, eventName);

            obj.currentTarget = currentTarget;

            return obj;
        }
    }
}
