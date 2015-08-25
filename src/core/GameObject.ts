/// <reference path="../definitions.d.ts"/>
module dy {
    export class GameObject extends Entity{
        public static create(...args) {
        	var obj = new this();

        	return obj;
        }

        private _parent:GameObject = null;
        get parent() {
            return this._parent;
        }

        set parent(parent:GameObject) {
            this._parent = parent;
        }
        
        private _bubbleParent:GameObject = null;
        get bubbleParent(){
            return this._bubbleParent;
        }
        set bubbleParent(bubbleParent:GameObject){
            this._bubbleParent = bubbleParent;
        }
        
        private _transform:Transform = Transform.create(this);
        get transform(){
            return this._transform;
        }
        set transform(transform:Transform){
            this._transform = transform;
        }

        private _renderer:Renderer = null;
        get renderer(){
            return this._renderer;
        }
        set renderer(renderer:Renderer){
            this._renderer = renderer;
        }

        private _name:string = "gameObject" + String(this.uid);
        get name(){
            return this._name;
        }
        set name(name:string){
            this._name = name;
        }

        private _script:dyCb.Hash<IScriptBehavior> = dyCb.Hash.create<IScriptBehavior>();
        get script(){
            return this._script;
        }

        private _scriptStreams:dyCb.Collection<dyRt.Stream> = dyCb.Collection.create<dyRt.Stream>();
        get scriptStreams():dyRt.Stream{
            return dyRt.fromCollection(this._scriptStreams).mergeAll();
        }

        private _collider:Collider = null;
        private _children:dyCb.Collection<GameObject> = dyCb.Collection.create<GameObject>();
        private _components:dyCb.Collection<any> = dyCb.Collection.create<any>();
        private _actionManager:ActionManager = ActionManager.create();
        private _behaviors:dyCb.Collection<Behavior> = dyCb.Collection.create<Behavior>();

        public init() {
            this._execScript("init");
        }

        public onEnter() {
            this._execScript("onEnter");
        }

        public onStartLoop() {
            this._execScript("onStartLoop");
        }

        public onEndLoop() {
            this._execScript("onEndLoop");
        }

        public onExit() {
            this._execScript("onExit");
        }

        public dispose() {
            this.onExit();

            if(this._parent){
                this._parent.removeChild(this);
                this._parent = null;
            }

            EventManager.off(this);
        }

        public hasChild(child:GameObject):boolean {
            return this._children.hasChild(child);
        }

        //public addChild(child:GameObject, sort:boolean=true):boolean {
        public addChild(child:GameObject):GameObject {
            //need user judge it!
            //if(this._children.hasChild(child)) {
            //    return false;
            //}

            if (child.parent) {
                //will remove bind event,remove from parent ...
                //child.removeMe();
                child.parent.removeChild(child);
            }

            child.parent = this;
            child.transform.parent = this.transform;

            //child.dispatchEvent(new CoreEvent('beforeadd', false, {
            //    parent: this
            //}));


            this._children.addChild(child);

            //if(sort) {

            /*!
            no need to sort!
            because WebGLRenderer enable depth test, it will sort when needed(just as WebGLRenderer->_renderSortedTransparentCommands sort the commands)
             */

            ///*!
            //sort when add child/children, not when get children.
            //because each loop will get children(to render), so if using the latter, each loop should sort!
            // */
            //this.sort();
            //}
            //child._parent = this;
            //child.setBubbleParent(this);
            //child._transform.dirty = true;
            //child.dispatchEvent(new CoreEvent('add', false));
            //this.dispatchEvent(new CoreEvent('childadd', false, {
            //    child: child
            //}));


            //child.init();
            //child.onEnter();

            return this;
        }

        public getChildren(){
            return this._children;
        }

        public sort(){
            this._children = this._children.sort(this._ascendZ);

            return this;
        }

        public forEach(func:Function){
            this._children.forEach(func);

            return this;
        }

        public removeChild(child:GameObject):GameObject {
            this._children.removeChild(child);

            child.parent = null;
            //child.setBubbleParent(null);

            child.dispose();
            //var idx = this._children.indexOf(child);
            //if(idx !== -1) {
            //    child.dispatchEvent(new CoreEvent('beforeremove', false));
            //    this._children.splice(idx, 1);

            //child.dispose();

            //child.setBubbleParent(null);
            //    child.dispatchEvent(new CoreEvent('remove', false, {
            //        parent: this
            //    }));
            //    this.dispatchEvent(new CoreEvent('childremove', false, {
            //        child: child
            //    }));
            //    return true;
            //}
            //return false;


            return this;
        }

        ///**
        // * remove this game object from parent.
        // * @returns {boolean}
        // */
        //public removeMe():GameObject {
        //    var parent = this._parent;
        //
        //    parent && parent.removeChild(this);
        //
        //    return this;
        //}

