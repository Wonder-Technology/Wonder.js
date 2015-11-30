/// <reference path="../filePath.d.ts"/>
module dy {
    //todo add copy method(refer to unity:  http://docs.unity3d.com/ScriptReference/Object.Instantiate.html)
    export class GameObject extends Entity{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _script:wdCb.Hash<IScriptBehavior> = wdCb.Hash.create<IScriptBehavior>();
        get script(){
            return this._script;
        }

        public parent:GameObject = null;
        public bubbleParent:GameObject = null;
        public transform:Transform = Transform.create(this);
        public name:string = "gameObject" + String(this.uid);
        public actionManager:ActionManager = ActionManager.create();

        private _children:wdCb.Collection<GameObject> = wdCb.Collection.create<GameObject>();
        private _components:wdCb.Collection<any> = wdCb.Collection.create<any>();
        private _startLoopHandler:() => void = null;
        private _endLoopHandler:() => void = null;

        public init() {
            var self = this;

            this._startLoopHandler = wdCb.FunctionUtils.bind(this, () => {
               this.onStartLoop();
            });
            this._endLoopHandler = wdCb.FunctionUtils.bind(this, () => {
                this.onEndLoop();
            });

            /*! global event should add "dy_" prefix */
            EventManager.on(<any>EngineEvent.STARTLOOP, this._startLoopHandler);
            EventManager.on(<any>EngineEvent.ENDLOOP, this._endLoopHandler);

            this._components.forEach((component:Component) => {
                component.init();
            });

            this._execScript("init");

            this.forEach((child:GameObject) => {
                child.init();
            });

            return this;
        }

        public onStartLoop() {
            this._execScript("onStartLoop");
        }

        public onEndLoop() {
            this._execScript("onEndLoop");
        }

        public onEnter() {
            this._execScript("onEnter");
        }

        public onExit() {
            this._execScript("onExit");
        }

        public onDispose(){
            this._execScript("onDispose");
        }

        //todo test in memory management
        public dispose() {
            this._execScript("onDispose");

            if(this.parent){
                this.parent.removeChild(this);
                this.parent = null;
            }

            EventManager.off(this);

            EventManager.off(<any>EngineEvent.STARTLOOP, this._startLoopHandler);
            EventManager.off(<any>EngineEvent.ENDLOOP, this._endLoopHandler);

            this._components.forEach((component:Component) => {
                component.dispose();
            });

            this.forEach((child:GameObject) => {
                child.dispose();
            });
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
            because WebGLRenderer enable depth test, it will sort when needed(just as WebGLRenderer->renderSortedTransparentCommands sort the commands)
             */

            ///*!
            //sort when add child/children, not when get children.
            //because each loop will get children(to render), so if using the latter, each loop should sort!
            // */
            //this.sort();
            //}
            //child.parent = this;
            //child.setBubbleParent(this);
            //child.transform.dirty = true;
            //child.dispatchEvent(new CoreEvent('add', false));
            //this.dispatchEvent(new CoreEvent('childadd', false, {
            //    child: child
            //}));


            //child.init();
            child.onEnter();

            return this;
        }

        public addChildren(children:Array<GameObject>);
        public addChildren(children:wdCb.Collection<GameObject>);

        public addChildren(...args) {
            this._children.addChildren(args[0]);

            return this;
        }

        public sort(){
            this._children = this._children.sort(this._ascendZ);

            return this;
        }

        public forEach(func:Function){
            this._children.forEach(func);

            return this;
        }

        public getChildren(){
            return this._children;
        }

        public getChild(index:number){
            return this._children.getChild(index);
        }

        public findChildByUid(uid:number){
            return this._children.findOne((child:GameObject) => {
                return child.uid === uid;
            });
        }

        public findChildByName(name:string){
            return this._children.findOne((child:GameObject) => {
                return child.name.search(name) > -1;
            });
        }

        public findChildrenByName(name:string):wdCb.Collection<GameObject>{
            return this._children.filter((child:GameObject) => {
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

        public removeChild(child:GameObject):GameObject {
            child.onExit();

            this._children.removeChild(child);

            child.parent = null;
            //child.setBubbleParent(null);



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
        //    var parent = this.parent;
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
                    return wdCb.$BREAK;
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
            var collider = this._getCollider();

            return collider? collider.collideXY(locationInView.x, locationInView.y) : false;
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
            //component.init();

            component.addToGameObject(this);

            return this;
        }

        public removeComponent(component:Component){
            this._components.removeChild(component);

            component.removeFromGameObject(this);

            return this;
        }

        //visit(renderer:rendering.Renderer, parentTransform:Transform, transformDirty:boolean, visibleFlag:boolean) {
        public render(renderer:Renderer, camera:GameObject):void {
            //var i, len;
            //if(!this._active || !this._initialized || this._destroyed) {
            //    if(transformDirty) {
            //        this.transform.dirty = true;
            //    }
            //    return;
            //}
            //if(this.transform.dirty) {
            //    transformDirty = transformDirty || this.transform.dirty;
            //}
            //if(transformDirty) {
            //    if(this.transform instanceof RectTransform) {
            //        this.transform.transform(this._scene.viewRectTransform, parentTransform);
            //    } else {
            //        this.transform.transform(this._scene.rootTransform, parentTransform);
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
            //    this._children[i].visit(renderer, this.transform, transformDirty, visibleFlag);
            //}

            var geometry = this._getGeometry(),
                rendererComponent = this._getRendererComponent();

            if(rendererComponent && geometry){
                rendererComponent.render(renderer, geometry,  camera);
            }

            this._children.forEach((child:GameObject) => {
                child.render(renderer, camera);
            });
        }

        public update(time:number):void {
            var camera = this._getCamera(),
                animation = this._getAnimation();

            if(camera){
                camera.update(time);
            }

            if(animation){
                animation.update(time);
            }

            this.actionManager.update(time);

            this._execScript("update", time);

            this._children.forEach((child:GameObject) => {
                child.update(time);
            });
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

        @require(function(){
            assert(this._getComponentCount(Geometry) <= 1, Log.info.FUNC_SHOULD_NOT("gameObject", "contain more than 1 geometry component"));
        })
        private _getGeometry():Geometry{
            return this.getComponent<Geometry>(Geometry);
        }

        @require(function(){
            assert(this._getComponentCount(Collider) <= 1, Log.info.FUNC_SHOULD_NOT("gameObject", "contain more than 1 collider component"));
        })
        private _getCollider():Collider{
            return this.getComponent<Collider>(Collider);
        }

        @require(function(){
            assert(this._getComponentCount(CameraController) <= 1, Log.info.FUNC_SHOULD_NOT("gameObject", "contain more than 1 camera controller"));
        })
        private _getCamera():CameraController{
            return this.getComponent<CameraController>(CameraController);
        }

        @require(function(){
            assert(this._getComponentCount(Animation) <= 1, Log.info.FUNC_SHOULD_NOT("gameObject", "contain more than 1 animation component"));
        })
        private _getAnimation():Animation{
            return this.getComponent<Animation>(Animation);
        }

        @require(function(){
            assert(this._getComponentCount(RendererComponent) <= 1, Log.info.FUNC_SHOULD_NOT("gameObject", "contain more than 1 rendererComponent"));
        })
        private _getRendererComponent():RendererComponent{
            return this.getComponent<RendererComponent>(RendererComponent);
        }

        private _getComponentCount(_class:Function){
            return this._components.filter((component:Component) => {
                return component instanceof _class;
            }).getCount();
        }
    }
}
