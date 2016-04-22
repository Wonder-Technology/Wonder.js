module wd{
    export class ComponentManager{
        public static create(entityObject:EntityObject) {
        	var obj = new this(entityObject);

        	return obj;
        }

        constructor(entityObject:EntityObject){
            this._entityObject = entityObject;
        }

        public transform:Transform = null;

        private _entityObject:EntityObject = null;
        private _components:wdCb.Collection<any> = wdCb.Collection.create<any>();
        private _rendererComponent:RendererComponent = null;
        private _animation:Animation = null;
        private _collider:Collider = null;
        private _geometry:Geometry = null;

        public initComponent(){
            this._components.insertSort((a:Component, b:Component) => {
                    return ComponentInitOrderTable.getOrder(a) < ComponentInitOrderTable.getOrder(b);
                }, false)
                .forEach((component:Component) => {
                    component.init();
                });
        }

        public dispose(){
            var components = this.removeAllComponent();

            components.forEach((component:Component) => {
                component.dispose();
            });

            this._components.removeAllChildren();
        }

        public removeAllComponent(){
            var result = wdCb.Collection.create<Component>();

            this._components.forEach((component:Component) => {
                this._removeComponentHandler(component);

                result.addChild(component)
            }, this);

            //this._componentDirty = true;

            return result;
        }

        public getComponent<T>(_class:any):T{
            return this._components.findOne((component:Component) => {
                return component instanceof _class;
            });
        }

        public getAllComponent(){
            return this._components;
        }

        public findComponentByUid(uid:number){
            return this._components.findOne((component:Component) => {
                return component.uid === uid;
            });
        }

        public forEachComponent(func:(component:Component) => void){
            this._components.forEach(func);

            return this;
        }

        public hasComponent(component:Component):boolean;
        public hasComponent(_class:Function):boolean;

        public hasComponent(...args){
            var result:boolean = null;

            if(JudgeUtils.isComponenet(args[0])){
                let component = args[0];

                result = this._components.hasChild(component);
            }
            else{
                let _class = args[0];

                result = this._components.hasChildWithFunc((component) => {
                    return component instanceof _class;
                });
            }

            return result;
        }

        @require(function(component:Component, isShareComponent:boolean = false){
            if(!component){
                return;
            }

            assert(!this.hasComponent(component), Log.info.FUNC_EXIST("the component", ", please judge whether it hasComponent(component) before addComponent(component)"));
        })
        public addComponent(component:Component, isShareComponent:boolean = false){
            if(!component){
                return;
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
            else if(component instanceof Geometry){
                this._geometry = component;
            }
            else if(component instanceof Transform){
                if(this.transform){
                    this.removeComponent(this.transform);
                }

                this.transform = component;
            }

            component.addToObject(this._entityObject, isShareComponent);

            this._components.addChild(component);

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

            this._components.removeChild(component);

            this._removeComponentHandler(component);

            //this._componentDirty = true;

            return this;
        }

        public getComponentCount(_class:Function){
            return this._components.filter((component:Component) => {
                return component instanceof _class;
            }).getCount();
        }

        @require(function(){
            assert(this.getComponentCount(Geometry) <= 1, Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 geometry component"));
        })
        public getGeometry():Geometry{
            return this._geometry;
        }

        @require(function(){
            assert(this.getComponentCount(Animation) <= 1, Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 animation component"));
        })
        public getAnimation():Animation{
            return this._animation;
        }

        @require(function(){
            assert(this.getComponentCount(RendererComponent) <= 1, Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 rendererComponent"));
        })
        public getRendererComponent():RendererComponent{
            return this._rendererComponent;
        }

        @require(function(){
            assert(this.getComponentCount(Collider) <= 1, Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 collider component"));
        })
        public getCollider():Collider{
            return this._collider;
        }

        private _removeComponentHandler(component:Component){
            component.removeFromObject(this._entityObject);
        }
    }
}
