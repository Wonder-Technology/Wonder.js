/// <reference path="../../../../../dist/wd.d.ts"/>
module sample {
    @wd.script("eventHandler")
    export class EventHandler implements wd.IEventScriptBehavior {
        constructor(entityObject:wd.GameObject) {
            this._entityObject = entityObject;
        }

        private _entityObject:wd.UIObject = null;

        public onMouseClick(e:MouseEvent) {
            alert("click");
        }
    }
}

