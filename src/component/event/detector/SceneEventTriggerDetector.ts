module wd {
    export class SceneEventTriggerDetector extends EventTriggerDetector {
        public static create() {
            var obj = new this();

            return obj;
        }

        constructor(){
            super();

            this.triggerMode = EventTriggerMode.SELECTED;
        }

        public isTrigger(e:MouseEvent):boolean {
            var view:IView = DeviceManager.getInstance().view,
                width = view.width,
                height = view.height,
                locationInView = e.locationInView,
                leftUpCornerPosition = Vector2.create(0, 0);

            return EventTriggerDetectorUtils.isInRect(locationInView, leftUpCornerPosition, width, height);
        }
    }
}

