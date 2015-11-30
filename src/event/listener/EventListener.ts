/// <reference path="../../filePath.d.ts"/>
module dy {
    export class EventListener {
        public static create(option) {
            var obj = new this(option);

            obj.initWhenCreate(option);

            return obj;
        }

        public eventType:EventType = null;
        public priority:number = null;
        public handlerDataList:wdCb.Collection<EventHandlerData> = wdCb.Collection.create<EventHandlerData>();

        constructor(option:any){
            this.eventType = option.eventType;
            this.priority = option.priority || 1;
        }

        public initWhenCreate(option:{any}){
            this._setHandlerDataList(option);
        }

        private _setHandlerDataList(option:{any}){
            var i = null,
                REGEX_HANDER = /on\w+/;

            for(i in option){
                if(option.hasOwnProperty(i)){
                    if(REGEX_HANDER.test(i)){
                        this.handlerDataList.addChild({
                            eventName: this._parseEventName(i),
                            handler: option[i]
                        });
                    }
                }
            }
        }

        private _parseEventName(handlerName){
            return handlerName.slice(2).toLowerCase();
        }
    }

    export type EventHandlerData = {
        eventName:EventName;
        handler:Function;
    }
}
