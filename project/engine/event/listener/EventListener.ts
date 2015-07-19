/// <reference path="../../definitions.d.ts"/>
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

        private _eventCategory:EventCategory = null;
        get eventCategory(){
            return this._eventCategory;
        }
        set eventCategory(eventCategory:EventCategory){
            this._eventCategory = eventCategory;
        }

        private _priority:number = null;
        get priority(){
            return this._priority;
        }
        set priority(priority:number){
            this._priority = priority;
        }

        private _handlerDataList:dyCb.Collection = dyCb.Collection.create();
        get handlerDataList(){
            return this._handlerDataList;
        }
        set handlerDataList(handlerDataList:dyCb.Collection){
            this._handlerDataList = handlerDataList;
        }

        constructor(option:any){
            this._eventCategory = option.eventCategory;
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
                        this._handlerDataList.addChild({
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
}
