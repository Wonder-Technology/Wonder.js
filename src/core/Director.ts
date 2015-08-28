/// <reference path="../definitions.d.ts"/>
module dy{
    enum GameState{
        NORMAL,
        STOP,
        PAUSE
    }

    //todo invoke stage.onExit

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

        private _scheduler:Scheduler = Scheduler.create();
        get scheduler(){
            return this._scheduler;
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

        get gameTime(){
            return this._timeController.gameTime;
        }

        get fps(){
            return this._timeController.fps;
        }

        get isNormal(){
            return this._gameState === GameState.NORMAL;
        }

        get isStop(){
            return this._gameState === GameState.STOP;
        }

        get isPause(){
            return this._gameState === GameState.PAUSE;
        }

        get isTimeChange(){
            return this._timeController.isTimeChange;
        }

        get elapsed(){
            return this._timeController.elapsed;
        }

        public scriptStreams:dyCb.Collection<dyRt.Stream> = dyCb.Collection.create<dyRt.Stream>();

        private _gameLoop:dyRt.IDisposable = null;
        private _gameState:GameState = GameState.NORMAL;
        private _timeController:DirectorTimeController= DirectorTimeController.create();
        private _isFirstStart:boolean = true;

        public initWhenCreate(){
            //todo detect to decide using which renderer
            this._renderer = render.WebGLRenderer.create();
        }

        public start(){
            this._gameState = GameState.NORMAL;

            this._startLoop();
        }

        public stop(){
            this._gameLoop.dispose();
            this._gameState = GameState.STOP;
            this._timeController.stop();
            this._scheduler.stop();
        }

        public pause(){
            if (this._gameState === GameState.PAUSE) {
                return;
            }

            this._gameState = GameState.PAUSE;
            this._timeController.pause();
            this._scheduler.pause();
        }

        public resume(){
            this._gameState = GameState.NORMAL;
            this._timeController.resume();
            this._scheduler.resume();
        }

        //todo add dispose

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
            //todo delete Director->gl
            this._gl = this._view.getContext();
        }

        private _startLoop() {
            var self = this;

            this._gameLoop = dyRt.judge(
                () => { return self._isFirstStart; },
                () => {
                    return self._buildLoadScriptStream();
                },
                () => {
                    return dyRt.empty();
                }
            )
            .concat(this._buildInitStream())
                .ignoreElements()
                .concat(this._buildLoopStream())
                .subscribe((time) => {
                    //todo need polyfill
                    /*!
                     i consider that the time is DOMHighResTimeStamp(从页面导航开始时测量的高精确度时间),
                     but it may be DOMTimeStamp in some browser!
                     so it may need polyfill!
                     */
                    self._loopBody(time);
                });
        }

        private _buildLoadScriptStream(){
            return dyRt.fromCollection(this.scriptStreams)
                .mergeAll();
        }

        private _buildInitStream(){
            return dyRt.callFunc(() => {
                this._isFirstStart = false;

                GPUDetector.getInstance().detect();

                this._stage.init();
                EventManager.trigger(dy.CustomEvent.create("dy_enter"));

                //todo not put here?
                this._renderer.init();

                this._timeController.start();
                this._scheduler.start();
            }, this);
        }

        private _buildLoopStream(){
            return dyRt.intervalRequest();
        }

        private _loopBody(time) {
            var elapseTime = null;

            if(this._gameState === GameState.PAUSE || this._gameState === GameState.STOP){
                return false;
            }

            elapseTime = this._timeController.computeElapseTime(time);

            this._timeController.tick(elapseTime);

            //todo invoke stage->syncHierarchy()

            EventManager.trigger(dy.CustomEvent.create("dy_startLoop"));

            this._run(elapseTime);
            //this._run(time);

            //this._renderer.render(this._scene);

            EventManager.trigger(dy.CustomEvent.create("dy_endLoop"));

            return true;
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
            this._scheduler.update(time);
            //WOZLLA.utils.Tween.tick(Time.delta);
        }
    }
}
