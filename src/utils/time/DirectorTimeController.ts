/// <reference path="../../filePath.d.ts"/>
module wd{
    const STARTING_FPS = 60,
        GAMETIME_SCALE = 1000;

    export class DirectorTimeController extends TimeController{
        public static create() {
            var obj = new this();

            return obj;
        }

        public gameTime:number = null;
        public fps:number = null;
        public isTimeChange:boolean = false;

        private _lastTime:number = null;

        public tick(time:number) {
            this._updateFps(time);
            this.gameTime = time / GAMETIME_SCALE;

            this._lastTime = time;
        }

        public start(){
            super.start();

            this.isTimeChange = true;
            this.elapsed = 0;
        }

        public resume(){
            super.resume();

            this.isTimeChange = true;
        }

        protected getNow(){
            return root.performance.now();
        }

        private _updateFps(time) {
            if (this._lastTime === null) {
                this.fps = STARTING_FPS;
            }
            else {
                this.fps = 1000 / (time - this._lastTime);
            }
        }
    }
}
