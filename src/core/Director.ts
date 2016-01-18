module wd{
    declare var document:any;

    enum GameState{
        NORMAL,
        STOP,
        PAUSE
    }

    //todo move to binder
    enum EventTag{
        MOUSE_OVER = <any>"MOUSE_OVER",
        MOUSE_OUT = <any>"MOUSE_OUT"
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
        private _eventSubscription:wdFrp.IDisposable = null;
        private _gameState:GameState = GameState.NORMAL;
        private _timeController:DirectorTimeController= DirectorTimeController.create();
        private _isFirstStart:boolean = true;
        private _isInitUIScene:boolean = false;
        //private _lastTriggerListData:any = null;
        private _lastTriggerList:any = null;


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
            this._eventSubscription && this._eventSubscription.dispose();
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




            this._eventSubscription = wdFrp.fromArray(
                [
                    EventManager.fromEvent(EventName.CLICK),
                    EventManager.fromEvent(EventName.MOUSEDOWN),
                    EventManager.fromEvent(EventName.MOUSEUP),
                    EventManager.fromEvent(EventName.MOUSEWHEEL),

                    /*!
                     here bind on document(not on document.body), so the event handler binded will not affected by other event handler binded on the same event
                     */
                    EventManager.fromEvent(document, EventName.MOUSEDOWN)
                        .flatMap((e:MouseEvent) => {
                        return EventManager.fromEvent(document, EventName.MOUSEMOVE).takeUntil(EventManager.fromEvent(document, EventName.MOUSEUP));
                    })
                        .map((e:MouseEvent) => {
                            e.name = EventName.MOUSEDRAG;

                            return e;
                        })
                ]
                )
                .mergeAll()
                .map((e:MouseEvent) => {
                    return self._getMouseEventTriggerListData(e);
                })

                    .merge(
            EventManager.fromEvent(EventName.MOUSEMOVE)
                .map((e:MouseEvent) => {
                    var triggerList = self._getMouseEventTriggerList(e),
                        objects = null;
                    var {mouseoverObjects, mouseoutObjects} = self._getMouseOverAndMouseOutObject(triggerList, self._lastTriggerList);

                    self._setMouseOverTag(mouseoverObjects);
                    self._setMouseOutTag(mouseoutObjects);

                    self._lastTriggerList = triggerList.copy();

                    triggerList.addChildren(mouseoutObjects);

                    return self._getMouseEventTriggerListData(e, triggerList);
                })
                    )
                .subscribe(([triggerList, e]) => {
                    //todo optimize:move to first to judge
                    if(self._gameState === GameState.PAUSE || triggerList.getCount() === 0){
                        return;
                    }

                    triggerList.forEach((entityObject:EntityObject) => {
                        self._trigger(e, entityObject);
                    })
                });
        }

        private _getMouseOverAndMouseOutObject(currentTriggerList:wdCb.Collection<EntityObject>, lastTriggerList:wdCb.Collection<EntityObject>){
            var mouseoverObjects = wdCb.Collection.create<EntityObject>(),
                mouseoutObjects = wdCb.Collection.create<EntityObject>();

            if(!lastTriggerList){
                mouseoverObjects = currentTriggerList;
            }
            else{
                //todo optimize

                lastTriggerList.forEach((lastObject:EntityObject) => {
                    if(!currentTriggerList.hasChild((currentObject:EntityObject) => {
                            return JudgeUtils.isEqual(currentObject, lastObject);
                        })){
                        mouseoutObjects.addChild(lastObject);
                    }
                });

                currentTriggerList.forEach((currentObject:EntityObject) => {
                    if(!lastTriggerList.hasChild((lastObject:EntityObject) => {
                            return JudgeUtils.isEqual(currentObject, lastObject);
                        })){
                        mouseoverObjects.addChild(currentObject);
                    }
                });
            }

            return {
                mouseoverObjects: mouseoverObjects,
                mouseoutObjects: mouseoutObjects
            }
        }

        private _setMouseOverTag(objects:wdCb.Collection<EntityObject>){
            objects.forEach((object:EntityObject) => {
                object.addTag(<any>EventTag.MOUSE_OVER);
            })
        }

        private _setMouseOutTag(objects:wdCb.Collection<EntityObject>){
            objects.forEach((object:EntityObject) => {
                object.addTag(<any>EventTag.MOUSE_OUT);
            })
        }

        private _setEventNameByEventTag(object:EntityObject, e:MouseEvent){
            if(object.hasTag(<any>EventTag.MOUSE_OVER)){
                e.name = EventName.MOUSEOVER;
            }
            else if(object.hasTag(<any>EventTag.MOUSE_OUT)){
                e.name = EventName.MOUSEOUT;
            }

            return e;
        }

        private _removeEventTag(object:EntityObject){
            object.removeTag(<any>EventTag.MOUSE_OVER);
            object.removeTag(<any>EventTag.MOUSE_OUT);
        }

        private _trigger(e:MouseEvent, entityObject:EntityObject) {
            var event:MouseEvent = this._setEventNameByEventTag(entityObject, e),
                handlerName = EventTriggerTable.getScriptHandlerName(event.name);

            this._removeEventTag(entityObject);

            EventManager.trigger(entityObject, CustomEvent.create(<any>EngineEvent[EventTriggerTable.getScriptEngineEvent(event.name)]), event);

            entityObject.execEventScript(handlerName, event);


            if (!event.isStopPropagation && entityObject.bubbleParent) {
                this._trigger(event, entityObject.bubbleParent);
            }
        }

        private _getMouseEventTriggerList(e:MouseEvent){
            var gameObjectScene:GameObjectScene = this.scene.gameObjectScene,
                uiObjectScene:UIObjectScene = this.scene.uiObjectScene,
                triggerList = null;

            triggerList = gameObjectScene.getMouseEventTriggerDataList(e).addChildren(uiObjectScene.getMouseEventTriggerDataList(e));

            if(this._isTriggerScene(e)){
                triggerList.addChild(this.scene);
            }

            return triggerList;
        }

        private _isTriggerScene(e:MouseEvent){
            var detector = this.scene.getComponent<EventTriggerDetector>(EventTriggerDetector);

            return detector.isTrigger(e);
        }


        private _getMouseEventTriggerListData(e:MouseEvent);
        private _getMouseEventTriggerListData(e:MouseEvent, triggerList:wdCb.Collection<EntityObject>);

        private _getMouseEventTriggerListData(...args){
            if(args.length === 1){
                let e:MouseEvent = args[0];

                return [this._getMouseEventTriggerList(e), e];
            }
            else{
                let e:MouseEvent = args[0],
                    triggerList:wdCb.Collection<EntityObject> = args[1];

                return [triggerList, e];
            }
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
