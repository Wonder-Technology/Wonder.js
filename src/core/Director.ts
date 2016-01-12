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
        public scene:SceneDispatcher = null;
        public scheduler:Scheduler = null;
        public renderer:Renderer= null;

        private _gameLoop:wdFrp.IDisposable = null;
        private _gameState:GameState = GameState.NORMAL;
        private _timeController:DirectorTimeController= DirectorTimeController.create();
        private _isFirstStart:boolean = true;
        private _isInitUIScene:boolean = false;


        public initWhenCreate(){
            this.scene = SceneDispatcher.create();
            this.scheduler = Scheduler.create();
            this.renderer = WebGLRenderer.create();
        }

        public start(){
            this._gameState = GameState.NORMAL;

            this._startLoop();
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

        public initUIObjectScene(){
            var uiObjectScene:UIObjectScene = this.scene.uiObjectScene;

            if(this._isInitUIScene){
                return;
            }

            this._isInitUIScene = true;

            EventManager.trigger(uiObjectScene, CustomEvent.create(<any>EngineEvent.BEFORE_INIT));

            uiObjectScene.onEnter();
            uiObjectScene.init();

            EventManager.trigger(uiObjectScene, CustomEvent.create(<any>EngineEvent.AFTER_INIT));
        }

        public runUIObjectScene(elapseTime:number){
            var uiObjectScene:UIObjectScene = this.scene.uiObjectScene;

            EventManager.trigger(uiObjectScene, CustomEvent.create(<any>EngineEvent.STARTLOOP));

            uiObjectScene.update(elapseTime);

            EventManager.trigger(uiObjectScene, CustomEvent.create(<any>EngineEvent.ENDLOOP));
        }

        private _startLoop() {
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

            this._initEvent();

            this._initGameObjectScene();

            this.initUIObjectScene();
        }

        private _initEvent(){
            var self = this;


            //todo refactor

            //todo bind on it default

            //todo dispose


            wdFrp.fromArray(
                [
                    EventManager.fromEvent(document.body, EventName.CLICK),
                    EventManager.fromEvent(document.body, EventName.MOUSEOVER),
                    EventManager.fromEvent(document.body, EventName.MOUSEOUT),
                    EventManager.fromEvent(document.body, EventName.MOUSEMOVE),
                    EventManager.fromEvent(document.body, EventName.MOUSEDOWN),
                    EventManager.fromEvent(document.body, EventName.MOUSEUP),
                    EventManager.fromEvent(document.body, EventName.MOUSEWHEEL),
                ]
                )
                .mergeAll()
                .map((e:MouseEvent) => {
                    var gameObjectScene:GameObjectScene = self.scene.gameObjectScene,
                        uiObjectScene:UIObjectScene = self.scene.uiObjectScene;

                    return [gameObjectScene.getMouseEventTriggerList(e).addChildren(uiObjectScene.getMouseEventTriggerList(e)), e];
                })
                .subscribe(([triggerList, e]) => {
                    triggerList.forEach((uiObject:UIObject) => {
                        uiObject.execEventScript(EventTriggerTable.getScriptHandlerName(e.name), e);
                    })
                });
        }

        private _initGameObjectScene(){
            var gameObjectScene:GameObjectScene = this.scene.gameObjectScene;

            EventManager.trigger(CustomEvent.create(<any>EngineEvent.BEFORE_INIT));

            gameObjectScene.onEnter();
            gameObjectScene.init();

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

            this._run(elapseTime);

            return true;
        }

        private _run(elapseTime:number){
            this._runGameObjectScene(elapseTime);

            this.runUIObjectScene(elapseTime);
        }

        private _runGameObjectScene(elapseTime:number) {
            var gameObjectScene:GameObjectScene = this.scene.gameObjectScene;

            this._timeController.tick(elapseTime);

            EventManager.trigger(CustomEvent.create(<any>EngineEvent.STARTLOOP));

            this.scheduler.update(elapseTime);

            gameObjectScene.update(elapseTime);
            gameObjectScene.render(this.renderer);

            if(this.renderer.hasCommand()){
                this.renderer.render();
            }

            EventManager.trigger(CustomEvent.create(<any>EngineEvent.ENDLOOP));
        }
    }
}
