/// <reference path="../definitions.d.ts"/>
module dy.render{
    export class WebGLRenderer extends Renderer{
        public static create():WebGLRenderer {
            var obj = new this();

            return obj;
        }

        private _commandQueue:dyCb.Collection<QuadCommand> = dyCb.Collection.create<QuadCommand>();
        private _clearOptions:any = {
            color:Color.create("#000000")
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
            var deviceManager = DeviceManager.getInstance(),
                skybox = null;

            deviceManager.clear(this._clearOptions);

            //todo refactor:remove flag
            skybox = this._commandQueue.removeChild((command:QuadCommand) => {
                return command.isSkybox;
            }).getChild(0);

            this._renderOpaqueCommands();

            deviceManager.depthWrite = false;
            this._renderSortedTransparentCommands();
            deviceManager.depthWrite = true;


            //todo material add depthWrite,depthFunc
            //deviceManager.depthWrite = false;
            deviceManager.depthFunc = DepthFunction.LEQUAL;
            //render skybox
            skybox && skybox.execute();

            //deviceManager.depthWrite = true;
            deviceManager.depthFunc = DepthFunction.LESS;


            this._clearCommand();
        }

        public init(){
            var deviceManager = DeviceManager.getInstance();

            deviceManager.depthTest = true;
            deviceManager.blend = false;
            deviceManager.setBlendFunction(BlendFunction.ONE, BlendFunction.ZERO);
            deviceManager.setBlendEquation(BlendEquation.ADD);
            deviceManager.setColorWrite(true, true, true, true);
            deviceManager.cullMode = CullMode.BACK;
            deviceManager.depthWrite = true;
            deviceManager.scissorTest = true;
        }

        public setClearColor(color:Color){
            this._setClearOptions({
                color:color
            });
        }

        private _renderOpaqueCommands() {
            this._commandQueue
                .removeChild((command:QuadCommand) => {
                    return !command.material.blend;
                })
                .forEach((command:QuadCommand) => {
                    command.execute();
                });
        }

        private _renderSortedTransparentCommands() {
            var self = this;

            this._commandQueue
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
