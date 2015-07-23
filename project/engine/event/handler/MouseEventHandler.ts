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

        public on(target:GameObject, eventType:EventType, handler:Function, priority:number) {
            dyCb.Log.error(!(target instanceof GameObject), dyCb.Log.info.FUNC_MUST_BE("target", "GameObject"));

            this._handler(target, eventType, handler, priority);
        }

        public off(target:GameObject, eventType:EventType):void;
        public off(uid:number, eventType:EventType):void;
        public off(target:GameObject, eventType:EventType, handler:Function):void;

        public off(args) {
            var self = this,
                view = this._getView(),
                eventRegister = EventRegister.getInstance(),
                eventOffDataList:dyCb.Collection = null;

            eventOffDataList = eventRegister.remove.apply(eventRegister, Array.prototype.slice.call(arguments, 0));

            if(eventOffDataList){
                eventOffDataList.forEach((eventOffData:IEventOffData) => {
                    self._unBind(view, eventOffData.eventType, eventOffData.wrapHandler);
                })
            }
        }

        public trigger(target:GameObject, event:Event, notSetTarget:boolean){
            var eventType = event.name,
                eventCategory = event.type,
                listenerDataList:dyCb.Collection = null,
                self = this;

            if (!(target instanceof GameObject)) {
                dyCb.Log.log("target is not GameObject, can't trigger event");
                return;
            }

            if(!notSetTarget){
                event.target = target;
            }

            listenerDataList = EventRegister.getInstance().getListenerDataList(target, eventType);

            if (listenerDataList === null || listenerDataList.getCount()=== 0) {
                return;
            }

            listenerDataList.forEach((listenerData:IEventRegisterData) => {
                //event.target = listenerData.target;
                listenerData.handler(event.copy());
            });
        }

        private _handler(target, eventType, handler, priority){
            var wrapHandler = null;

            if (!EventRegister.getInstance().isBinded(target, eventType)) {
                wrapHandler = this._bind(this._getView(), eventType, target);
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

        private _getView() {
            return Director.getInstance().getView();
        }

        private _bind(view:IView, eventType:EventType, target:GameObject){
            var self = this,
                context = window,
                wrapHandler = null;

            wrapHandler = dyCb.EventUtils.bindEvent(context, function (event) {
                var eventObject:MouseEvent = self._createEventObject(event, eventType, target),
                    topTarget = Director.getInstance().getTopUnderPoint(eventObject.locationInView);

                EventManager.emit(topTarget, eventObject);
            });

            dyCb.EventUtils.addEvent(
                view.dom,
                eventType,
                wrapHandler
            )

            return wrapHandler;
        }

        private _unBind(view, eventType, handler){
            dyCb.EventUtils.removeEvent(view.dom, eventType, handler);
        }


        private _isTrigger(result){
            return result && result.getCount() > 0;
        }

        private _createEventObject(event:any, eventType:EventType, currentTarget:GameObject) {
            var obj = MouseEvent.create(event ? event : window.event, eventType);

            obj.currentTarget = currentTarget;

            return obj;
        }
    }
}
