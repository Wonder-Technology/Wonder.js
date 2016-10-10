/*!
 DeviceManager is responsible for global setting of gl
 */
module wd {
    declare var window:any;

    @singleton()
    export class DeviceManager {
        public static getInstance():any {}

        /*!
         test order:
         scissor test -> depth test -> stencil test -> specular add -> fog -> alpha blend -> write mask
         */

        /*!
         The scissor test culls pixels that are outside of the scissor rectangle, a user-defined rectangular sub-section of the render target.
         The scissor rectangle could be used to indicate the area of the render target where the game world is drawn. The area outside the rectangle is culled and could be devoted to a game's GUI. The scissor test cannot cull non-rectangular areas.
         Scissor rectangles cannot be set larger than the render target, but they can be set larger than the viewport.
         The scissor rectangle is managed by a device render state. A scissor test is enabled or disabled by setting the renderstate to TRUE or FALSE. This test is performed after the fragment color is computed but before alpha testing. IDirect3DDevice9
         */
        private _scissorTest:boolean = false;
        get scissorTest(){
            return this._scissorTest;
        }
        set scissorTest(scissorTest:boolean){
            var gl = this.gl;

            if(this._scissorTest === scissorTest){
                return;
            }

            if (scissorTest) {
                gl.enable(gl.SCISSOR_TEST);
            }
            else {
                gl.disable(gl.SCISSOR_TEST);
            }

            this._scissorTest = scissorTest;
        }

        /**
         * @function
         * @name setScissor
         * @description Set the active scissor rectangle on the specified device.
         * @param {Number} x The pixel space x-coordinate of the bottom left corner of the scissor rectangle.
         * @param {Number} y The pixel space y-coordinate of the bottom left corner of the scissor rectangle.
         * @param {Number} w The width of the scissor rectangle in pixels.
         * @param {Number} h The height of the scissor rectangle in pixels.
         */
        public setScissor(x:number, y:number, width:number, height:number) {
            if(this._scissorRegion.y === y && this._scissorRegion.width === width && this._scissorRegion.height === height){
                return;
            }

            this.gl.scissor(x, y, width, height);

            this._scissorRegion.set(x, y, width, height);

            this.scissorTest = true;
        }

        /*! Difference between viewports and scissor rectangles

         Viewports are basically scaled views, the left side is 0 and the right side is 1. The entire view will be scaled down into that viewport after everything is projected.

         Scissor tests clip to a rectangle inside that viewport. Instead of rendering from 0 to 1, you render from .2 to .8, with black bars on the outside. This actually cuts off a portion of what would normally be visible (if you used a viewport of the same size, you'd see the same amount but shrunk slightly).

         Viewports are used for full views (consider 3D Studio Max, each viewport is the full view from that angle, but fit into a single square). Scissor tests are used to cut out extra pixels that you don't want/need to be affected (lights in deferred rendering, for instance, everything outside the range is not affected, so why bother calculating that if you already know it's not lit, just scissor around the projected sphere and forget about everything beyond that).
         */

        /**
         * @function
         * @name setViewport
         * @description Set the active rectangle for rendering on the specified device.
         * @param {Number} x The pixel space x-coordinate of the bottom left corner of the viewport.
         * @param {Number} y The pixel space y-coordinate of the bottom left corner of the viewport.
         * @param {Number} w The width of the viewport in pixels.
         * @param {Number} h The height of the viewport in pixels.
         */
        public setViewport(x:number, y:number, width:number, height:number) {
            if(this._viewport.x === x && this._viewport.y === y && this._viewport.width === width && this._viewport.height === height){
                return;
            }

            this._viewport.set(x, y, width, height);
            this.gl.viewport(x, y, width, height);
        }

        public getViewport(){
            return this._viewport;
        }


        //todo set depth func?
        /*! 默认情况是将需要绘制的新像素的z值与深度缓冲区中对应位置的z值进行比较，如果比深度缓存中的值小，那么用新像素的颜色值更新帧缓存中对应像素的颜色值。
         但是可以使用glDepthFunc(func)来对这种默认测试方式进行修改。
         其中参数func的值可以为GL_NEVER（没有处理）、GL_ALWAYS（处理所有）、GL_LESS（小于）、GL_LEQUAL（小于等于）、GL_EQUAL（等于）、GL_GEQUAL（大于等于）、GL_GREATER（大于）或GL_NOTEQUAL（不等于），其中默认值是GL_LESS。

         gl.depthFunc(gl.LEQUAL);
         */

