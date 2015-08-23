/// <reference path="../definitions.d.ts"/>
module dy.render{
    export class WebGLRenderer extends Renderer{
        public static create():WebGLRenderer {
            var obj = new this();

            return obj;
        }

        private _commandQueue:dyCb.Collection<QuadCommand> = dyCb.Collection.create<QuadCommand>();
        private _clearColor:Color = Color.create("#000000");
        private _clearAlpha:number = 1.0;

        public createQuadCommand():QuadCommand{
            return QuadCommand.create();
        }

        public addCommand(command:QuadCommand){
            if(this._commandQueue.hasChild(command)){
                return;
            }

            this._commandQueue.addChild(command);
            command.init();
        }

        public render(){
            var gl = Director.getInstance().gl;

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            this._commandQueue.forEach((command) => {
                command.execute();
            });

            this._clearCommand();
        }

        public init(){
            var gl = Director.getInstance().gl;

            gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearAlpha);

            gl.enable(gl.DEPTH_TEST);
            //todo set depth func?
            /*! 默认情况是将需要绘制的新像素的z值与深度缓冲区中对应位置的z值进行比较，如果比深度缓存中的值小，那么用新像素的颜色值更新帧缓存中对应像素的颜色值。
             但是可以使用glDepthFunc(func)来对这种默认测试方式进行修改。
             其中参数func的值可以为GL_NEVER（没有处理）、GL_ALWAYS（处理所有）、GL_LESS（小于）、GL_LEQUAL（小于等于）、GL_EQUAL（等于）、GL_GEQUAL（大于等于）、GL_GREATER（大于）或GL_NOTEQUAL（不等于），其中默认值是GL_LESS。

             gl.depthFunc(gl.LEQUAL);
             */
        }

        public setClearColor(color:Color, alpha:number = 1.0){
            this._clearColor = color;
            this._clearAlpha = alpha;
            Director.getInstance().gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.g, this._clearAlpha);
        }

        private _clearCommand(){
            this._commandQueue.removeAllChildren();
        }
    }
}
