module wd {
    //todo add copy method
    export abstract class EntityObject extends Entity{
        private _scriptList:wdCb.Hash<IScriptBehavior> = wdCb.Hash.create<IScriptBehavior>();
        get scriptList(){
            return this._scriptList;
        }

        private _bubbleParent:EntityObject = null;
        get bubbleParent(){
            return this._bubbleParent ? this._bubbleParent : this.parent;
        }
        set bubbleParent(bubbleParent:EntityObject){
            this._bubbleParent = bubbleParent;
        }

        private _transform:Transform = null;
        get transform(){
            return this._transform;
        }
        set transform(transform:Transform){
            if(!transform) {
                return
            }

            if(this._transform){
                this.removeComponent(this._transform);
            }

            this.addComponent(transform);
            this._transform = transform;
        }

        public name:string = null;
        public parent:EntityObject = null;

        public actionManager:ActionManager = ActionManager.create();

        protected children:wdCb.Collection<any> = wdCb.Collection.create<any>();
        protected startLoopHandler:() => void = null;
        protected endLoopHandler:() => void = null;
        protected components:wdCb.Collection<any> = wdCb.Collection.create<any>();

        private _scriptExecuteHistory:wdCb.Hash<boolean> = wdCb.Hash.create<boolean>();

        @virtual
        public initWhenCreate(){
            this.transform = this.createTransform();
        }

        public init() {
            this.startLoopHandler = wdCb.FunctionUtils.bind(this, () => {
                this.onStartLoop();
            });
            this.endLoopHandler = wdCb.FunctionUtils.bind(this, () => {
                this.onEndLoop();
            });

            this.bindStartLoopEvent();
            this.bindEndLoopEvent();

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

            EventManager.off(<any>EngineEvent.STARTLOOP, this.startLoopHandler);
            EventManager.off(<any>EngineEvent.ENDLOOP, this.endLoopHandler);

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

        public forEach(func:(entityObject:EntityObject) => void){
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

        public getComponent<T>(_class:Function):T{
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
            child.onExit();

            this.children.removeChild(child);

            child.parent = null;

            return this;
        }

        public hasComponent(component:Component):boolean;
        public hasComponent(_class:Function):boolean;

        public hasComponent(...args){
            if(args[0] instanceof Component){
                let component = args[0];

                return this.components.hasChild(component);
            }
            else{
                let _class = args[0];

                return this.components.hasChild((component) => {
                    return component instanceof _class;
                })
            }
        }

        public addComponent(component:Component){
            if(this.hasComponent(component)){
                Log.assert(false, "the component already exist");
                return this;
            }

            this.components.addChild(component);

            component.addToObject(this);

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

            return this;
        }

        public removeAllComponent(){
            var result = wdCb.Collection.create<Component>();

            this.components.forEach((component:Component) => {
                this._removeComponentHandler(component);

                result.addChild(component)
            }, this);

            this.components.removeAllChildren();

            return result;
        }

        public render(renderer:Renderer, camera:GameObject):void {
            var geometry = this._getGeometry(),
                rendererComponent = this._getRendererComponent();

            if(rendererComponent && geometry){
                rendererComponent.render(renderer, geometry,  camera);

                DebugStatistics.count.renderGameObjects++;
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
                this._scriptList.forEach((script:IScriptBehavior, scriptName:string) => {
                    script[method] && script[method]();

                    self._addToScriptExecuteHistory(scriptName, method);
                });
            }
            else if(args.length === 2){
                let arg:any = args[1];

                this._scriptList.forEach((script:IScriptBehavior, scriptName:string) => {
                    script[method] && script[method](arg);

                    self._addToScriptExecuteHistory(scriptName, method);
                });
            }
            else if(args.length === 3){
                let arg:any = args[1],
                    isExecOnlyOnce:boolean = args[2];

                this._scriptList.forEach((script:IScriptBehavior, scriptName:string) => {
                    if(isExecOnlyOnce && self._isScriptExecuted(scriptName, method)){
                        return;
                    }

                    script[method] && script[method](arg);

                    self._addToScriptExecuteHistory(scriptName, method);
                });
            }
        }

        public execEventScript(method:string, arg?:any){
            this._scriptList.forEach((script:IEventScriptBehavior) => {
                script[method] && (arg ? script[method](arg) : script[method]());
            });
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
            EventManager.on(<any>EngineEvent.STARTLOOP, this.startLoopHandler);
        }

        @virtual
        protected bindEndLoopEvent(){
            EventManager.on(<any>EngineEvent.ENDLOOP, this.endLoopHandler);
        }

        @virtual
        protected getRenderList(){
            if(this.children.getCount() > 100){
                console.log(this.children.getCount());
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
            return this.getComponent<Animation>(Animation);
        }

        @require(function(){
            assert(this.getComponentCount(RendererComponent) <= 1, Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 rendererComponent"));
        })
        private _getRendererComponent():RendererComponent{
            return this.getComponent<RendererComponent>(RendererComponent);
        }

        @require(function(){
            assert(this.getComponentCount(Collider) <= 1, Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 collider component"));
        })
        private _getCollider():Collider{
            return this.getComponent<Collider>(Collider);
        }

        public getComponentCount(_class:Function){
            return this.components.filter((component:Component) => {
                return component instanceof _class;
            }).getCount();
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
    }
}
