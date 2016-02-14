module wd {
    export class CustomEvent extends Event{
        public static create(eventName:string) {
            var obj = new this(<any>eventName);

            return obj;
        }

        public userData:any = null;

        protected p_type:EEventType = EEventType.CUSTOM;


        public copyPublicAttri(destination, source:any){
            var property = null;

            wdCb.ExtendUtils.extend(destination, function(item, property){
                return property.slice(0, 1) !== "_"
                    && !JudgeUtils.isFunction(item);
            });

            return destination;
        }

        public copy():CustomEvent{
            var eventObj = CustomEvent.create(<any>this.name);

            return <CustomEvent>this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
        }

        //@require(function(event:MouseEvent){
        //    if(event.target){
        //        assert(event.target instanceof EntityObject, Log.info.FUNC_MUST_BE("target", "EntityObject"));
        //    }
        //})
        public getDataFromDomEvent(event:MouseEvent){
            this.target = <EntityObject>event.target;
            this.currentTarget = event.currentTarget;
            this.isStopPropagation = event.isStopPropagation;
        }
    }
}
