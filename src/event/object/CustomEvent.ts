/// <reference path="../../definitions.d.ts"/>
module dy {
    export class CustomEvent extends Event{
        public static create(eventName:string) {
            var obj = new this(<any>eventName);

            return obj;
        }

        public type:EventType = EventType.CUSTOM;
        
        private _userData:any = null;
        get userData(){
            return this._userData;
        }
        set userData(userData:any){
            this._userData = userData;
        }

        public copyPublicAttri(destination, source:any){
            var property = null;
                //destination = {};

            dyCb.ExtendUtils.extend(destination, function(item, property){
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
