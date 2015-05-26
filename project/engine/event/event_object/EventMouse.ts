module Engine3D {
    export class EventMouse {
        ////todo set const when namescript support!
        //public static CLICK:string = "click";
        //public static MOUSEOVER:string = "mouseover";
        //public static MOUSEOUT:string = "mouseout";
        //public static MOUSEMOVE:string = "mousemove";

        public static create(eventName:EventName) {
            var obj = new this(eventName);

            return obj;
        }

        constructor(eventName:EventName) {
            this._name = eventName;
        }

        //todo can set

        private _location:Point = null;
        //Get cursor location(related to document)
        get location():Point {
            var point = null,
                e = this._event;

            if (this._location) {
                return this._location;
            }

            point = Point.create();

            if (BrowserDetector.msie) {
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
            var point = null,
                viewOffset = null;

            if (this._locationInView) {
                return this._locationInView;
            }

            point = this.location;

            Log.error(!JudgeUtils.isView(this._event.currentTarget), Log.info.FUNC_MUST_BE("canvas"));

            //canvasOffset = this._getCanvasOffset(this._event.currentTarget);
            viewOffset = this._event.currentTarget.offset;

            return Point.create(point.x - viewOffset.x, point.y - viewOffset.y);
        }

        set locationInView(locationInView:Point) {
            this._locationInView = locationInView;
        }

        private _button:MouseButton = null;
        get button() {
            var e = this._event,
                mouseButton = null;

            if (this._button) {
                return this._button;
            }

            if (BrowserDetector.msie) {
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

        set button(button:MouseButton) {
            this._button = button;
        }

        private _target:GameObject = null;
        get target() {
            Log.error(!this._target, Log.info.FUNC_MUST_DEFINE("target"));

            return this._target;
            //return this._target;
            //return this._event.srcElement || this._event.target;
        }

        set target(target:GameObject) {
            this._target = target;
        }

        private _currentTarget:IView = null;
        get currentTarget() {
            return this._currentTarget;
        }

        set currentTarget(currentTarget:IView) {
            this._currentTarget = currentTarget;
        }

        private _isStopPropagation:boolean = false;
        get isStopPropagation() {
            return this._isStopPropagation;
        }

        set isStopPropagation(isStopPropagation:boolean) {
            this._isStopPropagation = isStopPropagation;
        }

        private _phase:EventPhase = null;
        get phase() {
            return this._phase;
        }

        set phase(phase:EventPhase) {
            this._phase = phase;
        }

        private _event:any = null;
        get event() {
            return this._event;
        }

        set event(event:any) {
            this._event = event || window.event;
        }

        private _name:EventName = null;
        get name() {
            return this._name;
        }

        set name(name:EventName) {
            this._name = name;
        }


        public stopPropagation() {
            this._isStopPropagation = true;
        }

        public copy():EventMouse {
            return ExtendUtils.copyPublicAttri(this);
        }

        protected _type:EventType = EventType.MOUSE;

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
