module wd {
    export abstract class EntityObject extends Entity{
        protected p_scriptList:wdCb.Hash<IScriptBehavior> = wdCb.Hash.create<IScriptBehavior>();
        get scriptList(){
            return this.p_scriptList;
        }

        private _bubbleParent:EntityObject = null;
        @cloneAttributeAsBasicType()
        get bubbleParent(){
            return this._bubbleParent ? this._bubbleParent : this.parent;
        }
        set bubbleParent(bubbleParent:EntityObject){
            this._bubbleParent = bubbleParent;
        }

        set componentDirty(componentDirty:boolean){
            if(componentDirty === true){
                this.clearCache();
            }
        }

        get transform(){
            return this._componentManager.transform;
        }

        @cloneAttributeAsBasicType()
        public name:string = null;
        @cloneAttributeAsBasicType()
        public parent:EntityObject = null;
        @cloneAttributeAsBasicType()
        public isVisible:boolean = true;

        public actionManager:ActionManager = null;

        protected startLoopHandler:() => void = null;
        protected endLoopHandler:() => void = null;

        private _scriptExecuteHistory:wdCb.Hash<boolean> = wdCb.Hash.create<boolean>();
        private _hasComponentCache:wdCb.Hash<boolean> = wdCb.Hash.create<boolean>();
        private _getComponentCache:wdCb.Hash<boolean> = wdCb.Hash.create<boolean>();
        private _componentChangeSubscription:wdFrp.IDisposable = null;
        private _componentManager:ComponentManager = ComponentManager.create(this);
        private _entityObjectManager:EntityObjectManager = EntityObjectManager.create(this);

        @virtual
        public initWhenCreate(){
            this.addComponent(this.createTransform());

            this.actionManager = ActionManager.create();
            this.addComponent(this.actionManager);
        }

        public clone(){
            var result = null;

            if(CloneUtils.isNotClone((this))){
                return null;
            }

            result = CloneUtils.clone<EntityObject>(this);

            this.forEachComponent((component:Component) => {
                result.addComponent(component.clone());
            });

            this._cloneChildren(result);

            return result;
        }

        public init() {
            var self = this;

            this.startLoopHandler = wdCb.FunctionUtils.bind(this, () => {
                this.onStartLoop();
            });
            this.endLoopHandler = wdCb.FunctionUtils.bind(this, () => {
                this.onEndLoop();
            });

            this.bindStartLoopEvent();
            this.bindEndLoopEvent();

            this._componentChangeSubscription = EventManager.fromEvent(this, <any>EEngineEvent.COMPONENT_CHANGE)
            .subscribe(() => {
                    self._onComponentChange();
            });

            this._componentManager.init();
            this._entityObjectManager.init();

            this.afterInitChildren();

            return this;
        }

        public onStartLoop() {
            this.execScript("onStartLoop");
        }

        public onEndLoop() {
            this.execScript("onEndLoop");
        }

        public onEnter() {
            this.execScript("onEnter");

            EventManager.trigger(this, CustomEvent.create(<any>EEngineEvent.ENTER));
        }

        public onExit() {
            this.execScript("onExit");

            EventManager.trigger(this, CustomEvent.create(<any>EEngineEvent.EXIT));
        }

        public onDispose(){
            this.execScript("onDispose");
        }

        public dispose() {
            this.onDispose();

            if(this.parent){
                this.parent.removeChild(this);
                this.parent = null;
            }

            EventManager.off(this);

            EventManager.off(<any>EEngineEvent.STARTLOOP, this.startLoopHandler);
            EventManager.off(<any>EEngineEvent.ENDLOOP, this.endLoopHandler);

            this._componentChangeSubscription && this._componentChangeSubscription.dispose();

            this._componentManager.dispose();
            this._entityObjectManager.dispose();
        }

        public hasChild(child:EntityObject):boolean {
            return this._entityObjectManager.hasChild(child);
        }

