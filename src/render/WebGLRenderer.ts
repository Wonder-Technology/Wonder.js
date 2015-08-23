/// <reference path="../definitions.d.ts"/>
module dy.render{
    export class WebGLRenderer extends Renderer{
        public static create():WebGLRenderer {
            var obj = new this();

            return obj;
        }

        private _commandQueue:dyCb.Collection<QuadCommand> = dyCb.Collection.create<QuadCommand>();
        private _clearOptions:any = {
            color:Color.create("#000000"),
            alpha: 1.0
        };

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
            var gl = GLManager.getInstance();

            gl.clear(this._clearOptions);

            this._renderOpaqueCommands();

            gl.depthWrite = false;
            this._renderSortedTransparentCommands();
            gl.depthWrite = true;

            this._clearCommand();
        }

        public init(){
            var gl = GLManager.getInstance();

            gl.depthTest = true;
            gl.blend = false;
            gl.setBlendFunction(BlendFunction.ONE, BlendFunction.ZERO);
            gl.setBlendEquation(BlendEquation.FUNC_ADD);
            gl.setColorWrite(true, true, true, true);
            gl.cullMode = CullMode.BACK;
            gl.depthWrite = true;
            gl.scissorTest = true;
        }

        public setClearColor(color:Color = Color.create("#000000"), alpha:number = 1.0){
            this._setClearOptions({
                color:color,
                alpha:alpha
            });
        }

        private _renderOpaqueCommands() {
            this._commandQueue
                .filter((command:QuadCommand) => {
                    return !command.blend;
                })
                .forEach((command:QuadCommand) => {
                    command.execute();
                });
        }

        private _renderSortedTransparentCommands() {
            var self = this;

            this._commandQueue
                .filter((command:QuadCommand) => {
                    return command.blend;
                })
                .sort((a:QuadCommand, b:QuadCommand) => {
                    return self._getObjectToCameraZDistance(b) - self._getObjectToCameraZDistance(a);
                })
                .forEach((command:QuadCommand) => {
                    command.execute();
                });
        }

        private _getObjectToCameraZDistance(quad){
            return Director.getInstance().stage.camera.transform.position.z - quad.z;
        }

        private _clearCommand(){
            this._commandQueue.removeAllChildren();
        }

        private _setClearOptions(clearOptions:any){
            dyCb.ExtendUtils.extend(this._clearOptions, clearOptions);
        }
    }
}
