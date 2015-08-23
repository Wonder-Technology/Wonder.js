/// <reference path="../definitions.d.ts"/>
module dy {
    /*!default is BACK*/
    export enum CullMode{
        NONE,
        //CCW
        FRONT,
        //CW
        BACK,
        FRONT_AND_BACK
    }

    export enum PolygonOffsetMode{
        NONE,
        IN,
        OUT,
        CUSTOM
    }

    export enum BlendFunction{
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

    export enum BlendEquation{
        FUNC_ADD = <any>"FUNC_ADD",
        FUNC_SUBTRACT = <any>"FUNC_SUBTRACT",
        FUNC_REVERSE_SUBTRAC = <any>"FUNC_REVERSE_SUBTRACT"
    }

    export class GLManager {
        private static _instance:GLManager = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public gl:any = null;

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

        private _cullMode:CullMode = null;
        get cullMode() {
            return this._cullMode;
        }

        set cullMode(cullMode:CullMode) {
            var gl = this.gl;

            if (this._cullMode !== cullMode) {
                switch (cullMode) {
                    case CullMode.NONE:
                        gl.disable(gl.CULL_FACE);
                        break;
                    case CullMode.FRONT:
                        gl.enable(gl.CULL_FACE);
                        gl.cullFace(gl.FRONT);
                        break;
                    case CullMode.BACK:
                        gl.enable(gl.CULL_FACE);
                        gl.cullFace(gl.BACK);
                        break;
                    case CullMode.FRONT_AND_BACK:
                        gl.enable(gl.CULL_FACE);
                        gl.cullFace(gl.FRONT_AND_BACK);
                        break;
                    default :
                        dyCb.Log.error(true, dyCb.Log.info.FUNC_UNEXPECT("cullMode"));
                        break;
                }

                this._cullMode = cullMode;
            }
        }

        /*!
         偏移值是在z值计算后、深度检测之前加上的，此时坐标已经被映射到Normalized Device Coordinates中了，
         而此时的z轴是向内的（opengl的z轴是向外的），因此多边形偏移量为正值的话，意味着往远处移动，否则往近处移动。
         可参考下面的说明：
         The results are summed to produce the depth offset. This offset is applied in screen space, typically with positive Z pointing into the screen.
         the offset is calculated after the normal Z calculations, but applied before the depth test and before being written to the depth buffer.
         */
        public polygonOffset:Point = null;

        private _polygonOffsetMode:PolygonOffsetMode = null;
        get polygonOffsetMode(){
            return this._polygonOffsetMode;
        }
        set polygonOffsetMode(polygonOffsetMode:PolygonOffsetMode){
            var gl = this.gl;

            if (this._polygonOffsetMode !== polygonOffsetMode) {
                switch (polygonOffsetMode){
                    case PolygonOffsetMode.NONE:
                        gl.polygonOffset(0.0, 0.0);
                        gl.disable(gl.POLYGON_OFFSET_FILL);
                        break;
                    case PolygonOffsetMode.IN:
                        gl.enable(gl.POLYGON_OFFSET_FILL);
                        gl.polygonOffset(1.0, 1.0);
                        break;
                    case PolygonOffsetMode.OUT:
                        gl.enable(gl.POLYGON_OFFSET_FILL);
                        gl.polygonOffset(-1.0, -1.0);
                        break;
                    case PolygonOffsetMode.CUSTOM:
                        gl.enable(gl.POLYGON_OFFSET_FILL);
                        dyCb.Log.error(!this.polygonOffset, dyCb.Log.info.FUNC_MUST_DEFINE("polygonOffset"));
                        gl.polygonOffset(this.polygonOffset.x, this.polygonOffset.y);
                        break;
                    default:
                        return;
                        break;
                }

                this._polygonOffsetMode = polygonOffsetMode;
            }
        }



