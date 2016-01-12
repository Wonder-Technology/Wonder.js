module wd{
    const _table = wdCb.Hash.create<string>();

    //todo not declare "<any>"!
    _table.addChild(<any>EventName.CLICK, "onMouseClick");
    _table.addChild(<any>EventName.MOUSEOVER, "onMouseOver");
    _table.addChild(<any>EventName.MOUSEOUT, "onMouseOut");
    _table.addChild(<any>EventName.MOUSEMOVE, "onMouseMove");
    _table.addChild(<any>EventName.MOUSEDOWN, "onMouseDown");
    _table.addChild(<any>EventName.MOUSEUP, "onMouseUp");
    _table.addChild(<any>EventName.MOUSEWHEEL, "onMouseWheel");

    export class EventTriggerTable{
        public static getScriptHandlerName(eventName:EventName){
            var result = _table.getChild(<any>eventName);

            return result;
        }
    }
}