        private _depthTest:boolean = null;
        get depthTest() {
            return this._depthTest;
        }

        set depthTest(depthTest:boolean) {
            var gl = this.gl;

            if (this._depthTest !== depthTest) {
                if (depthTest) {
                    gl.enable(gl.DEPTH_TEST);
                }
                else {
                    gl.disable(gl.DEPTH_TEST);
                }

                this._depthTest = depthTest;
            }
        }

        private _depthFunc:EDepthFunction = null;
        get depthFunc(){
            return this._depthFunc;
        }
        set depthFunc(depthFunc:EDepthFunction){
            var gl = this.gl;

            if (this._depthFunc !== depthFunc) {
                gl.depthFunc(gl[depthFunc]);

                this._depthFunc = depthFunc;
            }
        }


        private _side:ESide = null;
        get side() {
            return this._side;
        }

        set side(side:ESide) {
            var gl = this.gl;

            if (this._side !== side) {
                switch (side) {
                    case ESide.NONE:
                        gl.enable(gl.CULL_FACE);
                        gl.cullFace(gl.FRONT_AND_BACK);
                        break;
                    case ESide.BOTH:
                        gl.disable(gl.CULL_FACE);
                        break;
                    case ESide.FRONT:
                        gl.enable(gl.CULL_FACE);
                        gl.cullFace(gl.BACK);
                        break;
                    case ESide.BACK:
                        gl.enable(gl.CULL_FACE);
                        gl.cullFace(gl.FRONT);
                        break;
                    default :
                        Log.error(true, Log.info.FUNC_UNEXPECT("side", side));
                        break;
                }

                this._side = side;
            }
        }

        /*!
         偏移值是在z值计算后、深度检测之前加上的，此时坐标已经被映射到Normalized Device Coordinates中了，
         而此时的z轴是向内的（opengl的z轴是向外的），因此多边形偏移量为正值的话，意味着往远处移动，否则往近处移动。
         可参考下面的说明：
         The results are summed to produce the depth offset. This offset is applied in screen space, typically with positive Z pointing into the screen.
         the offset is calculated after the normal Z calculations, but applied before the depth test and before being written to the depth buffer.
         */
        public polygonOffset:Vector2 = null;

        private _polygonOffsetMode:EPolygonOffsetMode = null;
        get polygonOffsetMode(){
            return this._polygonOffsetMode;
        }
        set polygonOffsetMode(polygonOffsetMode:EPolygonOffsetMode){
            var gl = this.gl;

            if (this._polygonOffsetMode !== polygonOffsetMode) {
                switch (polygonOffsetMode){
                    case EPolygonOffsetMode.NONE:
                        gl.polygonOffset(0.0, 0.0);
                        gl.disable(gl.POLYGON_OFFSET_FILL);
                        break;
                    case EPolygonOffsetMode.IN:
                        gl.enable(gl.POLYGON_OFFSET_FILL);
                        gl.polygonOffset(1.0, 1.0);
                        break;
                    case EPolygonOffsetMode.OUT:
                        gl.enable(gl.POLYGON_OFFSET_FILL);
                        gl.polygonOffset(-1.0, -1.0);
                        break;
                    case EPolygonOffsetMode.CUSTOM:
                        gl.enable(gl.POLYGON_OFFSET_FILL);
                        Log.error(!this.polygonOffset, Log.info.FUNC_MUST_DEFINE("polygonOffset"));
                        gl.polygonOffset(this.polygonOffset.x, this.polygonOffset.y);
                        break;
                    default:
                        break;
                }

                this._polygonOffsetMode = polygonOffsetMode;
            }
        }

        private _depthWrite:boolean = null;
        get depthWrite(){
            return this._depthWrite;
        }
        set depthWrite(depthWrite:boolean){
            if (this._depthWrite !== depthWrite) {
                this.gl.depthMask(depthWrite);

                this._depthWrite = depthWrite;
            }
        }