        public addChild(child:EntityObject):EntityObject {
            this._entityObjectManager.addChild(child);

            child.transform.parent = this.transform;

            return this;
        }

        public addChildren(children:EntityObject);
        public addChildren(children:Array<EntityObject>);
        public addChildren(children:wdCb.Collection<EntityObject>);

        public addChildren(...args) {
            this._entityObjectManager.addChildren(args[0]);

            return this;
        }

        public forEach(func:(entityObject:EntityObject, index:number) => void){
            this._entityObjectManager.forEach(func);

            return this;
        }

        public filter(func:(entityObject:EntityObject) => boolean){
            return this._entityObjectManager.filter(func);
        }

        public sort(func:(a:EntityObject, b:EntityObject) => any, isSortSelf = false){
            return this._entityObjectManager.sort(func, isSortSelf);
        }

        public getChildren(){
            return this._entityObjectManager.getChildren();
        }

        public getChild(index:number){
            return this._entityObjectManager.getChild(index);
        }

        public findChildByUid(uid:number){
            return this._entityObjectManager.findChildByUid(uid);
        }

        public findChildByTag(tag:string){
            return this._entityObjectManager.findChildByTag(tag);
        }

        public findChildByName(name:string){
            return this._entityObjectManager.findChildByName(name);
        }

        public findChildrenByName(name:string):wdCb.Collection<EntityObject>{
            return this._entityObjectManager.findChildrenByName(name);
        }

        public removeChild(child:EntityObject):EntityObject {
            this._entityObjectManager.removeChild(child);

            return this;
        }


        @cache(function(_class:any){
            return this._getComponentCache.hasChild(_class.name);
        }, function(_class:any){
            return this._getComponentCache.getChild(_class.name);
        }, function(result, _class:any){
            this._getComponentCache.addChild(_class.name, result);
        })
        public getComponent<T>(_class:any):T{
            return this._componentManager.getComponent<T>(_class);
        }

        public getAllComponent(){
            return this._componentManager.getAllComponent();
        }

        public findComponentByUid(uid:number){
            return this._componentManager.findComponentByUid(uid);
        }

        public forEachComponent(func:(component:Component) => void){
            this._componentManager.forEachComponent(func);

            return this;
        }

        public hasComponent(component:Component):boolean;
        public hasComponent(_class:Function):boolean;

        /*!
         not use @cache,
         here judge return data of "getChild", so it don't need to invoke "hasChild"
         */
        public hasComponent(...args){
            var key = this._getHasComponentCacheKey(args[0]),
                result = this._hasComponentCache.getChild(key);

            if(result !== void 0){
                return result;
            }

            result =  this._componentManager.hasComponent(args[0]);

            this._hasComponentCache.addChild(key, result);

            return result;
        }

        public addComponent(component:Component, isShareComponent:boolean = false){
            this._componentManager.addComponent(component, isShareComponent);

            this.componentDirty = true;

            return this;
        }

        public removeComponent(component:Component);
        public removeComponent(_class:Function);

        public removeComponent(...args){
            this._componentManager.removeComponent(args[0]);

            this.componentDirty = true;

            return this;
        }

        public removeAllComponent(){
            this.componentDirty = true;

            return this._componentManager.removeAllComponent();
        }

        public render(renderer:Renderer, camera:GameObject):void {
            var geometry = null,
                rendererComponent = null;

            if(!this.isVisible){
                return;
            }

            geometry = this.getGeometry();
            rendererComponent = this._componentManager.getRendererComponent();

            if(rendererComponent && geometry){
                rendererComponent.render(renderer, geometry,  camera);
            }

            this.getRenderList().forEach((child:EntityObject) => {
                child.render(renderer, camera);
            });
        }

        public update(elapsedTime:number):void {
            var animation = this._componentManager.getAnimation(),
                collider = this._componentManager.getCollider();

            if(animation){
                animation.update(elapsedTime);
            }

            this.actionManager.update(elapsedTime);

            this.execScript("update", elapsedTime);

            if(collider){
                collider.update(elapsedTime);
            }

            this.beforeUpdateChildren(elapsedTime);

            this.forEach((child:EntityObject) => {
                child.update(elapsedTime);
            });
        }

