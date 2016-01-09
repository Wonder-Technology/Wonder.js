/// <reference path="../../../dist/wd.d.ts"/>
module sample {
    @wd.script("event")
    export class Event implements wd.IEventScriptBehavior{
        constructor(entityObject) {
        }

        public onMouseClick(e) {
        }
    }
}
