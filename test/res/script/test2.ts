/// <reference path="../../../dist/wd.d.ts"/>
module sample {
    @wd.script("test2")
    export class Test2 implements wd.IScriptBehavior{
        constructor(gameObject) {
            this.gameObject = gameObject;
        }

        public gameObject:wd.GameObject = null;

        public init() {
        }

        public update(time) {
            this.gameObject.scriptList.getChild("test").update(time);
        }

        public onEnter() {
        }

        public onStartLoop() {
        }

        public onEndLoop() {
        }

        public onExit() {
        }

        public onDispose() {
        }
    }
}
