/// <reference path="../../../../../dist/wd.d.ts"/>
module sample {
    import Button = wd.Button;
    import PlainFont = wd.PlainFont;
    import UIObject = wd.UIObject;
    import MouseEvent = wd.MouseEvent;

    @wd.script("eventHandler")
    export class EventHandler implements wd.IEventScriptBehavior {
        constructor(entityObject:UIObject) {
            this._entityObject = entityObject;
        }

        private _entityObject:UIObject = null;

        public init(){
            // can set Button Font here
            var font = this._entityObject.getComponent<Button>(Button).getFontObject().getComponent<PlainFont>(PlainFont);

            font.fontSize = 30;
        }

        public onMouseClick(e:MouseEvent) {
            if(this._entityObject.getComponent<Button>(Button).isDisabled()){
                return;
            }

            console.log("click");
        }
    }
}

