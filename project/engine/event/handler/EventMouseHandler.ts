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

        public on(view:IView, eventName:EventName, target:GameObject) {
            var self = this,
                context = window;
            //var listenerList = EventRegister.getInstance().getListenerDataList(target, listener.eventCategory);

            //handlerDataList.forEach(function (handlerData) {
            dyCb.EventUtils.addEvent(
                view.dom,
                eventName,
                //dyCb.EventUtils.bindEvent(context, function (eventObject:EventMouse) {
                dyCb.EventUtils.bindEvent(context, function (event) {
                    var eventObject:EventMouse = self._createEventObject(event, eventName, target),
                    //should invoking eventRegister read newest register data when trigger event,
                    //so the class need retain eventRegister's reference
                    //    targetDataArr:dyCb.Collection = self._getTopTriggerDataArrUnderPoint(eventObject);
                        topTarget = Director.getInstance().getTopUnderPoint(eventObject.locationInView);

                    EventManager.emit(topTarget, eventObject);

                    //targetDataArr && targetDataArr.forEach((targetData:IEventRegisterData)=>{
                    //    EventManager.emit(target, eventObject);
                    //    //self.trigger(
                    //    //    target,
                    //    //    eventObject,
                    //    //    targetData.handler
                    //    //);
                    //});

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
            var eventRegister = EventRegister.getInstance();

            //if (arguments.length === 2) {
            //    //EventRegister.getInstance()
            //    //    .filter((data:IEventRegisterData, eventName:EventName) => {
            //    //        return JudgeUtils.isEqual(target, data.currentTarget);
            //    //            //&& EventTable.isEventOnView(eventName)
            //    //    })
            //    //    .forEach((data:IEventRegisterData, eventName:EventName) => {
            //    //        dyCb.EventUtils.removeEvent(view.dom, eventName, data.handler);
            //    //    });
            //    eventRegister.getChild(target)
            //}
            //else if (arguments.length === 3) {
            //    eventRegister.getChild(target, eventName)
            //        .forEach((data:IEventRegisterData) => {
            //            dyCb.EventUtils.removeEvent(view.dom, eventName, data.handler);
            //        });
            //}
            eventRegister.getChild.apply(eventRegister, Array.prototype.slice.call(arguments, 1))
                .forEach((data:IEventRegisterData) => {
                    dyCb.EventUtils.removeEvent(view.dom, eventName, data.handler);
                });
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

        //private _getTopTriggerDataArrUnderPoint(eventObject:EventMouse){
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

        private _createEventObject(event:any, eventName:EventName, currentTarget:GameObject) {
            var obj = EventMouse.create(event ? event : window.event, eventName);

            obj.currentTarget = currentTarget;

            return obj;
        }
    }
}
