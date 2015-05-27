//responsiblity:handle logic with specify event category
//judge is under point
//wrap event object
module Engine3D {
    export class EventMouseHandler{
        private static _instance:EventMouseHandler = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                //this._instance.initWhenCreate();
            }
            return this._instance;
        }

        constructor() {
            //constructor() {
            //EventRegister.getInstance() = register;
        }

        //private _eventRegister:EventRegister = null;

        public on(view:HTMLCanvasElement, eventName:EventName, target:GameObject) {
            var self = this,
                context = window;
            //var listenerList = EventRegister.getInstance().getListenerDataList(target, listener.eventType);

            //handlerDataList.forEach(function (handlerData) {
            EventUtils.addEvent(
                view,
                eventName,
                //EventUtils.bindEvent(context, function (eventObject:EventMouse) {
                EventUtils.bindEvent(context, function (event) {
                    var eventObject = self._createEventObject(event, target),
                    //should invoking eventRegister read newest register data when trigger event,
                    //so the class need retain eventRegister's reference
                        targetDataArr = self._getTopTriggerDataArrUnderPoint(eventObject);

                    targetDataArr.forEach(function (targetData) {
                        self.trigger(
                            target,
                            eventObject,
                            targetData.handler
                        );
                    });

                    //EventManager.trigger(
                    //    self._getTopGameObjectUnderPoint()
                    //);
                })
                //, self._createEventObject)
                //});
            )
        }

        //public wrapHandler(target:GameObject, handler:Function) {
        //    return this._wrapHandler(target, handlerData.handler)
        //}

        public off(view: IView, target:GameObject, eventName?:EventName) {
            if (arguments.length === 2) {
                EventRegister.getInstance()
                    .filter(function (data:IEventRegisterData, eventName:EventName) {
                        return JudgeUtils.isEqual(target, data.target)
                            && EventTable.isEventOnView(eventName)
                    })
                    .forEach(function (data:IEventRegisterData, eventName:EventName) {
                        EventUtils.removeEvent(view, eventName, data.handler);
                    });
            }
            //todo off specify event
            //else if (arguments.length === 3) {
            //
            //}
        }

        public trigger(target:GameObject, eventObject:EventMouse, hander:Function) {
            eventObject.target = target;

            hander(eventObject);

            if (eventObject.isStopPropagation) {
                return;
            }

            if (eventObject.phase === EventPhase.BROADCAST) {
                EventManager.broadcast(target, eventObject);
            }
            else if (eventObject.phase === EventPhase.EMIT) {
                EventManager.emit(target, eventObject);
            }
            //emit default
            else {
                EventManager.emit(target, eventObject);
            }
        }

        //
        //public broadcast(){
        //
        //}
        //public emit(){
        //
        //}

        //private _wrapHandler(handler) {
        //    return function (eventObject) {
        //        //if (this._getTopGameObjectUnderPoint(eventObject)) {
        //        handler(eventObject);
        //
        //
        //        //judge dispatch
        //
        //        //is swallow
        //
        //        //else dispatch to others
        //        //if(isSwallow){
        //        //}
        //    }
        //}

        private _getTopTriggerDataArrUnderPoint(eventObject:EventMouse):[{}] {
            var result = null,
                self = this,
                locationInView = eventObject.locationInView,
                name = eventObject.name;

            //while ()
            //    Director.getTopChildUnderPoint();

            function getUnderPoint(target) {
                result = self._eventRegister.getListenerDataList(target, name);

                if (result.length > 0) {
                    return result;
                }

                target = target.getTopChildUnderPoint()
            }

            return getUnderPoint(Director.getTopChildUnderPoint());
        }

        private _createEventObject(event:any, target:GameObject) {
            var obj = EventMouse.create(event ? event : window.event);

            obj.currentTarget = target;

            return obj;
        }
    }
}
