module wd {
    export abstract class EntityObject extends Entity{
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

            // this._componentChangeSubscription = EventManager.fromEvent(this, <any>EEngineEvent.COMPONENT_CHANGE)
            //     .subscribe(() => {
            //         self._onComponentChange();
            //     });

            this.componentManager.init();
            this._entityObjectManager.init();

            this.afterInitChildren();

            // ScriptComponentContainer.getInstance().execEntityObjectScriptOnlyOnce(this, "init");

            return this;
        }

        // public dispose() {
        //     // this.onDispose();
        //
        //     if(this.parent){
        //         this.parent.removeChild(this);
        //         this.parent = null;
        //     }
        //
        //     // EventManager.off(this);
        //
        //     // this._componentChangeSubscription && this._componentChangeSubscription.dispose();
        //
        //     this.componentManager.dispose();
        //     this._entityObjectManager.dispose();
        //
        //     // EventManager.off(this);
        // }

        public hasChild(child:EntityObject):boolean {
            return this._entityObjectManager.hasChild(child);
        }

        public addChild(child:EntityObject):EntityObject {
            this._entityObjectManager.addChild(child);

            return this;
        }

        public getChildren(){
            return this._entityObjectManager.getChildren();
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
            return this.componentManager.getComponent<T>(_class);
        }

        public addComponent(component:Component, isShareComponent:boolean = false){
            this.componentManager.addComponent(component, isShareComponent);

            this.componentDirty = true;

            return this;
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

