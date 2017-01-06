module wd {
    declare var document:any;

    export class MouseEvent extends DomEvent{
        public static create(event:IMouseEventData, eventName:EEventName) {
            var obj = new this(event, eventName);

            return obj;
        }

        public event:IMouseEventData;

        private _location:Point = null;
        get location():Point {
            var point:Point = null,
                e = this.event;

            if (this._location) {
                return this._location;
            }

            point = Point.create();

            if (bowser.msie) {
                point.x = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
                point.y = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;
            }
            else {
                point.x = e.pageX;
                point.y = e.pageY;
            }

            return point;
        }
        set location(point:Point) {
            this._location = point;
        }


        private _locationInView:Point = null;
        get locationInView():Point {
            var point:Point = null,
                viewOffset:any = null;

            if (this._locationInView) {
                return this._locationInView;
            }

            point = this.location;


            viewOffset = DeviceManager.getInstance().view.offset;

            return Point.create(point.x - viewOffset.x, point.y - viewOffset.y);
        }
        set locationInView(locationInView:Point) {
            this._locationInView = locationInView;
        }

        private _button:number = null;
        get button() {
            var e = this.event,
                mouseButton:number = null;

            if(bowser.mobile){
                return null;
            }

            if (this._button !== null) {
                return this._button;
            }

            if (bowser.msie) {
                switch (e.button) {
                    case 1:
                        mouseButton = EMouseButton.LEFT;
                        break;
                    case 4:
                        mouseButton = EMouseButton.RIGHT;
                        break;
                    case 2:
                        mouseButton = EMouseButton.CENTER;
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
                        break;
                }
            }
            else {
                switch (e.button) {
                    case 0:
                        mouseButton = EMouseButton.LEFT;
                        break;
                    case 1:
                        mouseButton = EMouseButton.RIGHT;
                        break;
                    case 2:
                        mouseButton = EMouseButton.CENTER;
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
                        break;
                }
            }

            return mouseButton;
        }
        set button(button:number) {
            this._button = button;
        }

        get wheel(){
            /*!
             FF uses 'detail' and returns a value in 'no. of lines' to scroll
             WebKit and Opera use 'wheelDelta', WebKit goes in multiples of 120 per wheel notch
             */
            var e = this.event;

            if(bowser.mobile){
                return null;
            }

            if (e.detail) {
                return -1 * e.detail;
            }

            if (e.wheelDelta) {
                return e.wheelDelta / 120;
            }

            return 0;
        }

        get movementDelta(){
            var e = this.event,
                dx = null,
                dy = null;

            if(this._isPointerLocked()){
                dx = e.movementX || e.webkitMovementX || e.mozMovementX || 0;
                dy = e.movementY || e.webkitMovementY || e.mozMovementY || 0;
            }
            else{
                let location = this.location,
                    lastX = this.lastX,
                    lastY = this.lastY;

                if(lastX === null && lastY === null){
                    dx = 0;
                    dy = 0;
                }
                else{
                    dx = location.x - lastX;
                    dy = location.y - lastY;
                }
            }

            return {
                x: dx,
                y: dy
            }
        }

        public readonly type:EEventType = EEventType.MOUSE;

        public lastX:number = null;
        public lastY:number = null;

        public clone():MouseEvent{
            var eventObj = MouseEvent.create(this.event, <EEventName>this.name);

            return <MouseEvent>this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase", "lastX", "lastY"]);
        }

        private _isPointerLocked() {
            return !!(document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement);
        }
    }
}

