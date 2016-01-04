/// <reference path="../../filePath.d.ts"/>
module wd {
    export class CustomEvent extends Event{
        public static create(eventName:string) {
            var obj = new this(<any>eventName);

            return obj;
        }

        public target:EntityObject;

        //currentTarget is always the object listening for the event
        public currentTarget:EntityObject = null;
        public userData:any = null;

        protected p_type:EventType = EventType.CUSTOM;


        public copyPublicAttri(destination, source:any){
            var property = null;

            wdCb.ExtendUtils.extend(destination, function(item, property){
                return property.slice(0, 1) !== "_"
                    && !JudgeUtils.isFunction(item);
            });

            return destination;
        }

        public copy(){
            var eventObj = CustomEvent.create(<any>this.name);

            return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
        }
    }
}
