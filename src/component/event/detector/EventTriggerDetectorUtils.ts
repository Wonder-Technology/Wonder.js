module wd {
    export class EventTriggerDetectorUtils {
        public static isInRect(locationInView:Point, leftUpCornerPosition:Vector2, width:number, height:number) {
            return locationInView.x >= leftUpCornerPosition.x && locationInView.x <= leftUpCornerPosition.x + width && locationInView.y >= leftUpCornerPosition.y && locationInView.y <= leftUpCornerPosition.y + height;
        }
    }
}
