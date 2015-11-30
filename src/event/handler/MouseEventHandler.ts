/// <reference path="../../filePath.d.ts"/>

//responsiblity:handle logic with specify event category
//judge is under point
//wrap event object
module wd {
    export class MouseEventHandler extends DomEventHandler{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public lastX:number = null;
        public lastY:number = null;

        @require(function(target:GameObject, eventName:EventName, handler:(event:MouseEvent) => void, priority:number){
            assert(target instanceof GameObject, Log.info.FUNC_MUST_BE("target", "GameObject"));
        })
        public on(target:GameObject, eventName:EventName, handler:(event:MouseEvent) => void, priority:number) {
            this.handler(target, eventName, handler, priority);
        }

        public trigger(target:GameObject, event:Event, notSetTarget:boolean):boolean{
            var eventName = event.name,
                eventType = event.type,
                registerDataList:wdCb.Collection<EventRegisterData> = null,
                isStopPropagation = false,
                self = this;

            if (!(target instanceof GameObject)) {
                Log.log("target is not GameObject, can't trigger event");
                return;
            }

            if(!notSetTarget){
                event.target = target;
            }

            registerDataList = EventRegister.getInstance().getEventRegisterDataList(target, eventName);

            if (registerDataList === null || registerDataList.getCount()=== 0) {
                return;
            }

            registerDataList.forEach((registerData:EventRegisterData) => {
                var eventCopy = event.copy();

                registerData.handler(eventCopy);
                if(eventCopy.isStopPropagation){
                    isStopPropagation = true;
                }
            });

            return isStopPropagation;
        }

        protected getDom() {
            return DeviceManager.getInstance().view.dom;
        }

        protected triggerDomEvent(event:Event, eventName:EventName, target:GameObject){
            var eventObj = this._createEventObject(event, eventName, target);

            //console.log("triggerDomEvent")

            EventManager.emit(this._getTopTarget(eventObj), eventObj);
        }

        protected addEngineHandler(target:GameObject, eventName:EventName, handler:(event:MouseEvent) => void){
            var resultHandler = null;

            switch (eventName){
                case EventName.MOUSEMOVE:
                    resultHandler = this._handleMove(handler);
                    break;
                default:
                    resultHandler = handler;
                    break;
            }

            return resultHandler;
        }

        protected clearHandler(){
            this.lastX = null;
            this.lastY = null;
        }

        private _getTopTarget(event:MouseEvent){
            return Director.getInstance().getTopUnderPoint(event.locationInView);
        }

        private _handleMove(handler:(event:MouseEvent) => void){
            var self = this;

            return (event:MouseEvent) => {
                handler(event);

                //console.log("_saveLocation");
                self._saveLocation(event);
            };
        }

        private _createEventObject(event:any, eventName:EventName, currentTarget:GameObject) {
            var obj = MouseEvent.create(event ? event : root.event, eventName);

            obj.currentTarget = currentTarget;

            return obj;
        }

        private _saveLocation(event:MouseEvent){
            var location = null;

            location = event.location;

            this.lastX = location.x;
            this.lastY = location.y;
        }
    }
}

