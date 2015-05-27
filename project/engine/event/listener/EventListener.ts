module Engine3D {
    export interface IEventHandlerData{
        eventName:EventName;
        handler:Function;
    }

    export class EventListener {
        public static create(option) {
            var obj = new this(option);

            obj.initWhenCreate(option);

            return obj;
        }

        private _eventType:EventType = null;
        get eventType(){
            return this._eventType;
        }
        set eventType(eventType:EventType){
            this._eventType = eventType;
        }

        private _priority:number = null;
        get priority(){
            return this._priority;
        }
        set priority(priority:number){
            this._priority = priority;
        }

        private _handlerDataList:Collection = Collection.create();
        get handlerDataList(){
            return this._handlerDataList;
        }
        set handlerDataList(handlerDataList:Collection){
            this._handlerDataList = handlerDataList;
        }

        constructor(option:{any}){
            this._eventType = option.eventType;
            this._priority = option.priority || 1;
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
                        this._handlerDataList.addChild(<IEventHandlerData>{
                            eventName: this._parseEventName(i),
                            hander: option[i]
                        });
                    }
                }
            }
        }

        private _parseEventName(handlerName){
            return handlerName.slice(2).toLowerCase();
        }
    }
}
