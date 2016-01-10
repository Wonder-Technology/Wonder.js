module wd {
    export class UIEventTriggerDetector extends EventTriggerDetector {
        public static create() {
            var obj = new this();

            return obj;
        }

        public isTrigger(e:MouseEvent):boolean {
            var transform:RectTransform = this.entityObject.transform,
                width = transform.width,
                height = transform.height,
                position = transform.position,
                locationInView = e.locationInView,
                leftCornerPosition = null;

            leftCornerPosition = Vector2.create(position.x - width / 2, position.y - height / 2);

            return locationInView.x >= leftCornerPosition.x && locationInView.x <= leftCornerPosition.x + width && locationInView.y >= leftCornerPosition.y && locationInView.y <= leftCornerPosition.y + height;
        }
    }
}