        public execScript(method:string);
        public execScript(method:string, arg:any);
        public execScript(method:string, arg:any, isExecOnlyOnce:boolean);

        public execScript(...args){
            var method:string = args[0],
                self = this;

            if(args.length === 1){
                this.p_scriptList.forEach((script:IScriptBehavior, scriptName:string) => {
                    script[method] && script[method]();

                    self._addToScriptExecuteHistory(scriptName, method);
                });
            }
            else if(args.length === 2){
                let arg:any = args[1];

                this.p_scriptList.forEach((script:IScriptBehavior, scriptName:string) => {
                    script[method] && script[method](arg);

                    self._addToScriptExecuteHistory(scriptName, method);
                });
            }
            else if(args.length === 3){
                let arg:any = args[1],
                    isExecOnlyOnce:boolean = args[2];

                this.p_scriptList.forEach((script:IScriptBehavior, scriptName:string) => {
                    if(isExecOnlyOnce && self._isScriptExecuted(scriptName, method)){
                        return;
                    }

                    script[method] && script[method](arg);

                    self._addToScriptExecuteHistory(scriptName, method);
                });
            }
        }

        public execEventScript(method:string, arg?:any){
            this.p_scriptList.forEach((script:IEventScriptBehavior) => {
                script[method] && (arg ? script[method](arg) : script[method]());
            });
        }

        public getComponentCount(_class:Function){
            return this._componentManager.getComponentCount(_class);
        }

        protected abstract createTransform():Transform;

        @virtual
        protected beforeUpdateChildren(elapsedTime:number){
        }

        @virtual
        protected afterInitChildren(){
        }

        @virtual
        protected bindStartLoopEvent(){
            EventManager.on(<any>EEngineEvent.STARTLOOP, this.startLoopHandler);
        }

        @virtual
        protected bindEndLoopEvent(){
            EventManager.on(<any>EEngineEvent.ENDLOOP, this.endLoopHandler);
        }

        @virtual
        protected getRenderList(){
            if(!this.isVisible){
                return null;
            }

            return this._entityObjectManager.getChildren();
        }

        @virtual
        protected getGeometry(){
            return this._componentManager.getGeometry();
        }

        protected getAllChildren(){
            var result = wdCb.Collection.create<EntityObject>();
            var getChildren = (entityObject:EntityObject) => {
                result.addChildren(entityObject.getChildren());

                entityObject.forEach((child:EntityObject) => {
                    getChildren(child);
                });
            }

            getChildren(this);

            return result;
        }

        public clearCache(){
            this._hasComponentCache.removeAllChildren();
            this._getComponentCache.removeAllChildren();
        }

        private _addToScriptExecuteHistory(scriptName:string, method:string){
            this._scriptExecuteHistory.addChild(this._buildScriptHistoryKey(scriptName, method), true);
        }

        private _isScriptExecuted(scriptName:string, method:string):boolean{
            return this._scriptExecuteHistory.getChild(this._buildScriptHistoryKey(scriptName, method));
        }

        private _buildScriptHistoryKey(scriptName:string, method:string){
            return `${scriptName}_${method}`;
        }

        @ensure(function(key:string){
            assert(JudgeUtils.isString(key), Log.info.FUNC_SHOULD(`key:${key}`, "be string"));
        })
        private _getHasComponentCacheKey(...args){
            if(JudgeUtils.isComponenet(args[0])){
                let component:Component = args[0];

                return String(component.uid);
            }
            else{
                let _class:any = args[0];

                return _class.name;
            }
        }

        private _onComponentChange(){
            this.clearCache();
        }

        private _cloneChildren(result:EntityObject){
            this.forEach((child:EntityObject) => {
                var resultChild = child.clone();

                if(resultChild !== null){
                    result.addChild(resultChild);
                }
            });
        }
    }
}

