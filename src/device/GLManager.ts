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
                } else {
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
        }
    }
}
