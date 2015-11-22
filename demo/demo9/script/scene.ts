/// <reference path="../../../dist/dy.d.ts"/>
module sample {
    @dy.script("scene")
    export class Scene {
        constructor(gameObject:dy.GameObject) {
            this._gameObject = gameObject;
        }

        public state:string = null;

        private _gameObject:dy.GameObject = null;

        public init() {
            this.state = "init";
        }

        public update(time) {
            this.state = "update";
        }

        public onEnter() {
            this.state = "onEnter";
        }

        public onStartLoop() {
            this.state = "onStartLoop";
        }

        public onEndLoop() {
            this.state = "onEndLoop";
        }

        public onExit() {
            this.state = "onExit";
        }
    }
}
