module wd{
    export class PointEventBinder{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _pointDownSubscription:wdFrp.IDisposable = null;
        private _pointTapSubscription:wdFrp.IDisposable = null;
        private _pointUpSubscription:wdFrp.IDisposable = null;
        private _pointMoveSubscription:wdFrp.IDisposable = null;
        private _pointScaleSubscription:wdFrp.IDisposable = null;

        @require(function(){
            it("should support touch or point event", () => {
                expect(this._isSupportTouch() || "onmousedown" in root).true;
            }, this);
        })
        public initPointEvent(){
            var self = this;

            if(this._isSupportTouch()){
                let touchdown = EventManager.fromEvent(EEventName.TOUCHDOWN),
                    touchup = EventManager.fromEvent(EEventName.TOUCHUP),
                    touchmove = EventManager.fromEvent(EEventName.TOUCHMOVE);

                this._pointDownSubscription = touchdown
                    .subscribe((e:TouchEvent) => {
                        EventManager.trigger(CustomEvent.create(<any>EEngineEvent.POINT_DOWN, self._convertTouchEventToPointEvent(e, EEngineEvent.POINT_DOWN)));
                    });

                this._pointMoveSubscription = touchmove
                    .subscribe((e:TouchEvent) => {
                        EventManager.trigger(CustomEvent.create(<any>EEngineEvent.POINT_MOVE, self._convertTouchEventToPointEvent(e, EEngineEvent.POINT_MOVE)));
                    });

                this._pointUpSubscription = touchup
                    .subscribe((e:TouchEvent) => {
                        EventManager.trigger(CustomEvent.create(<any>EEngineEvent.POINT_UP, self._convertTouchEventToPointEvent(e, EEngineEvent.POINT_UP)));
                    });

                this._pointTapSubscription = touchup.skipUntil(touchdown)
                    .subscribe((e:TouchEvent) => {
                        EventManager.trigger(CustomEvent.create(<any>EEngineEvent.POINT_TAP, self._convertTouchEventToPointEvent(e, EEngineEvent.POINT_TAP)));
                    });

                //todo bind touchcancel event
            }
            else{
                this._pointDownSubscription = EventManager.fromEvent(EEventName.MOUSEDOWN)
                    .subscribe((e:MouseEvent) => {
                        EventManager.trigger(CustomEvent.create(<any>EEngineEvent.POINT_DOWN, self._convertMouseEventToPointEvent(e, EEngineEvent.POINT_DOWN)));
                    });

                this._pointMoveSubscription = EventManager.fromEvent(EEventName.MOUSEMOVE)
                    .subscribe((e:MouseEvent) => {
                        EventManager.trigger(CustomEvent.create(<any>EEngineEvent.POINT_MOVE, self._convertMouseEventToPointEvent(e, EEngineEvent.POINT_MOVE)));
                    });

                this._pointUpSubscription = EventManager.fromEvent(EEventName.MOUSEUP)
                    .subscribe((e:MouseEvent) => {
                        EventManager.trigger(CustomEvent.create(<any>EEngineEvent.POINT_UP, self._convertMouseEventToPointEvent(e, EEngineEvent.POINT_UP)));
                    });

                this._pointScaleSubscription = EventManager.fromEvent(EEventName.MOUSEWHEEL)
                    .subscribe((e:MouseEvent) => {
                        EventManager.trigger(CustomEvent.create(<any>EEngineEvent.POINT_SCALE, self._convertMouseEventToPointEvent(e, EEngineEvent.POINT_SCALE)));
                    });

                this._pointTapSubscription = EventManager.fromEvent(EEventName.CLICK)
                    .subscribe((e:MouseEvent) => {
                        EventManager.trigger(CustomEvent.create(<any>EEngineEvent.POINT_TAP, self._convertMouseEventToPointEvent(e, EEngineEvent.POINT_TAP)));
                    });
            }
        }

        public dispose(){
            if(!!this._pointTapSubscription){
                this._pointTapSubscription.dispose();
            }

            if(!!this._pointDownSubscription){
                this._pointDownSubscription.dispose();
            }

            if(!!this._pointUpSubscription){
                this._pointUpSubscription.dispose();
            }

            if(!!this._pointMoveSubscription){
                this._pointMoveSubscription.dispose();
            }

            if(!!this._pointScaleSubscription){
                this._pointScaleSubscription.dispose();
            }
        }

        private _isSupportTouch(){
            return "ontouchstart" in root;
        }

        private _convertTouchEventToPointEvent(e:TouchEvent, eventName:any){
            var event = TouchPointEvent.create(eventName);

            event.getDataFromEventObj(e);

            return event;
        }

        private _convertMouseEventToPointEvent(e:MouseEvent, eventName:any){
            var event = MousePointEvent.create(eventName);

            event.getDataFromEventObj(e);

            return event;
        }
    }
}