        public getTopUnderPoint(point:Point):GameObject {
            //var found, localP, child;
            //var childrenArr;
            //if(!this._active || !this._visible) return null;
            //if(this._interactiveRect) {
            //    localP = this.transform.globalToLocal(x, y);
            //    if(!this._interactiveRect.containsXY(localP.x, localP.y)) {
            //        return null;
            //    }
            //}
            //childrenArr = this._children;
            //if(childrenArr.length > 0) {
            //    for(var i=childrenArr.length-1; i>=0; i--) {
            //        child = childrenArr[i];
            //        found = child.getUnderPoint(x, y, touchable);
            //        if(found) {
            //            return found;
            //        }
            //    }
            //}
            //
            //if(!touchable || this._touchable) {
            //    if(!localP) {
            //        localP = this.transform.globalToLocal(x, y);
            //    }
            //    if(this.testHit(localP.x, localP.y)) {
            //        return this;
            //    }
            //}
            //return null;

            //todo judge position.z?
            var result = null;

            this._children.copy().reverse().forEach((child:GameObject) => {
                result = child.getTopUnderPoint(point);

                if (result) {
                    return dyCb.$BREAK;
                }
            });

            if(result){
                return result;
            }

            if(this.isHit(point)) {
                return this;
            }

            return null;
        }

        public isHit(locationInView:Point):boolean {
            return this._collider ? this._collider.collideXY(locationInView.x, locationInView.y) : false;
        }

        public hasComponent(component:Component):boolean;
        public hasComponent(_class:Function):boolean;

        public hasComponent(args){
            if(arguments[0] instanceof Component){
                let component = arguments[0];

                return this._components.hasChild(component);
            }
            else{
                let _class = arguments[0];

                return this._components.hasChild((component) => {
                    return component instanceof _class;
                })
            }
        }

        public getComponent<T>(_class:Function):T{
            return this._components.filter((component) => {
                return component instanceof _class;
            }).getChild(0);
        }

        public addComponent(component:Component){
            var Log = dyCb.Log;

            if(this.hasComponent(component)){
                Log.assert(false, "the component already exist");
                return this;
            }

            if(component.gameObject) {
                component.gameObject.removeComponent(component);
            }
            component.gameObject = this;


            this._components.addChild(component);
            component.init();

            if(component instanceof Behavior){
                if(component instanceof Action) {
                    let action = <Action>component;

                    action.target = this;
                    this._actionManager.addChild(action);
                }
                else{
                    let behavior = <Behavior>component;

                    this._behaviors.addChild(behavior);
                }
            }
            else if(component instanceof Renderer) {
                Log.assert(!this._renderer, "renderer is overwrite");

                this._renderer = <Renderer>component;
            }
            else if(component instanceof Collider) {
                Log.assert(!this._renderer, "collider is overwrite");

                this._collider = <Collider>component;
            }
            else if(component instanceof Script){
                let script = <Script>component,
                    self = this;

                this._scriptStreams.addChild(script.createLoadJsStream()
                    .do((data:IScriptFileData) => {
                            self._script.addChild(data.name, new data.class(self));
                        })
                );
            }

            return this;
        }

        public removeComponent(component:Component){
            this._components.removeChild(component);

            if(component instanceof Behavior){
                if(component instanceof Action) {
                    this._actionManager.removeChild(component);
                }
                else{
                    this._behaviors.removeChild(component);
                }
            }
            else if(component instanceof Renderer) {
                this._renderer = null;
            }
            else if(component instanceof Collider) {
                this._collider = null;
            }

            component.gameObject = null;

            return this;
        }

        //visit(renderer:rendering.Renderer, parentTransform:Transform, transformDirty:boolean, visibleFlag:boolean) {
        public render(renderer:render.Renderer, camera:GameObject):void{
            //var i, len;
            //if(!this._active || !this._initialized || this._destroyed) {
            //    if(transformDirty) {
            //        this._transform.dirty = true;
            //    }
            //    return;
            //}
            //if(this._transform.dirty) {
            //    transformDirty = transformDirty || this._transform.dirty;
            //}
            //if(transformDirty) {
            //    if(this._transform instanceof RectTransform) {
            //        this._transform.transform(this._stage.viewRectTransform, parentTransform);
            //    } else {
            //        this._transform.transform(this._stage.rootTransform, parentTransform);
            //    }
            //}
            //
            //if(!this._visible) {
            //    visibleFlag = visibleFlag && this._visible;
            //}
            //
            //if(visibleFlag) {
            //    this.render(renderer, transformDirty);
            //}
            //
            //for(i=0,len=this._children.length; i<len; i++) {
            //    this._children[i].visit(renderer, this._transform, transformDirty, visibleFlag);
            //}

            this._renderer && this._renderer.render(renderer, this.getComponent<Geometry>(Geometry),  camera);

            this._children.forEach((child:GameObject) => {
                child.render(renderer, camera);
            });
        }

        public update(time:number):void {
            this._behaviors.forEach((behavior:Behavior) => {
                behavior.update(time);
            });
            this._actionManager.update(time);

            this._children.forEach((child:GameObject) => {
                child.update(time);
            });

            this._execScript("update", time);
        }

        private _ascendZ(a:GameObject, b:GameObject){
                //return b.transform.position.z - a.transform.position.z;
            return a.transform.position.z - b.transform.position.z;
        }

        private _execScript(method:string, arg?:any){
            this._script.forEach((script:IScriptBehavior) => {
                script[method] && (arg ? script[method](arg) : script[method]());
            });
        }
    }
}
