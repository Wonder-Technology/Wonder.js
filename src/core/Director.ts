/// <reference path="../filePath.d.ts"/>
module wd{
    enum GameState{
        NORMAL,
        STOP,
        PAUSE
    }

    //todo invoke scene.onExit

    export class Director{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public scene:Scene = Scene.create();
        public scheduler:Scheduler = Scheduler.create();
        public renderer:Renderer= null;

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

        get view(){
            return DeviceManager.getInstance().view;
        }

        public scriptStreams:wdCb.Hash<wdFrp.Stream> = wdCb.Hash.create<wdFrp.Stream>();

        private _gameLoop:wdFrp.IDisposable = null;
        private _gameState:GameState = GameState.NORMAL;
        private _timeController:DirectorTimeController= DirectorTimeController.create();
        private _isFirstStart:boolean = true;

        public initWhenCreate(){
            this.renderer = WebGLRenderer.create();
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

        public getDeltaTime(){
            return this._timeController.deltaTime;
        }

        private startLoop() {
            var self = this;

            this._gameLoop = wdFrp.judge(
                () => { return self._isFirstStart; },
                () => {
                    return self._buildLoadScriptStream();
                },
                () => {
                    return wdFrp.empty();
                }
            )
            .concat(this._buildInitStream())
                .ignoreElements()
                .concat(this._buildLoopStream())
                .subscribe((time) => {
                    //todo need polyfill
                    /*!
                     I assume that the time is DOMHighResTimeStamp, but it may be DOMTimeStamp in some browser!
                     so it need polyfill
                     */
                    self._loopBody(time);
                });
        }

        private _buildLoadScriptStream(){
            return wdFrp.fromCollection(this.scriptStreams.getValues())
                .mergeAll();
        }

        private _buildInitStream(){
            return wdFrp.callFunc(() => {
                this._init();
            }, this);
        }

        private _init(){
            this._isFirstStart = false;

            EventManager.trigger(CustomEvent.create(<any>EngineEvent.BEFORE_INIT));

            this.scene.onEnter();
            this.scene.init();

            //todo not put here?
            this.renderer.init();

            this._timeController.start();
            this.scheduler.start();

            EventManager.trigger(CustomEvent.create(<any>EngineEvent.AFTER_INIT));
            EventManager.trigger(CustomEvent.create(<any>EngineEvent.AFTER_INIT_RIGIDBODY_ADD_CONSTRAINT));
        }

        private _buildLoopStream(){
            return wdFrp.intervalRequest();
        }

        private _loopBody(time) {
            var elapseTime = null;

            if(this._gameState === GameState.PAUSE || this._gameState === GameState.STOP){
                return false;
            }

            elapseTime = this._timeController.computeElapseTime(time);

            this._timeController.tick(elapseTime);

            EventManager.trigger(CustomEvent.create(<any>EngineEvent.STARTLOOP));

            this._run(elapseTime);

            EventManager.trigger(CustomEvent.create(<any>EngineEvent.ENDLOOP));

            return true;
        }

        private _run(elapseTime:number) {
            this.scheduler.update(elapseTime);
            this.scene.update(elapseTime);
            this.scene.render(this.renderer);

            if(this.renderer.hasCommand()){
                this.renderer.render();
            }
        }
    }
}
