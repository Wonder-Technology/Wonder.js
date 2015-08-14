/// <reference path="../definitions.d.ts"/>
module dy{
    const STARTING_FPS = 60;

    export class Director{
        private static _instance:Director = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        private _stage:Stage = Stage.create();
        get stage(){
            return this._stage;
        }

        private _renderer:render.Renderer= null;
        get renderer(){
            return this._renderer;
        }
        set renderer(renderer:render.Renderer){
            this._renderer = renderer;
        }

        private _view:IView = null;
        get view(){
            return this._view;
        }
        set view(view:IView){
            this._view = view;
        }

        private _gl:any = null;
        get gl(){
            return this._gl;
        }
        set gl(gl:any){
            this._gl = gl;
        }

        private _gameTime:number = 0;
        get gameTime(){
            return this._gameTime;
        }
        set gameTime(gameTime:number){
            this._gameTime = gameTime;
        }

        private _fps:number = null;
        get fps(){
            return this._fps;
        }
        set fps(fps:number){
            this._fps = fps;
        }

        private _lastTime:number = null;
        private _startTime:number = null;
        private _gameLoop:dyRt.IDisposable = null;

        public initWhenCreate(){
            //todo detect to decide using which renderer
            this._renderer = dy.render.WebGLRenderer.create();
        }

        //public runWithScene(scene:Scene) {
        //    scene.init();
        //    scene.onEnter();
        //    this._scene = scene;
        //
        //    this._renderer.init();
        //
        //    this._startLoop();
        //}

        //todo add stop,pause,resume method

        public start(){
            this._stage.init();
            this._stage.onEnter();

            //todo not put here?
            this._renderer.init();

            //todo use performance.now?
            this._startTime = this._getTimeNow();

            this._startLoop();
        }

        public getView():IView{
            return this._view;
        }

        public getTopUnderPoint(point:Point):GameObject{
            //if(!this._scene){
            //    return null;
            //}

            //return this._scene.getTopUnderPoint(point);
            return this._stage.getTopUnderPoint(point);
        }

        public createGL(canvasId:string){
            this._view = ViewWebGL.create(dyCb.DomQuery.create(canvasId).get(0));
            this._gl = this._view.getContext();
        }

        private _startLoop() {
            var self = this;

            this._gameLoop = dyRt.intervalRequest()
            .subscribe((time) => {
                    self._loopBody(time);
                });
        }
        private _loopBody(time) {
            //todo create Tween class to control time(contain tick method)?
            this._tick(time);

            //todo invoke stage->syncHierarchy()

            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);

            this._stage.onStartLoop();

            this._run(time);

            //this._renderer.render(this._scene);

            this._stage.onEndLoop();
        }

        private _getTimeNow() {
            return performance.now();
        }

        private _tick(time) {
            this._updateFps(time);
            this.gameTime = (time - this._startTime) / 1000;
            this._lastTime = time;
        }

        private _updateFps(time) {
            //if (this._loopType === YE.Director.LoopType.INTERVAL) {
            //    this._fps = 1 / this._loopInterval;
            //    return;
            //}

            if (this._lastTime === 0) {
                this._fps = STARTING_FPS;
            }
            else {
                this._fps = 1000 / (time - this._lastTime);
            }
        }

        /**
         * run one frame
         * @param {number} [timeScale=1]
         */
        //private _run(timeScale=this._timeScale) {
        private _run(time:number) {
            //Time.update(timeScale);
            //update children's behaviour
            this._stage.update(time);
            //invoke children's tranform(update modelMatrix, rotate,translate,scale)
            // and render(send vertice and indice datas to this._render, do other render work)
            //this._stage.visitStage(this._renderer);
            this._stage.render(this._renderer);
            //operate vertice and indice data, draw them(drawArray or drawElement)
            this._renderer.render();
            //do task?
            //this._scheduler.runSchedule();
            //WOZLLA.utils.Tween.tick(Time.delta);
        }
    }
}
