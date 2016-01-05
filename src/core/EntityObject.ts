/// <reference path="../filePath.d.ts"/>
module wd {
    //todo add copy method
    export abstract class EntityObject extends Entity{
        private _scripts:wdCb.Hash<IScriptBehavior> = wdCb.Hash.create<IScriptBehavior>();
        get script(){
            return this._scripts;
        }

        public name:string = null;
        public transform:any = null;
        public parent:EntityObject = null;
        public bubbleParent:EntityObject = null;
        public actionManager:ActionManager = ActionManager.create();

        protected children:wdCb.Collection<any> = wdCb.Collection.create<any>();;

        private _components:wdCb.Collection<any> = wdCb.Collection.create<any>();
        private _startLoopHandler:() => void = null;
        private _endLoopHandler:() => void = null;

        public init() {
            this._startLoopHandler = wdCb.FunctionUtils.bind(this, () => {
                this.onStartLoop();
            });
            this._endLoopHandler = wdCb.FunctionUtils.bind(this, () => {
                this.onEndLoop();
            });

            EventManager.on(<any>EngineEvent.STARTLOOP, this._startLoopHandler);
            EventManager.on(<any>EngineEvent.ENDLOOP, this._endLoopHandler);

            this._components.forEach((component:Component) => {
                component.init();
            });

            this.transform.init();

            this.execScript("init");

            this.forEach((child:EntityObject) => {
                child.init();
            });

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
        }

        public onExit() {
            this.execScript("onExit");
        }

        public onDispose(){
            this.execScript("onDispose");
        }

        //todo test memory management
        public dispose() {
            var components = null;

            this.onDispose();

            if(this.parent){
                this.parent.removeChild(this);
                this.parent = null;
            }

            EventManager.off(this);

            EventManager.off(<any>EngineEvent.STARTLOOP, this._startLoopHandler);
            EventManager.off(<any>EngineEvent.ENDLOOP, this._endLoopHandler);

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

        public addChildren(children:Array<EntityObject>);
        public addChildren(children:wdCb.Collection<EntityObject>);

        public addChildren(...args) {
            this.children.addChildren(args[0]);

            return this;
        }

        public forEach(func:(gameObjcet:EntityObject) => void){
            this.children.forEach(func);

            return this;
        }

        public filter(func:(gameObjcet:EntityObject) => boolean){
            return this.children.filter(func);
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
            return this._components.findOne((component:Component) => {
                return component instanceof _class;
            });
        }

        public findComponentByUid(uid:number){
            return this._components.findOne((component:Component) => {
                return component.uid === uid;
            });
        }

        public getFirstComponent():Component {
            return this._components.getChild(0);
        }

        public forEachComponent(func:(component:Component) => void){
            this._components.forEach(func);

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

                return this._components.hasChild(component);
            }
            else{
                let _class = args[0];

                return this._components.hasChild((component) => {
                    return component instanceof _class;
                })
            }
        }

        public addComponent(component:Component){
            if(this.hasComponent(component)){
                Log.assert(false, "the component already exist");
                return this;
            }

            this._components.addChild(component);

            component.addToObject(this);

            return this;
        }

        public removeComponent(component:Component);
        public removeComponent(_class:Function);

        public removeComponent(arg){
            var component:Component = null;

            if(arg instanceof Component){
                component = <Component>arg;
            }
            else{
                component = this.getComponent<any>(<Function>arg);
            }

            this._components.removeChild(component);

            this._removeComponentHandler(component);

            return this;
        }

        public removeAllComponent(){
            var result = wdCb.Collection.create<Component>();

            this._components.forEach((component:Component) => {
                this._removeComponentHandler(component);

                result.addChild(component)
            }, this);

            this._components.removeAllChildren();

            return result;
        }

        public render(renderer:Renderer, camera:GameObject):void {
            var geometry = this._getGeometry(),
                rendererComponent = this._getRendererComponent();

            if(rendererComponent && geometry){
                rendererComponent.render(renderer, geometry,  camera);
            }

            this.children.forEach((child:EntityObject) => {
                child.render(renderer, camera);
            });
        }

        public update(elapsedTime:number):void {
            var camera = this._getCamera(),
                animation = this._getAnimation(),
                collider = this._getCollider();


            if(camera){
                camera.update(elapsedTime);
            }

            if(animation){
                animation.update(elapsedTime);
            }

            this.actionManager.update(elapsedTime);

            this.execScript("update", elapsedTime);

            if(collider){
                collider.update(elapsedTime);
            }

            this.beforeUpdateChildren(elapsedTime);

            this.children.forEach((child:EntityObject) => {
                child.update(elapsedTime);
            });
        }

        public execScript(method:string, arg?:any){
            this._scripts.forEach((script:IScriptBehavior) => {
                script[method] && (arg ? script[method](arg) : script[method]());
            });
        }

        @virtual
        protected beforeUpdateChildren(elapsedTime:number){
        }

        @require(function(){
            assert(this._getComponentCount(Geometry) <= 1, Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 geometry component"));
        })
        private _getGeometry():Geometry{
            return this.getComponent<Geometry>(Geometry);
        }

        @require(function(){
            assert(this._getComponentCount(CameraController) <= 1, Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 camera controller"));
        })
        private _getCamera():CameraController{
            return this.getComponent<CameraController>(CameraController);
        }

        @require(function(){
            assert(this._getComponentCount(Animation) <= 1, Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 animation component"));
        })
        private _getAnimation():Animation{
            return this.getComponent<Animation>(Animation);
        }

        @require(function(){
            assert(this._getComponentCount(RendererComponent) <= 1, Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 rendererComponent"));
        })
        private _getRendererComponent():RendererComponent{
            return this.getComponent<RendererComponent>(RendererComponent);
        }

        @require(function(){
            assert(this._getComponentCount(Collider) <= 1, Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 collider component"));
        })
        private _getCollider():Collider{
            return this.getComponent<Collider>(Collider);
        }

        private _getComponentCount(_class:Function){
            return this._components.filter((component:Component) => {
                return component instanceof _class;
            }).getCount();
        }

        private _removeComponentHandler(component:Component){
            component.removeFromObject(this);
        }
    }
}
