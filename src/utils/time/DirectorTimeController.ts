/// <reference path="../../definitions.d.ts"/>
module dy{
    const STARTING_FPS = 60;

    export class DirectorTimeController extends TimeController{
        public static create() {
            var obj = new this();

            return obj;
        }

        public gameTime:number = null;
        public fps:number = null;

        private _lastTime:number = null;

        public tick(time:number) {
            this._updateFps(time);
            this.gameTime = (time - this.startTime) / 1000;
            this._lastTime = time;
        }

        private _updateFps(time) {
            //if (this._loopType === YE.Director.LoopType.INTERVAL) {
            //    this._fps = 1 / this._loopInterval;
            //    return;
            //}

            if (this._lastTime === 0) {
                this.fps = STARTING_FPS;
            }
            else {
                this.fps = 1000 / (time - this._lastTime);
            }
        }
    }
}
