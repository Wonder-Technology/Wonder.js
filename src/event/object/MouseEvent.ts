/// <reference path="../../filePath.d.ts"/>
module wd {
    declare var document:any;

    export class MouseEvent extends DomEvent{
        //public static CLICK:string = "click";
        //public static MOUSEOVER:string = "mouseover";
        //public static MOUSEOUT:string = "mouseout";
        //public static MOUSEMOVE:string = "mousemove";

        //public static create(eventName:EventName) {
        //    var obj = new this(eventName);
        //
        //    return obj;
        //}
        public static create(event:any, eventName:EventName) {
            var obj = new this(event, eventName);

            return obj;
        }

        protected p_type:EventType = EventType.MOUSE;

        private _location:Point = null;
        //Get cursor location(related to document)
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
        //Returns the current cursor location in screen coordinates(related to canvas)
        get locationInView():Point {
            //return this._locationInView;
            var point:Point = null,
                viewOffset:any = null;

            if (this._locationInView) {
                return this._locationInView;
            }

            point = this.location;


            //canvasOffset = this._getCanvasOffset(this.event.currentTarget);
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

            if (this._button) {
                return this._button;
            }

            if (bowser.msie) {
                switch (e.button) {
                    case 1:
                        mouseButton = MouseButton.LEFT;
                        break;
                    case 4:
                        mouseButton = MouseButton.RIGHT;
                        break;
                    case 2:
                        mouseButton = MouseButton.CENTER;
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
                        //mouseButton = e.button;
                        break;
                }
            }
            else {
                switch (e.button) {
                    case 0:
                        mouseButton = MouseButton.LEFT;
                        break;
                    case 1:
                        mouseButton = MouseButton.RIGHT;
                        break;
                    case 2:
                        mouseButton = MouseButton.CENTER;
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
                        //mouseButton = e.button;
                        break;
                }
            }

            return mouseButton;
        }
        set button(button:number) {
            this._button = button;
        }

        get wheel(){
            // FF uses 'detail' and returns a value in 'no. of lines' to scroll
            // WebKit and Opera use 'wheelDelta', WebKit goes in multiples of 120 per wheel notch
            var e = this.event;

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
                wd = null;

            if(this._isPointerLocked()){
                dx = e.movementX || e.webkitMovementX || e.mozMovementX || 0;
                wd = e.movementY || e.webkitMovementY || e.mozMovementY || 0;
            }
            else{
                let location = this.location,
                    handler = MouseEventHandler.getInstance(),
                    lastX = handler.lastX,
                    lastY = handler.lastY;

                if(lastX === null && lastY === null){
                    dx = 0;
                    wd = 0;
                }
                else{
                    dx = location.x - lastX;
                    wd = location.y - lastY;
                }
            }

            return {
                x: dx,
                y: wd
            }
        }

        public copy(){
            var eventObj = MouseEvent.create(this.event, this.name);

            return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase", "lastX", "lastY"]);
        }

        private _isPointerLocked() {
            return !!(document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement);
        }

        //private _getCanvasOffset(view:IView) {
        //    return view.getOffset();
        //    var offset = {x: canvas.offsetLeft, y: canvas.offsetTop};
        //
        //    while (canvas = canvas.offsetParent) {
        //        offset.x += canvas.offsetLeft;
        //        offset.y += canvas.offsetTop;
        //    }
        //
        //    return offset;
        //}
    }
}
