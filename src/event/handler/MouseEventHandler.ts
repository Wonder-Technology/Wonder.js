/// <reference path="../../definitions.d.ts"/>

//responsiblity:handle logic with specify event category
//judge is under point
//wrap event object
module dy {
    export class MouseEventHandler extends DomEventHandler{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public on(target:GameObject, eventName:EventName, handler:Function, priority:number) {
            dyCb.Log.error(!(target instanceof GameObject), dyCb.Log.info.FUNC_MUST_BE("target", "GameObject"));

            this.handler(target, eventName, handler, priority);
        }

        public trigger(target:GameObject, event:Event, notSetTarget:boolean):boolean{
            var eventName = event.name,
                eventType = event.type,
                registerDataList:dyCb.Collection<IEventRegisterData> = null,
                isStopPropagation = false,
                self = this;

            if (!(target instanceof GameObject)) {
                dyCb.Log.log("target is not GameObject, can't trigger event");
                return;
            }

            if(!notSetTarget){
                event.target = target;
            }

            registerDataList = EventRegister.getInstance().getEventRegisterDataList(target, eventName);

            if (registerDataList === null || registerDataList.getCount()=== 0) {
                return;
            }

            registerDataList.forEach((registerData:IEventRegisterData) => {
                var eventCopy = event.copy();

                registerData.handler(eventCopy);
                if(eventCopy.isStopPropagation){
                    isStopPropagation = true;
                }
            });

            return isStopPropagation;
        }

        protected getDom() {
            return Director.getInstance().getView().dom;
        }

        protected buildWrapHandler(target:GameObject, eventName:EventName){
            var self = this,
                context = window;

            return dyCb.EventUtils.bindEvent(context, function (event) {
                var eventObject:MouseEvent = self._createEventObject(event, eventName, target),
                    topTarget = Director.getInstance().getTopUnderPoint(eventObject.locationInView);

                EventManager.emit(topTarget, eventObject);
            });
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
