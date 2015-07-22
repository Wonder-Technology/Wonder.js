/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    export class MouseEvent extends Event{
        //public static CLICK:string = "click";
        //public static MOUSEOVER:string = "mouseover";
        //public static MOUSEOUT:string = "mouseout";
        //public static MOUSEMOVE:string = "mousemove";

        //public static create(eventType:EventType) {
        //    var obj = new this(eventType);
        //
        //    return obj;
        //}
        public static create(event:any, eventType:EventType) {
            var obj = new this(event, eventType);

            return obj;
        }

        constructor(event:any, eventType:EventType) {
            super(eventType);

            this._event = event;
        }

        public type:EventCategory = EventCategory.MOUSE;


        private _event:any = null;
        get event() {
            return this._event;
        }
        set event(event:any) {
            this._event = event || window.event;
        }

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
            viewOffset = Director.getInstance().getView().offset;

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

        public copy(){
            var eventObj = MouseEvent.create(this._event, this.name);

            return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
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
