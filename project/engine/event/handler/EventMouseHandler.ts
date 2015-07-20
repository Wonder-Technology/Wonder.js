/// <reference path="../../definitions.d.ts"/>

//responsiblity:handle logic with specify event category
//judge is under point
//wrap event object
module Engine3D {
    export class EventMouseHandler extends EventHandler{
        private static _instance:EventMouseHandler = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                //this._instance.initWhenCreate();
            }
            return this._instance;
        }

        //constructor() {
        //    //constructor() {
        //    //EventRegister.getInstance() = register;
        //}

        //private _eventRegister:EventRegister = null;

        public on(view:IView, eventType:EventType, target:GameObject) {
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

        //public wrapHandler(target:GameObject, handler:Function) {
        //    return this._wrapHandler(target, handlerData.handler)
        //}

        //public off(view: IView, target:GameObject):void;
        //public off(view: IView, target:GameObject, eventType:EventType):void;
        //public off(view: IView, target:GameObject, eventType:EventType, handler:Function):void;

        //public off(args) {
        public off(view:IView, eventType:EventType, handler:Function) {
            //var eventRegister = EventRegister.getInstance(),
            //    view = arguments[0],
            //    target = arguments[1];

            dyCb.EventUtils.removeEvent(view.dom, eventType, handler);
            //
            //if (arguments.length === 2) {
            //    eventRegister.getChild(target)
            //        .forEach((list:dyCb.Collection, key:string) => {
            //            if(list.getCount() === 0){
            //                dyCb.Log.assert(false, dyCb.Log.info.FUNC_MUST_NOT_BE("value", "empty"));
            //                return;
            //            }
            //
            //            //dyCb.EventUtils.removeEvent(view.dom, eventRegister.getEventTypeFromKey(key), data.handler);
            //            dyCb.EventUtils.removeEvent(view.dom, eventRegister.getEventTypeFromKey(key), list.getChild(0).wrapHandler);
            //        });
            //}
            //else if (arguments.length === 3) {
            //    let eventType = arguments[2];
            //
            //    eventRegister.getChild(target, eventType)
            //        .forEach((data:IEventRegisterData, key:string) => {
            //            dyCb.EventUtils.removeEvent(view.dom, eventType, data.handler);
            //        });
            //}
            //else if (arguments.length === 4) {
            //    let eventType = arguments[2],
            //        handler = arguments[3];
            //
            //    dyCb.EventUtils.removeEvent(view.dom, eventType, handler);
            //    //eventRegister.getChild(target, eventType)
            //    //    .filter((data:IEventRegisterData) => {
            //    //        return data.handler === handler;
            //    //    })
            //    //    .forEach((data:IEventRegisterData) => {
            //    //        dyCb.EventUtils.removeEvent(view.dom, eventType, handler);
            //    //    });
            //}
        }

        public trigger(target:GameObject, eventObject:Event, handler:Function) {
            eventObject.target = target;

            handler(eventObject);

            //if (eventObject.isStopPropagation) {
            //    return;
            //}
            //
            //if (eventObject.phase === EventPhase.BROADCAST) {
            //    EventManager.broadcast(target, eventObject);
            //}
            //else if (eventObject.phase === EventPhase.EMIT) {
            //    EventManager.emit(target, eventObject);
            //}
            ////emit default
            //else {
            //    EventManager.emit(target, eventObject);
            //}
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

        //private _getTopTriggerDataArrUnderPoint(eventObject:MouseEvent){
        //    var self = this,
        //        locationInView:Point = eventObject.locationInView,
        //        name = eventObject.name;
        //
        //    function getUnderPoint(target) {
        //        var result:dyCb.Collection = null,
        //            top = null;
        //
        //        if(target === null){
        //            return null;
        //        }
        //
        //        result= EventRegister.getInstance().getListenerDataList(target, name);
        //
        //        if(self._isTrigger(result)){
        //            return result;
        //        }
        //
        //        top = target.getTopUnderPoint(locationInView);
        //
        //        if(JudgeUtils.isEqual(top, target)){
        //            return null;
        //        }
        //
        //        return arguments.callee(top);
        //    }
        //
        //    return getUnderPoint(Director.getInstance().getTopUnderPoint(locationInView));
        //}

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
