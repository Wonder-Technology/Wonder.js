module wd {
    export abstract class EntityObject extends Entity{
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
            return this.componentManager.transform;
        }

        @cloneAttributeAsBasicType()
        public name:string = null;
        @cloneAttributeAsBasicType()
        public parent:EntityObject = null;

        public customEventMap:wdCb.Hash<wdCb.Collection<CustomEventRegisterData>> = wdCb.Hash.create<wdCb.Collection<CustomEventRegisterData>>();
        public scriptManager:ScriptManager = ScriptManager.create(this);

        protected componentManager:ComponentManager = ComponentManager.create(this);

        private _hasComponentCache:wdCb.Hash<boolean> = wdCb.Hash.create<boolean>();
        private _getComponentCache:wdCb.Hash<boolean> = wdCb.Hash.create<boolean>();
        private _componentChangeSubscription:wdFrp.IDisposable = null;
        private _entityObjectManager:EntityObjectManager = EntityObjectManager.create(this);

        @virtual
        public initWhenCreate(){
            this.addComponent(this.createTransform());
        }

        @require(function(config:CloneEntityObjectConfigData = <any>{}){
            it("if has OneToManySourceInstance component, not support share geometry", () => {
                if(config.shareGeometry){
                    expect(this.hasComponent(OneToManySourceInstance)).false;
                }
            });
        })
        public clone(config:CloneEntityObjectConfigData = <any>{}){
            var result = null;

            if(CloneUtils.isNotClone((this))){
                return null;
            }

            config = wdCb.ExtendUtils.extend({
                cloneChildren:true,
                shareGeometry:false,
                cloneGeometry:true
            }, config);

            result = CloneUtils.clone<EntityObject>(this);

            this.forEachComponent((component:Component) => {
                if(!config.cloneGeometry && component instanceof Geometry){
                    return;
                }

                if(config.shareGeometry && component instanceof Geometry){
                    result.addComponent(component, true);
                    return;
                }

                result.addComponent(component.clone());
            });

            if(config.cloneChildren){
                this._cloneChildren(result);
            }

            return result;
        }

        public init() {
            var self = this;

            this._componentChangeSubscription = EventManager.fromEvent(this, <any>EEngineEvent.COMPONENT_CHANGE)
                .subscribe(() => {
                    self._onComponentChange();
                });

            this.componentManager.init();
            this._entityObjectManager.init();

            this.afterInitChildren();

            ScriptEngine.getInstance().execEntityObjectScriptOnlyOnce(this, "init");

            return this;
        }

        public onEnter() {
            ScriptEngine.getInstance().execEntityObjectScriptOnlyOnce(this, "onEnter");

            EventManager.trigger(this, CustomEvent.create(<any>EEngineEvent.ENTER));
        }

        public onExit() {
            ScriptEngine.getInstance().execEntityObjectScriptOnlyOnce(this, "onExit");

            EventManager.trigger(this, CustomEvent.create(<any>EEngineEvent.EXIT));
        }

        public onDispose(){
            ScriptEngine.getInstance().execEntityObjectScriptOnlyOnce(this, "onDispose");
        }

        public dispose() {
            this.onDispose();

            if(this.parent){
                this.parent.removeChild(this);
                this.parent = null;
            }

            EventManager.off(this);

            this._componentChangeSubscription && this._componentChangeSubscription.dispose();

            this.componentManager.dispose();
            this._entityObjectManager.dispose();

            EventManager.off(this);
        }

        public hasChild(child:EntityObject):boolean {
            return this._entityObjectManager.hasChild(child);
        }

        public addChild(child:EntityObject):EntityObject {
            this._entityObjectManager.addChild(child);

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

        public removeAllChildren(){
            this._entityObjectManager.removeAllChildren();
        }

        @cache(function(_class:any){
            return this._getComponentCache.hasChild(_class.name);
        }, function(_class:any){
            return this._getComponentCache.getChild(_class.name);
        }, function(result, _class:any){
            this._getComponentCache.addChild(_class.name, result);
        })
        public getComponent<T>(_class:any):T{
            return this.componentManager.getComponent<T>(_class);
        }

        public getComponents(){
            return this.componentManager.getComponents();
        }

        public findComponentByUid(uid:number){
            return this.componentManager.findComponentByUid(uid);
        }

        public forEachComponent(func:(component:Component) => void){
            this.componentManager.forEachComponent(func);

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

            result =  this.componentManager.hasComponent(args[0]);

            this._hasComponentCache.addChild(key, result);

            return result;
        }

        public addComponent(component:Component, isShareComponent:boolean = false){
            this.componentManager.addComponent(component, isShareComponent);

            this.componentDirty = true;

            return this;
        }

        public removeComponent(component:Component);
        public removeComponent(_class:Function);

        public removeComponent(...args){
            this.componentManager.removeComponent(args[0]);

            this.componentDirty = true;

            return this;
        }

        public removeAllComponent(){
            this.componentDirty = true;

            return this.componentManager.removeAllComponent();
        }

        public removeAllComponentFromEngine(){
            return this.componentManager.removeAllComponentFromEngine();
        }

        @virtual
        public render(renderer:Renderer, camera:GameObject):void {
            var rendererComponent = null;

            rendererComponent = this.componentManager.getRendererComponent();

            if(rendererComponent){
                rendererComponent.render(renderer, this, camera);
            }

            this.getRenderList().forEach((child:EntityObject) => {
                child.render(renderer, camera);
            });
        }

        public update(elapsed:number):void {
            this.forEach((child:EntityObject) => {
                child.update(elapsed);
            });
        }

        public getComponentCount(_class:Function){
            return this.componentManager.getComponentCount(_class);
        }

        public getAllChildren(){
            return this._entityObjectManager.getAllChildren();
        }

        @virtual
        public getGeometry(){
            return this.componentManager.getGeometry();
        }

        protected abstract createTransform():Transform;

        @virtual
        protected afterInitChildren(){
        }

        @virtual
        protected getRenderList(){
            return this.getChildren();
        }

        public clearCache(){
            this._hasComponentCache.removeAllChildren();
            this._getComponentCache.removeAllChildren();
        }

        @ensure(function(key:string){
            it(`key:${key} be string`, () => {
                expect(JudgeUtils.isString(key)).true;
            });
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

    export type CloneEntityObjectConfigData = {
        cloneChildren?:boolean;
        shareGeometry?:boolean;
        cloneGeometry?:boolean;
    }
}

