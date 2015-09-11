/// <reference path="../definitions.d.ts"/>
module dy{
    enum GameState{
        NORMAL,
        STOP,
        PAUSE
    }

    //todo invoke stage.onExit

    export class Director{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public stage:Stage = Stage.create();
        public scheduler:Scheduler = Scheduler.create();
        public renderer:render.Renderer= null;
        public view:IView = null;
        public gl:any = null;

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

        public scriptStreams:dyCb.Hash<dyRt.Stream> = dyCb.Hash.create<dyRt.Stream>();

        private _gameLoop:dyRt.IDisposable = null;
        private _gameState:GameState = GameState.NORMAL;
        private _timeController:DirectorTimeController= DirectorTimeController.create();
        private _isFirstStart:boolean = true;

        public initWhenCreate(){
            //todo detect to decide using which renderer
            this.renderer = render.WebGLRenderer.create();
        }

        public start(){
            this._gameState = GameState.NORMAL;

            this.startLoop();
        }

        public stop(){
            this._gameLoop && this._gameLoop.dispose();
            this._gameState = GameState.STOP;
            this._timeController.stop();
            this.scheduler.stop();
        }

        public pause(){
            if (this._gameState === GameState.PAUSE) {
                return;
            }

            this._gameState = GameState.PAUSE;
            this._timeController.pause();
            this.scheduler.pause();
        }

        public resume(){
            this._gameState = GameState.NORMAL;
            this._timeController.resume();
            this.scheduler.resume();
        }

        //todo add dispose

        public getView():IView{
            return this.view;
        }

        public getTopUnderPoint(point:Point):GameObject{
            //if(!this.scene){
            //    return null;
            //}

            //return this.scene.getTopUnderPoint(point);
            return this.stage.getTopUnderPoint(point);
        }

        public createGL(canvasId:string){
            this.view = ViewWebGL.create(dyCb.DomQuery.create(canvasId).get(0));
            //todo delete Director->gl
            this.gl = this.view.getContext();
        }

        private startLoop() {
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
            return dyRt.fromCollection(this.scriptStreams.getValues())
                .mergeAll();
        }

        private _buildInitStream(){
            return dyRt.callFunc(() => {
                this._isFirstStart = false;

                this.stage.onEnter();
                this.stage.init();

                //todo not put here?
                this.renderer.init();

                this._timeController.start();
                this.scheduler.start();
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

            //this.renderer.render(this.scene);

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
            this.stage.update(time);
            //invoke children's tranform(update modelMatrix, rotate,translate,scale)
            // and render(send vertice and indice datas to this.render, do other render work)
            //this.stage.visitStage(this.renderer);
            this.stage.render(this.renderer);
            //operate vertice and indice data, draw them(drawArray or drawElement)
            this.renderer.render();
            //do task?
            this.scheduler.update(time);
            //WOZLLA.utils.Tween.tick(Time.delta);
        }
    }
}
