/// <reference path="../definitions.d.ts"/>
module Engine3D{
    declare var window:any;
    /**
     * 来自《HTML5 Canvas 核心技术》
     * 不能写到global中，否则会报错“illegal invocation”！
     */
    window.requestNextAnimationFrame = (function () {
        var originalRequestAnimationFrame = undefined,
            wrapper = undefined,
            callback = undefined,
            geckoVersion = null,
            userAgent = navigator.userAgent,
            index = 0,
            self = this;

        wrapper = function (time) {
            time = +new Date();
            self.callback(time);
        };

        /*!
         bug!
         below code:
         when invoke b after 1s, will only invoke b, not invoke a!

         function a(time){
         console.log("a", time);
         webkitRequestAnimationFrame(a);
         }

         function b(time){
         console.log("b", time);
         webkitRequestAnimationFrame(b);
         }

         a();

         setTimeout(b, 1000);



         so use requestAnimationFrame priority!
         */
        if(window.requestAnimationFrame) {
            return requestAnimationFrame;
        }


        // Workaround for Chrome 10 bug where Chrome
        // does not pass the time to the animation function

        if (window.webkitRequestAnimationFrame) {
            // Define the wrapper

            // Make the switch

            originalRequestAnimationFrame = window.webkitRequestAnimationFrame;

            window.webkitRequestAnimationFrame = function (callback, element) {
                self.callback = callback;

                // Browser calls the wrapper and wrapper calls the callback

                return originalRequestAnimationFrame(wrapper, element);
            }
        }

        //修改time参数
        if (window.msRequestAnimationFrame) {
            originalRequestAnimationFrame = window.msRequestAnimationFrame;

            window.msRequestAnimationFrame = function (callback) {
                self.callback = callback;

                return originalRequestAnimationFrame(wrapper);
            }
        }

        // Workaround for Gecko 2.0, which has a bug in
        // mozRequestAnimationFrame() that restricts animations
        // to 30-40 fps.

        if (window.mozRequestAnimationFrame) {
            // Check the Gecko version. Gecko is used by browsers
            // other than Firefox. Gecko 2.0 corresponds to
            // Firefox 4.0.

            index = userAgent.indexOf('rv:');

            if (userAgent.indexOf('Gecko') != -1) {
                geckoVersion = userAgent.substr(index + 3, 3);

                if (geckoVersion === '2.0') {
                    // Forces the return statement to fall through
                    // to the setTimeout() function.

                    window.mozRequestAnimationFrame = undefined;
                }
            }
        }

//            return  window.requestAnimationFrame ||  //传递给callback的time不是从1970年1月1日到当前所经过的毫秒数！
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||

            function (callback, element) {
                var start,
                    finish;

                window.setTimeout(function () {
                    start = +new Date();
                    callback(start);
                    finish = +new Date();

                    self.timeout = 1000 / 60 - (finish - start);

                }, self.timeout);
            };
    }());

    window.cancelNextRequestAnimationFrame = window.cancelRequestAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.webkitCancelRequestAnimationFrame
    || window.mozCancelRequestAnimationFrame
    || window.oCancelRequestAnimationFrame
    || window.msCancelRequestAnimationFrame
    || clearTimeout;

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

        private _scene:Scene = null;
        private _loopId:string = null;

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
            //todo move it to Director
            return WebGLContext.view;
        }

        public getTopChildUnderPoint(point:Point):GameObject{
            if(!this._scene){
                return null;
            }

            return this._scene.getTopGameObjectUnderPoint(point);
        }

        private _startLoop() {
            var self = this,
                mainLoop = null;

            mainLoop = (time) => {
                self._loopBody(time);

                self._loopId = window.requestNextAnimationFrame(mainLoop);
            };
            this._loopId = window.requestNextAnimationFrame(mainLoop);
        }

        //todo add tick mechanism
        private _loopBody(time) {
            var gl = WebGLContext.gl;
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            this._scene.onStartLoop();

            this._scene.run();

            this._renderer.render(this._scene);

            this._scene.onEndLoop();
        }
    }
}