        /*! blend record
         所谓源颜色和目标颜色，是跟绘制的顺序有关的。假如先绘制了一个红色的物体，再在其上绘制绿色的物体。则绿色是源颜色，红色是目标颜色。如果顺序反过来，则 红色就是源颜色，绿色才是目标颜色。在绘制时，应该注意顺序，使得绘制的源颜色与设置的源因子对应，目标颜色与设置的目标因子对应。不要被混乱的顺序搞晕 了。


         也许你迫不及待的想要绘制一个三维的带有半透明物体的场景了。但是现在恐怕还不行，还有一点是在进行三维场景的混合时必须注意的，那就是深度缓冲。
         总结起来，绘制顺序就是：首先绘制所有不透明的物体。如果两个物体都是不透明的，则谁先谁后 都没有关系。然后，将深度缓冲区设置为只读。接下来，绘制所有半透明的物体。如果两个物体都是半透明的，则谁先谁后只需要根据自己的意愿（注意了，先绘制 的将成为“目标颜色”，后绘制的将成为“源颜色”，所以绘制的顺序将会对结果造成一些影响）。最后，将深度缓冲区设置为可读可写形式。

         在进行混合时，绘制的顺序十分重要。因为在绘制时，正要绘制上去的是源颜色，原来存在的是目标颜色，因此先绘制的物体就成为目标颜色，后来绘制的则成为源颜色。绘制的顺序要考虑清楚，将目标颜色和设置的目标因子相对应，源颜色和设置的源因子相对应。
         在进行三维混合时，不仅要考虑源因子和目标因子，还应该考虑深度缓冲区。必须先绘制所有不透明的物体，再绘制半透明的物体。在绘制半透明物体时前，还需要将深度缓冲区设置为只读形式，否则可能出现画面错误。
         */

        private _blend:boolean = null;
        get blend(){
            return this._blend;
        }
        set blend(blend:boolean){
            var gl = this.gl;

            if (this._blend !== blend) {
                if (blend) {
                    gl.enable(gl.BLEND);
                }
                else {
                    gl.disable(gl.BLEND);
                }

                this._blend = blend;
            }
        }

        private _alphaToCoverage:boolean = null;
        get alphaToCoverage(){
            return this._alphaToCoverage;
        }
        set alphaToCoverage(alphaToCoverage:boolean){
            var gl = this.gl;

            if (this._alphaToCoverage !== alphaToCoverage) {
                if (alphaToCoverage) {
                    gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
                }
                else {
                    gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
                }

                this._alphaToCoverage = alphaToCoverage;
            }
        }

        public view:IView = null;
        public gl:WebGLRenderingContext = null;
        public contextConfig:ContextConfigData = null;

        private _writeRed:boolean = null;
        private _writeGreen:boolean = null;
        private _writeBlue:boolean = null;
        private _writeAlpha:boolean = null;
        private _blendSrc:EBlendFunc = null;
        private _blendDst:EBlendFunc = null;
        private _blendEquation: EBlendEquation = null;
        private _blendFuncSeparate:Array<EBlendFunc> = null;
        private _blendEquationSeparate:Array<EBlendEquation> = null;
        private _scissorRegion:RectRegion = RectRegion.create();
        private _viewport:RectRegion = RectRegion.create();
        private _clearColor:Color = null;
        private _pixelRatio:number = null;

        /**
         * @function
         * @name setBlendFunction
         * @description Configures blending operations.
         * @param {pc.BLENDMODE} blendSrc The source blend function.
         * @param {pc.BLENDMODE} blendDst The destination blend function.
         */
        public setBlendFunc(blendSrc:EBlendFunc, blendDst:EBlendFunc) {
            if ((this._blendSrc !== blendSrc) || (this._blendDst !== blendDst)) {
                this._blend && this.gl.blendFunc(this.gl[blendSrc], this.gl[blendDst]);
                this._blendSrc = blendSrc;
                this._blendDst = blendDst;
            }
        }
        /*!
         OpenGL gives us even more flexibility by allowing us to change the operator between the source and destination part of the equation. Right now, the source and destination components are added together, but we could also subtract them if we want. glBlendEquation(GLenum mode) allows us to set this operation and has 3 possible options:

         GL_FUNC_ADD: the default, adds both components to each other: C¯result=Src+Dst.
         GL_FUNC_SUBTRACT: subtracts both components from each other: C¯result=Src−Dst.
         GL_FUNC_REVERSE_SUBTRAThe default blend equation is

         default is FUNC_ADD
         */

