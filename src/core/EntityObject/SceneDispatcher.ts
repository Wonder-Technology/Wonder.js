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
            return this.gameObjectScene.scriptList;
        }

        /*!
         use gameObjectScene->actionManager as scene->actionManager
         */
        get actionManager(){
            return this.gameObjectScene.actionManager;
        }

        get ambientLight():GameObject {
            return this.gameObjectScene.ambientLight;
        }
        
        get directionLights(): wdCb.Collection<GameObject>{
            return this.gameObjectScene.directionLights;
        }
        
        get pointLights(): wdCb.Collection<GameObject>{
            return this.gameObjectScene.pointLights;
        }
        
        get side(){
            return this.gameObjectScene.side;
        }
        set side(side:Side){
            this.gameObjectScene.side = side;
        }
        
        get shadowMap(){
            return this.gameObjectScene.shadowMap;
        }
        set shadowMap(shadowMap:any){
            this.gameObjectScene.shadowMap = shadowMap;
        }

        get shader(){
            return this.gameObjectScene.shader;
        }
        set shader(shader:Shader){
            this.gameObjectScene.shader = shader;
        }

        get camera(){
            return this.gameObjectScene.camera;
        }
        set camera(camera:GameObject){
            this.gameObjectScene.camera = camera;
        }

        get isUseProgram(){
            return this.gameObjectScene.isUseProgram;
        }
        set isUseProgram(isUseProgram:boolean){
            this.gameObjectScene.isUseProgram = isUseProgram;
        }

        get physics(){
            return this.gameObjectScene.physics;
        }
        set physics(physics:PhysicsConfig){
            this.gameObjectScene.physics = physics;
        }

        get physicsEngineAdapter(){
            return this.gameObjectScene.physicsEngineAdapter;
        }
        set physicsEngineAdapter(physicsEngineAdapter:IPhysicsEngineAdapter){
            this.gameObjectScene.physicsEngineAdapter = physicsEngineAdapter;
        }


        public name:string = `scene${String(this.uid)}`;

        public uiObjectScene:UIObjectScene = UIObjectScene.create();
        public gameObjectScene:GameObjectScene = GameObjectScene.create();

        public useProgram(shader:Shader){
            this.gameObjectScene.useProgram(shader);
        }

        public unUseProgram(){
            this.gameObjectScene.unUseProgram();
        }

        public addChild(child:EntityObject):EntityObject{
            if(child instanceof GameObject){
                return this.gameObjectScene.addChild(child);
            }
            else if(child instanceof UIObject){
                return this.uiObjectScene.addChild(child);
            }
        }

        public addRenderTargetRenderer(renderTargetRenderer:RenderTargetRenderer){
            return this.gameObjectScene.addRenderTargetRenderer(renderTargetRenderer);
        }

        public removeRenderTargetRenderer(renderTargetRenderer:RenderTargetRenderer){
            this.gameObjectScene.removeRenderTargetRenderer(renderTargetRenderer);
        }

        public dispose(){
            this.gameObjectScene.dispose();
            this.uiObjectScene.dispose();
        }

        public hasChild(child:EntityObject):boolean {
            if(child instanceof GameObject){
                return this.gameObjectScene.hasChild(child);
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
            this.gameObjectScene.forEach(func);

            return this;
        }

        public filter(func:(gameObjcet:EntityObject) => boolean){
            return this.gameObjectScene.filter(func);
        }

        public getChildren(){
            return this.gameObjectScene.getChildren();
        }

        public getChild(index:number){
            return this.gameObjectScene.getChild(index);
        }

        public findChildByUid(uid:number){
            return this.gameObjectScene.findChildByUid(uid);
        }

        public findChildByTag(tag:string){
            return this.gameObjectScene.findChildByTag(tag);
        }

        public findChildByName(name:string){
            return this.gameObjectScene.findChildByName(name);
        }

        public findChildrenByName(name:string):wdCb.Collection<EntityObject>{
            return this.gameObjectScene.findChildrenByName(name);
        }

        public removeChild(child:EntityObject):EntityObject {
            if(child instanceof GameObject){
                return this.gameObjectScene.removeChild(child);
            }
            else if(child instanceof UIObject){
                return this.uiObjectScene.removeChild(child);
            }
        }

        public getComponent<T>(_class:Function):T{
                return this.gameObjectScene.getComponent<T>(_class);
        }

        public findComponentByUid(uid:number){
            return this.gameObjectScene.findComponentByUid(uid);
        }

        public getFirstComponent():Component {
            return this.gameObjectScene.getFirstComponent();
        }

        public forEachComponent(func:(component:Component) => void){
            this.gameObjectScene.forEachComponent(func);

            return this;
        }

        public hasComponent(component:Component):boolean;
        public hasComponent(_class:Function):boolean;

        public hasComponent(...args){
            return this.gameObjectScene.hasComponent(args[0]);
        }

        public addComponent(component:Component){
            this.gameObjectScene.addComponent(component);

            return this;
        }

        public removeComponent(component:Component);
        public removeComponent(_class:Function);

        public removeComponent(...args){
            this.gameObjectScene.removeComponent(args[0]);

            return this;
        }

        public removeAllComponent(){
            return this.gameObjectScene.removeAllComponent();
        }

        public onStartLoop() {
            this.gameObjectScene.onStartLoop();
            this.uiObjectScene.onStartLoop();
        }

        public onEndLoop() {
            this.gameObjectScene.onEndLoop();
            this.uiObjectScene.onEndLoop();
        }

        public onEnter() {
            this.gameObjectScene.onEnter();
            this.uiObjectScene.onEnter();
        }

        public onExit() {
            this.gameObjectScene.onExit();
            this.uiObjectScene.onExit();
        }

        public onDispose(){
            this.gameObjectScene.onDispose();
            this.uiObjectScene.onDispose();
        }

        protected createTransform(){
            return null;
        }
    }
}

