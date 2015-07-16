/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    export class EventMouse extends Event{
        //public static CLICK:string = "click";
        //public static MOUSEOVER:string = "mouseover";
        //public static MOUSEOUT:string = "mouseout";
        //public static MOUSEMOVE:string = "mousemove";

        public static create(eventName:EventName) {
            var obj = new this(eventName);

            return obj;
        }

        /*!
        implement abstract attri
         */
        public type:EventType = EventType.MOUSE;


        private _location:Point = null;
        //Get cursor location(related to document)
        get location():Point {
            var point = null,
                e = this._event;

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
            var point = null,
                viewOffset = null;

            if (this._locationInView) {
                return this._locationInView;
            }

            point = this.location;

            dyCb.Log.error(!JudgeUtils.isView(this._event.currentTarget), dyCb.Log.info.FUNC_MUST_BE("canvas"));

            //canvasOffset = this._getCanvasOffset(this._event.currentTarget);
            viewOffset = this._event.currentTarget.offset;

            return Point.create(point.x - viewOffset.x, point.y - viewOffset.y);
        }

        set locationInView(locationInView:Point) {
            this._locationInView = locationInView;
        }

        private _button:number = null;
        get button() {
            var e = this._event,
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
                        dyCb.Log.error(true, dyCb.Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
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
                        dyCb.Log.error(true, dyCb.Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
                        //mouseButton = e.button;
                        break;
                }
            }

            return mouseButton;
        }
        set button(button:number) {
            this._button = button;
        }


        public copy():EventMouse {
            return dyCb.ExtendUtils.copyPublicAttri(this);
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