        /**
         * @function
         * @name setBlendEquation
         * @description Configures the blending equation. .
         * @param blendEquation The blend equation.
         */
        public setBlendEquation(blendEquation:EBlendEquation) {
            if (this._blendEquation !== blendEquation) {
                this._blend && this.gl.blendEquation(this.gl[blendEquation]);
                this._blendEquation = blendEquation;
            }
        }

        public setBlendFuncSeparate(blendFuncSeparate:Array<EBlendFunc>) {
            var gl = this.gl;

            if (!this._blendFuncSeparate || this._blendFuncSeparate[0] !== blendFuncSeparate[0] || this._blendFuncSeparate[1] !== blendFuncSeparate[1]) {
                this._blend && gl.blendFuncSeparate(gl[blendFuncSeparate[0]], gl[blendFuncSeparate[1]], gl[blendFuncSeparate[2]], gl[blendFuncSeparate[3]]);
                this._blendFuncSeparate = blendFuncSeparate;
            }
        }

        public setBlendEquationSeparate(blendEquationSeparate:Array<EBlendEquation>) {
            var gl = this.gl;

            if (!this._blendEquationSeparate || this._blendEquationSeparate[0] !== blendEquationSeparate[0] || this._blendEquationSeparate[1] !== blendEquationSeparate[1]) {
                this._blend && gl.blendEquationSeparate(gl[blendEquationSeparate[0]], gl[blendEquationSeparate[1]]);
                this._blendEquationSeparate = blendEquationSeparate;
            }
        }


        /**
         * @function
         * @name setColorWrite
         * @description Enables or disables writes to the color buffer. Once this state
         * is set, it persists until it is changed. By default, color writes are enabled
         * for all color channels.
         * @param {Boolean} writeRed true to enable writing  of the red channel and false otherwise.
         * @param {Boolean} writeGreen true to enable writing  of the green channel and false otherwise.
         * @param {Boolean} writeBlue true to enable writing  of the blue channel and false otherwise.
         * @param {Boolean} writeAlpha true to enable writing  of the alpha channel and false otherwise.
         * @example
         * // Just write alpha into the frame buffer
         * device.setColorWrite(false, false, false, true);
         */
        public setColorWrite(writeRed, writeGreen, writeBlue, writeAlpha) {
            if (this._writeRed !== writeRed
                || this._writeGreen !== writeGreen
                || this._writeBlue !== writeBlue
                || this._writeAlpha !== writeAlpha) {
                this.gl.colorMask(writeRed, writeGreen, writeBlue, writeAlpha);

                this._writeRed = writeRed;
                this._writeGreen = writeGreen;
                this._writeBlue = writeBlue;
                this._writeAlpha = writeAlpha;
            }
        }

        public clear(options:any) {
            var gl = this.gl,
                color = options.color;

            this._setClearColor(color);

            this.setColorWrite(true, true, true, true);

            /*! optimize in ANGLE:
            (need more verify:set color mask all false before clear?
             so here not do the recommendation)


            Recommendation: Do Not Perform Clears with Scissors or Masks Enabled
            (<<WebGL Insights>> -> chapter 1)

            One of the subtle differences between the Direct3D APIs and the GL APIs is that in the former, clear calls ignore scissors and masks, while the latter applies both to clears [Koch 12]. This means that if a clear is performed with the scissors test enabled, or with a color or stencil mask in use, ANGLE must draw a quad with the requested clear values, rather than using clear. This introduces some state management overhead, as ANGLE must switch out all the cached state such as shaders, sampler and texture bindings, and vertex data related to the draw call stream. It then must set up all the appropriate state for the clear, perform the clear itself, and then reset all of the affected state back to its prior settings once the clear is complete. If multiple draw buffers are currently in use, using WEBGL_draw_ buffers, then the performance implications of this emulated clear are com- pounded, as the draw must be performed once for each target. Clearing buffers without scissors or masks enabled avoids this overhead.
            */

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        }


        public createGL(canvasId:string, contextConfig:ContextConfigData, useDevicePixelRatio:boolean){
            var canvas = null;

            this.contextConfig = contextConfig;

            if(canvasId){
                canvas = wdCb.DomQuery.create(canvasId).get(0);
            }
            else{
                canvas = wdCb.DomQuery.create("<canvas></canvas>").prependTo("body").get(0);
            }

            this.view = ViewWebGL.create(canvas);

            if(useDevicePixelRatio){
                this.setPixelRatio(window.devicePixelRatio);
            }

            this.gl = this.view.getContext(contextConfig);
        }

