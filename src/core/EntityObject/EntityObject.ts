module wd {
    //todo add clone method
    export abstract class EntityObject extends Entity{
        protected p_scriptList:wdCb.Hash<IScriptBehavior> = wdCb.Hash.create<IScriptBehavior>();
        get scriptList(){
            return this.p_scriptList;
        }

        private _bubbleParent:EntityObject = null;
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

        public name:string = null;
        public parent:EntityObject = null;
        public isVisible:boolean = true;

        //todo move away?
        public instanceSource:EntityObject = null;
        public instanceList:wdCb.Collection<any> = null;
        public toRenderInstanceList:wdCb.Collection<any> = null;
        public instanceBuffer:InstanceBuffer = null;

        public transform:Transform = null;

        public actionManager:ActionManager = ActionManager.create();

        protected children:wdCb.Collection<any> = wdCb.Collection.create<any>();
        protected startLoopHandler:() => void = null;
        protected endLoopHandler:() => void = null;
        protected components:wdCb.Collection<any> = wdCb.Collection.create<any>();

        private _scriptExecuteHistory:wdCb.Hash<boolean> = wdCb.Hash.create<boolean>();
        private _hasComponentCache:wdCb.Hash<boolean> = wdCb.Hash.create<boolean>();
        private _getComponentCache:wdCb.Hash<boolean> = wdCb.Hash.create<boolean>();
        private _rendererComponent:RendererComponent = null;
        private _animation:Animation = null;
        private _collider:Collider = null;
        private _componentChangeSubscription:wdFrp.IDisposable = null;

        @virtual
        public initWhenCreate(){
            this.addComponent(this.createTransform());
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

            this.initComponent();

            this.forEach((child:EntityObject) => {
                child.init();
            });

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
        }

        public onExit() {
            this.execScript("onExit");
        }

        public onDispose(){
            this.execScript("onDispose");
        }

        public dispose() {
            var components = null;

            this.onDispose();

            if(this.parent){
                this.parent.removeChild(this);
                this.parent = null;
            }

            EventManager.off(this);

            EventManager.off(<any>EEngineEvent.STARTLOOP, this.startLoopHandler);
            EventManager.off(<any>EEngineEvent.ENDLOOP, this.endLoopHandler);

            this._componentChangeSubscription && this._componentChangeSubscription.dispose();

            components = this.removeAllComponent();

            components.forEach((component:Component) => {
                component.dispose();
            });

            this.forEach((child:EntityObject) => {
                child.dispose();
            });
        }

        public hasChild(child:EntityObject):boolean {
            return this.children.hasChild(child);
        }

        public addChild(child:EntityObject):EntityObject {
            if (child.parent) {
                child.parent.removeChild(child);
            }

            child.parent = this;
            child.transform.parent = this.transform;

            this.children.addChild(child);

            /*!
             no need to sort!
             because WebGLRenderer enable depth test, it will sort when needed(just as WebGLRenderer->renderSortedTransparentCommands sort the commands)
             */

            child.onEnter();

            return this;
        }

        public addChildren(children:EntityObject);
        public addChildren(children:Array<EntityObject>);
        public addChildren(children:wdCb.Collection<EntityObject>);

        public addChildren(...args) {
            this.children.addChildren(args[0]);

            return this;
        }

        public forEach(func:(entityObject:EntityObject, index:number) => void){
            this.children.forEach(func);

            return this;
        }

        public filter(func:(entityObject:EntityObject) => boolean){
            return this.children.filter(func);
        }

        public sort(func:(a:EntityObject, b:EntityObject) => any, isSortSelf = false){
            return this.children.sort(func, isSortSelf);
        }

        public getChildren(){
            return this.children;
        }

        public getChild(index:number){
            return this.children.getChild(index);
        }

        public findChildByUid(uid:number){
            return this.children.findOne((child:EntityObject) => {
                return child.uid === uid;
            });
        }

        public findChildByTag(tag:string){
            return this.children.findOne((child:EntityObject) => {
                return child.hasTag(tag);
            });
        }

        public findChildByName(name:string){
            return this.children.findOne((child:EntityObject) => {
                return child.name.search(name) > -1;
            });
        }

        public findChildrenByName(name:string):wdCb.Collection<EntityObject>{
            return this.children.filter((child:EntityObject) => {
                return child.name.search(name) > -1;
            });
        }

        @cache(function(_class:any){
            return this._getComponentCache.hasChild(_class.name);
        }, function(_class:any){
            return this._getComponentCache.getChild(_class.name);
        }, function(result, _class:any){
            this._getComponentCache.addChild(_class.name, result);
        })
        public getComponent<T>(_class:any):T{
            return this.components.findOne((component:Component) => {
                return component instanceof _class;
            });
        }

        public findComponentByUid(uid:number){
            return this.components.findOne((component:Component) => {
                return component.uid === uid;
            });
        }

        public getFirstComponent():Component {
            return this.components.getChild(0);
        }

        public forEachComponent(func:(component:Component) => void){
            this.components.forEach(func);

            return this;
        }

        public removeChild(child:EntityObject):EntityObject {
            //todo remove child->instances

            child.onExit();

            this.children.removeChild(child);

            child.parent = null;

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

            if(JudgeUtils.isComponenet(args[0])){
                let component = args[0];

                result = this.components.hasChild(component);
            }
            else{
                let _class = args[0];

                result = this.components.hasChildWithFunc((component) => {
                    return component instanceof _class;
                });
            }

            this._hasComponentCache.addChild(key, result);

            return result;
        }

        public addComponent(component:Component, isShareComponent:boolean = false){
            if(!component){
                return;
            }

            if(this.hasComponent(component)){
                Log.assert(false, "the component already exist");
                return this;
            }

            if(component instanceof RendererComponent){
                this._rendererComponent = component;
            }
            else if(component instanceof Animation){
                this._animation = component;
            }
            else if(component instanceof Collider){
                this._collider = component;
            }
            else if(component instanceof Transform){
                this.transform = component;
            }

            this.components.addChild(component);

            component.addToObject(this, isShareComponent);

            this.componentDirty = true;

            return this;
        }

        public removeComponent(component:Component);
        public removeComponent(_class:Function);

        public removeComponent(...args){
            var component:Component = null;

            if(args[0] instanceof Component){
                component = <Component>args[0];
            }
            else{
                component = this.getComponent<any>(<Function>args[0]);
            }

            this.components.removeChild(component);

            this._removeComponentHandler(component);

            this.componentDirty = true;

            return this;
        }

        public removeAllComponent(){
            var result = wdCb.Collection.create<Component>();

            this.components.forEach((component:Component) => {
                this._removeComponentHandler(component);

                result.addChild(component)
            }, this);

            this.components.removeAllChildren();

            this.componentDirty = true;

            return result;
        }

        public render(renderer:Renderer, camera:GameObject):void {
            var geometry = null,
                rendererComponent = null;

            if(!this.isVisible){
                return;
            }

            geometry = this._getGeometry();
            rendererComponent = this._getRendererComponent();

            if(rendererComponent && geometry){
                if(this.hasToRenderInstance()){
                    DebugStatistics.count.renderGameObjects += this.toRenderInstanceList.getCount();
                }
                else{
                    DebugStatistics.count.renderGameObjects++;
                }
                //if(this.isInstance()){
                //    //this.instanceSource.toRenderInstanceList.addChild(this);
                //}
                //else{
                rendererComponent.render(renderer, geometry,  camera);
                //}
            }

            this.getRenderList().forEach((child:EntityObject) => {
                child.render(renderer, camera);
            });
        }

        public update(elapsedTime:number):void {
            var animation = this._getAnimation(),
                collider = this._getCollider();

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
            return this.components.filter((component:Component) => {
                return component instanceof _class;
            }).getCount();
        }




        //todo refactor: move instance to GameObject?
        //todo extract InstanceGameObject? or extract Instance component?

        @ensure(function(hasInstance){
            if(hasInstance){
                assert(!this.isInstance(), Log.info.FUNC_SHOULD_NOT("instance", "contain instance"));
            }
        })
        public hasInstance(){
            return this.instanceList && this.instanceList.getCount() > 0;
        }

        public hasInstanceAndHardwareSupport(){
            return GPUDetector.getInstance().extensionInstancedArrays !== null && this.hasInstance();
        }

        public hasToRenderInstance(){
            return this.toRenderInstanceList && this.toRenderInstanceList.getCount() > 0;
        }

        //public hasToRenderInstanceAndHardwareSupport(){
        //    return GPUDetector.getInstance().extensionInstancedArrays !== null && this.hasToRenderInstance();
        //}

        public isInstance(){
            return this.instanceSource !== null;
        }

        public isInstanceAndHardwareSupport(){
            return GPUDetector.getInstance().extensionInstancedArrays !== null && this.instanceSource !== null;
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

            return this.children;
        }

        protected initComponent(){
            if(this.hasComponent(Geometry)){
                this.getComponent<Geometry>(Geometry).init();
            }

            this.components.filter((component:Component) => {
                    return !(component instanceof Geometry);
                })
                .forEach((component:Component) => {
                    component.init();
                });
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

        @require(function(){
            assert(this.getComponentCount(Geometry) <= 1, Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 geometry component"));
        })
        private _getGeometry():Geometry{
            return this.getComponent<Geometry>(Geometry);
        }

        @require(function(){
            assert(this.getComponentCount(Animation) <= 1, Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 animation component"));
        })
        private _getAnimation():Animation{
            return this._animation;
        }

        @require(function(){
            assert(this.getComponentCount(RendererComponent) <= 1, Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 rendererComponent"));
        })
        private _getRendererComponent():RendererComponent{
            return this._rendererComponent;
        }

        @require(function(){
            assert(this.getComponentCount(Collider) <= 1, Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 collider component"));
        })
        private _getCollider():Collider{
            return this._collider;
        }

        private _removeComponentHandler(component:Component){
            component.removeFromObject(this);
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
    }
}

