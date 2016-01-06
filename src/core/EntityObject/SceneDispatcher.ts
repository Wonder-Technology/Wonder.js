module wd {
    export class SceneDispatcher extends EntityObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        /*!
         use gameObjectScene->scriptList as scene->scriptList
         */
        get scriptList(){
            return this._gameObjectScene.scriptList;
        }

        /*!
         use gameObjectScene->actionManager as scene->actionManager
         */
        get actionManager(){
            return this._gameObjectScene.actionManager;
        }

        get ambientLight():GameObject {
            return this._gameObjectScene.ambientLight;
        }
        
        get directionLights(): wdCb.Collection<GameObject>{
            return this._gameObjectScene.directionLights;
        }
        
        get pointLights(): wdCb.Collection<GameObject>{
            return this._gameObjectScene.pointLights;
        }
        
        get side(){
            return this._gameObjectScene.side;
        }
        set side(side:Side){
            this._gameObjectScene.side = side;
        }
        
        get shadowMap(){
            return this._gameObjectScene.shadowMap;
        }
        set shadowMap(shadowMap:any){
            this._gameObjectScene.shadowMap = shadowMap;
        }

        get shader(){
            return this._gameObjectScene.shader;
        }
        set shader(shader:Shader){
            this._gameObjectScene.shader = shader;
        }

        get camera(){
            return this._gameObjectScene.camera;
        }
        set camera(camera:GameObject){
            this._gameObjectScene.camera = camera;
        }

        get isUseProgram(){
            return this._gameObjectScene.isUseProgram;
        }
        set isUseProgram(isUseProgram:boolean){
            this._gameObjectScene.isUseProgram = isUseProgram;
        }

        get physics(){
            return this._gameObjectScene.physics;
        }
        set physics(physics:PhysicsConfig){
            this._gameObjectScene.physics = physics;
        }

        get physicsEngineAdapter(){
            return this._gameObjectScene.physicsEngineAdapter;
        }
        set physicsEngineAdapter(physicsEngineAdapter:IPhysicsEngineAdapter){
            this._gameObjectScene.physicsEngineAdapter = physicsEngineAdapter;
        }


        public name:string = `scene${String(this.uid)}`;

        public uiObjectScene:UIObjectScene = UIObjectScene.create();

        private _gameObjectScene:GameObjectScene = GameObjectScene.create();

        public init(){
            this._gameObjectScene.init();
            this.uiObjectScene.init();

            return this;
        }

        public useProgram(shader:Shader){
            this._gameObjectScene.useProgram(shader);
        }

        public unUseProgram(){
            this._gameObjectScene.unUseProgram();
        }

        public addChild(child:EntityObject):EntityObject{
            if(child instanceof GameObject){
                return this._gameObjectScene.addChild(child);
            }
            else if(child instanceof UIObject){
                return this.uiObjectScene.addChild(child);
            }
        }

        public addRenderTargetRenderer(renderTargetRenderer:RenderTargetRenderer){
            return this._gameObjectScene.addRenderTargetRenderer(renderTargetRenderer);
        }

        public removeRenderTargetRenderer(renderTargetRenderer:RenderTargetRenderer){
            this._gameObjectScene.removeRenderTargetRenderer(renderTargetRenderer);
        }

        public update(elapsedTime:number){
            this._gameObjectScene.update(elapsedTime);
            this.uiObjectScene.update(elapsedTime);
        }

        public render(renderer:Renderer) {
            this._gameObjectScene.render(renderer);
        }

        public dispose(){
            this._gameObjectScene.dispose();
            this.uiObjectScene.dispose();
        }

        public hasChild(child:EntityObject):boolean {
            if(child instanceof GameObject){
                return this._gameObjectScene.hasChild(child);
            }
            else if(child instanceof UIObject){
                return this.uiObjectScene.hasChild(child);
            }
        }

        public addChildren(children:EntityObject);
        public addChildren(children:Array<EntityObject>);
        public addChildren(children:wdCb.Collection<EntityObject>);

        public addChildren(...args) {
            if(args[0] instanceof EntityObject){
                let child:EntityObject = <EntityObject>args[0];

                this.addChild(child);
            }
            if(args[0] instanceof wdCb.Collection){
                let children:wdCb.Collection<EntityObject> = <wdCb.Collection<EntityObject>>args[0],
                    self = this;

                children.forEach((child:EntityObject) => {
                    self.addChild(child);
                });
            }
            else if(JudgeUtils.isArray(args[0])){
                let children:Array<EntityObject> = <Array<EntityObject>>args[0];

                for(let child of children){
                    this.addChild(child);
                }
            }

            return this;
        }

        public forEach(func:(gameObjcet:EntityObject) => void){
            this._gameObjectScene.forEach(func);

            return this;
        }

        public filter(func:(gameObjcet:EntityObject) => boolean){
            return this._gameObjectScene.filter(func);
        }

        public getChildren(){
            return this._gameObjectScene.getChildren();
        }

        public getChild(index:number){
            return this._gameObjectScene.getChild(index);
        }

        public findChildByUid(uid:number){
            return this._gameObjectScene.findChildByUid(uid);
        }

        public findChildByTag(tag:string){
            return this._gameObjectScene.findChildByTag(tag);
        }

        public findChildByName(name:string){
            return this._gameObjectScene.findChildByName(name);
        }

        public findChildrenByName(name:string):wdCb.Collection<EntityObject>{
            return this._gameObjectScene.findChildrenByName(name);
        }

        public removeChild(child:EntityObject):EntityObject {
            if(child instanceof GameObject){
                return this._gameObjectScene.removeChild(child);
            }
            else if(child instanceof UIObject){
                return this.uiObjectScene.removeChild(child);
            }
        }

        public getComponent<T>(_class:Function):T{
                return this._gameObjectScene.getComponent<T>(_class);
        }

        public findComponentByUid(uid:number){
            return this._gameObjectScene.findComponentByUid(uid);
        }

        public getFirstComponent():Component {
            return this._gameObjectScene.getFirstComponent();
        }

        public forEachComponent(func:(component:Component) => void){
            this._gameObjectScene.forEachComponent(func);

            return this;
        }

        public hasComponent(component:Component):boolean;
        public hasComponent(_class:Function):boolean;

        public hasComponent(...args){
            return this._gameObjectScene.hasComponent(args[0]);
        }

        public addComponent(component:Component){
            this._gameObjectScene.addComponent(component);

            return this;
        }

        public removeComponent(component:Component);
        public removeComponent(_class:Function);

        public removeComponent(...args){
            this._gameObjectScene.removeComponent(args[0]);

            return this;
        }

        public removeAllComponent(){
            return this._gameObjectScene.removeAllComponent();
        }

        public onStartLoop() {
            this._gameObjectScene.onStartLoop();
            this.uiObjectScene.onStartLoop();
        }

        public onEndLoop() {
            this._gameObjectScene.onEndLoop();
            this.uiObjectScene.onEndLoop();
        }

        public onEnter() {
            this._gameObjectScene.onEnter();
            this.uiObjectScene.onEnter();
        }

        public onExit() {
            this._gameObjectScene.onExit();
            this.uiObjectScene.onExit();
        }

        public onDispose(){
            this._gameObjectScene.onDispose();
            this.uiObjectScene.onDispose();
        }

        protected createTransform(){
            return null;
        }
    }
}

