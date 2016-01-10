module wd{
    const _table = wdCb.Hash.create<string>();

    //todo not declare "<any>"!
    _table.addChild(<any>EventName.CLICK, "onMouseClick");

    export class EventTriggerTable{
        public static getScriptHandlerName(eventName:EventName){
            var result = _table.getChild(<any>eventName);

            return result;
        }
    }
}