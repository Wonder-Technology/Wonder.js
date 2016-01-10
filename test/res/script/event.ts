/// <reference path="../../../dist/wd.d.ts"/>
module sample {
    import IScriptBehavior = wd.IScriptBehavior;
    @wd.script("event")
    export class Event implements wd.IEventScriptBehavior{
        constructor(entityObject) {
        }

        public onMouseClick(e) {
        }
    }
}
