/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    export class CustomEvent extends Event{
        public static create(eventType:string) {
            var obj = new this(<any>eventType);

            return obj;
        }

        /*!
        implement abstract attri
         */
        public type:EventCategory = EventCategory.CUSTOM;
    }
}
