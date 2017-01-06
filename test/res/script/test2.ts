/// <reference path="../../../dist/Hilo3D.d.ts"/>
module sample {
    @Hilo3D.script("test2")
    export class Test2 implements Hilo3D.IScriptBehavior{
        constructor(gameObject) {
            this.gameObject = gameObject;
        }

        public gameObject:Hilo3D.GameObject = null;

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
