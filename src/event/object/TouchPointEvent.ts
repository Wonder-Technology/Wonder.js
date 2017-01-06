module wd {
    export class TouchPointEvent extends PointEvent{
        public static create(eventName:EEventName) {
            var obj = new this(null, eventName);

            return obj;
        }

        public eventObj:TouchEvent;

        get location():Point {
            return this.eventObj.location;
        }
        set location(point:Point) {
            this.eventObj.location = point;
        }

        get locationInView():Point {
            return this.eventObj.locationInView;
        }
        set locationInView(locationInView:Point) {
            this.eventObj.locationInView = locationInView;
        }

        get wheel(){
            return null;
        }

        get movementDelta(){
            return this.eventObj.movementDelta;
        }

        public button:number = null;

        public getDataFromEventObj(e:TouchEvent){
            var touchData:ITouchData = e.touchData;

            this.eventObj = e;

            this.event = <IPointEventData>{
                clientX:touchData.clientX,
                clientY:touchData.clientY,
                pageX:touchData.pageX,
                pageY:touchData.pageY,

                target:touchData.target,
                currentTarget:e.currentTarget
            }
        }

        public clone(){
            return this.cloneHelper(TouchPointEvent.create(<EEventName>this.name));
        }
    }
}