        /*! blend record
        所 谓源颜色和目标颜色，是跟绘制的顺序有关的。假如先绘制了一个红色的物体，再在其上绘制绿色的物体。则绿色是源颜色，红色是目标颜色。如果顺序反过来，则 红色就是源颜色，绿色才是目标颜色。在绘制时，应该注意顺序，使得绘制的源颜色与设置的源因子对应，目标颜色与设置的目标因子对应。不要被混乱的顺序搞晕 了。


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


        /**
         * @function
         * @name pc.GraphicsDevice#setColorWrite
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

        private _writeRed:boolean = null;
        private _writeGreen:boolean = null;
        private _writeBlue:boolean = null;
        private _writeAlpha:boolean = null;
        private _blendSrc:BlendFunction = null;
        private _blendDst:BlendFunction = null;
        private _blendEquation: BlendEquation = null;

        /**
         * @function
         * @name pc.GraphicsDevice#setBlendFunction
         * @description Configures blending operations.
         * @param {pc.BLENDMODE} blendSrc The source blend function.
         * @param {pc.BLENDMODE} blendDst The destination blend function.
         */
        public setBlendFunction(blendSrc:BlendFunction, blendDst:BlendFunction) {
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
         * @name pc.GraphicsDevice#setBlendEquation
         * @description Configures the blending equation. .
         * @param {pc.BLENDEQUATION} blendEquation The blend equation.
         */
        public setBlendEquation(blendEquation:BlendEquation) {
            if (this._blendEquation !== blendEquation) {
                this._blend && this.gl.blendEquation(this.gl[blendEquation]);
                this._blendEquation = blendEquation;
            }
        }

        public clear(options:any) {
         //   /**
         //    * @function
         //    * @name pc.GraphicsDevice#clear
         //    * @description Clears the frame buffer of the currently set render target.
         //    * @param {Object} options Optional options object that controls the behavior of the clear operation defined as follows:
         //    * @param {Array} options.color The color to clear the color buffer to in the range 0.0 to 1.0 for each component.
         //    * @param {Number} options.depth The depth value to clear the depth buffer to in the range 0.0 to 1.0.
         //    * @param {pc.CLEARFLAG} options.flags The buffers to clear (the types being color, depth and stencil).
         //    * @example
         //    * // Clear color buffer to black and depth buffer to 1.0
         //    * device.clear();
         //    *
         //    * // Clear just the color buffer to red
         //    * device.clear({
         //*     color: [1, 0, 0, 1],
         //*     flags: pc.CLEARFLAG_COLOR
         //* });
         //    *
         //    * // Clear color buffer to yellow and depth to 1.0
         //    * device.clear({
         //*     color: [1, 1, 0, 1],
         //*     depth: 1.0,
         //*     flags: pc.CLEARFLAG_COLOR | pc.CLEARFLAG_DEPTH
         //* });
         //    */
            //var defaultOptions = this.defaultClearOptions;
            //options = options || defaultOptions;
            //
            //var flags = (options.flags === undefined) ? defaultOptions.flags : options.flags;
            //if (flags !== 0) {
            //    var gl = this.gl;
            //
            //    // Set the clear color
            //    if (flags & pc.CLEARFLAG_COLOR) {
            //        var color = (options.color === undefined) ? defaultOptions.color : options.color;
            //        this.setClearColor(color[0], color[1], color[2], color[3]);
            //    }
            //
            //    if (flags & pc.CLEARFLAG_DEPTH) {
            //        // Set the clear depth
            //        var depth = (options.depth === undefined) ? defaultOptions.depth : options.depth;
            //        this.setClearDepth(depth);
            //        if (!this.depthWrite) {
            //            gl.depthMask(true);
            //        }
            //    }
            //
            //    // Clear the frame buffer
            //    gl.clear(this.glClearFlag[flags]);
            //
            //    if (flags & pc.CLEARFLAG_DEPTH) {
            //        if (!this.depthWrite) {
            //            gl.depthMask(false);
            //        }
            //    }
            //}


            var gl = this.gl,
                color = options.color;

            gl.clearColor(color.r, color.g, color.b, options.alpha);

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            this.depthWrite = true;
        }
    }
}