        @require(function(){
            assert(Main.screenSize !== null, Log.info.FUNC_NOT_EXIST("Main.screenSize"));
        })
        public setScreen(){
            var screenSize = Main.screenSize,
                x = null,
                y = null,
                width = null,
                height = null,
                styleWidth = null,
                styleHeight = null;

            if(screenSize === EScreenSize.FULL){
                x = 0;
                y = 0;
                width = root.innerWidth;
                height = root.innerHeight;
                styleWidth = "100%";
                styleHeight = "100%";

                wdCb.DomQuery.create("body").css("margin", "0");
            }
            else{
                x = screenSize.x || 0;
                y = screenSize.y || 0;
                width = screenSize.width || root.innerWidth;
                height = screenSize.height || root.innerHeight;
                styleWidth = `${width}px`;
                styleHeight = `${height}px`;
            }

            this.view.initCanvas();

            this.view.x = x;
            this.view.y = y;
            this.view.width = width;
            this.view.height = height;
            this.view.styleWidth = styleWidth;
            this.view.styleHeight = styleHeight;

            this.setViewport(0, 0, width, height);
        }

        @require(function(level:number){
            assert(level > 0, Log.info.FUNC_SHOULD("level", `> 0, but actual is ${level}`))
        })
        public setHardwareScaling(level:number){
            var width = this.view.width / level,
                height = this.view.height / level;

            this.view.width = width;
            this.view.height = height;

            this.setViewport(0, 0, width, height);
        }

        public setPixelRatio(pixelRatio:number){
            this.view.width = Math.round(this.view.width * pixelRatio);
            this.view.height = Math.round(this.view.height * pixelRatio);

            this._pixelRatio = pixelRatio;
        }

        public getPixelRatio(){
            return this._pixelRatio;
        }

        private _setClearColor(color:Color){
            if(this._clearColor && this._clearColor.isEqual(color)){
                return;
            }

            this.gl.clearColor(color.r, color.g, color.b, color.a);

            this._clearColor = color;
        }
    }

    export enum EDepthFunction{
        NEVER = <any>"NEVER",
        ALWAYS = <any>"ALWAYS",
        LESS = <any>"LESS",
        LEQUAL = <any>"LEQUAL",
        EQUAL = <any>"EQUAL",
        GEQUAL = <any>"GEQUAL",
        GREATER = <any>"GREATER",
        NOTEQUAL = <any>"NOTEQUAL"
    }

    export enum ESide{
        NONE,
        BOTH,
        //CCW
        BACK,
        //CW
        FRONT
    }

    export enum EPolygonOffsetMode{
        NONE,
        IN,
        OUT,
        CUSTOM
    }

    export enum EBlendFunc{
        ZERO = <any>"ZEOR",
        ONE = <any>"ONE",
        SRC_COLOR = <any>"SRC_COLOR",
        ONE_MINUS_SRC_COLOR = <any>"ONE_MINUS_SRC_COLOR",
        DST_COLOR = <any>"DST_COLOR",
        ONE_MINUS_DST_COLOR = <any>"ONE_MINUS_DST_COLOR",
        SRC_ALPHA = <any>"SRC_ALPHA",
        SRC_ALPHA_SATURATE = <any>"SRC_ALPHA_SATURATE",
        ONE_MINUS_SRC_ALPHA = <any>"ONE_MINUS_SRC_ALPHA",
        DST_ALPHA = <any>"DST_ALPHA",
        ONE_MINUS_DST_ALPH = <any>"ONE_MINUS_DST_ALPHA"
    }

    export enum EBlendEquation{
        ADD = <any>"FUNC_ADD",
        SUBTRACT = <any>"FUNC_SUBTRACT",
        REVERSE_SUBTRAC = <any>"FUNC_REVERSE_SUBTRACT"
    }

    export enum EBlendType{
        NONE,
        NORMAL,
        ADDITIVE,
        ADDITIVEALPHA,
        MULTIPLICATIVE,
        PREMULTIPLIED
    }

    export enum ECanvasType{
        TwoDUI = <any>"TwoDUI"
    }

    export type CanvasMapData = {
        canvas:HTMLCanvasElement,
        context:CanvasRenderingContext2D
    }
}
