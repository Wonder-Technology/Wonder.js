module wd {
    //todo support change event rect range(because if rotate, the the event rect range may be much different from the one of drawed in canvas)
    export class UIEventTriggerDetector extends EventTriggerDetector {
        public static create() {
            var obj = new this();

            return obj;
        }

        public isTrigger(e:MouseEvent):boolean {
            var transform:RectTransform = <RectTransform>this.entityObject.transform,
                width = transform.width,
                height = transform.height,
                position = transform.position,
                locationInView = e.locationInView,
                leftUpCornerPosition = null;

            leftUpCornerPosition = Vector2.create(position.x - width / 2, position.y - height / 2);

            return EventTriggerDetectorUtils.isInRect(locationInView, leftUpCornerPosition, width, height);
        }
    }
}

