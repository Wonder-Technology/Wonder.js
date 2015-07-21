/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    export class CustomEvent extends Event{
        public static create(eventType:EventType) {
            var obj = new this(eventType);

            return obj;
        }

        /*!
        implement abstract attri
         */
        public type:EventCategory = EventCategory.CUSTOM;
    }
}
