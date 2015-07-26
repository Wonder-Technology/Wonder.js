/// <reference path="../definitions.d.ts"/>
module dy{

    export class Director{
        private static _instance:Director = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        //todo :Renderer
        private _renderer:WebGLRenderer = null;
        get renderer(){
            return this._renderer;
        }
        set renderer(renderer:WebGLRenderer){
            this._renderer = renderer;
        }

        private _view:IView = null;
        get view(){
            return this._view;
        }
        set view(view:IView){
            this._view = view;
        }

        private _gl:any = null;
        get gl(){
            return this._gl;
        }
        set gl(gl:any){
            this._gl = gl;
        }

        private _scene:Scene = null;
        private _gameLoop:dyRt.IDisposable = null;

        public initWhenCreate(){
            //todo detect to decide using which renderer
            this._renderer = WebGLRenderer.create();
        }

        public runWithScene(scene:Scene) {
            scene.init();
            scene.onEnter();
            this._scene = scene;

            //todo not put here?
            this._renderer.init();

            this._startLoop();
        }

        public getView():IView{
            return this._view;
        }

        public getTopUnderPoint(point:Point):GameObject{
            if(!this._scene){
                return null;
            }

            return this._scene.getTopUnderPoint(point);
        }

        public createGL(canvasId:string){
            this._view = ViewWebGL.create(dyCb.DomQuery.create(canvasId).get(0));
            this._gl = this._view.getContext();
        }

        private _startLoop() {
            var self = this;

            this._gameLoop = dyRt.intervalRequest()
            .subscribe((time) => {
                    self._loopBody(time);
                });
        }

        //todo add tick mechanism
        private _loopBody(time) {
            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);

            this._scene.onStartLoop();

            this._scene.run();

            this._renderer.render(this._scene);

            this._scene.onEndLoop();
        }
    }
}
