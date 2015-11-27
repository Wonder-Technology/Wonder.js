/// <reference path="../filePath.d.ts"/>
module dy{
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
            var deviceManager = DeviceManager.getInstance();

            deviceManager.clear(this._clearOptions);

            this._renderOpaqueCommands();

            deviceManager.depthWrite = false;
            this._renderSortedTransparentCommands();
            deviceManager.depthWrite = true;


            if(this.skyboxCommand){
                deviceManager.depthFunc = DepthFunction.LEQUAL;
                this.skyboxCommand.execute();
                deviceManager.depthFunc = DepthFunction.LESS;
            }

            this._clearCommand();
        }

        public init(){
            var deviceManager = DeviceManager.getInstance();

            deviceManager.depthTest = true;
            deviceManager.blend = false;
            deviceManager.setColorWrite(true, true, true, true);
            deviceManager.side = Side.FRONT;
            deviceManager.depthWrite = true;
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
            return Director.getInstance().scene.camera.transform.position.z - quad.z;
        }

        private _clearCommand(){
            this._commandQueue.removeAllChildren();
            this.skyboxCommand = null;
        }

        private _setClearOptions(clearOptions:any){
            dyCb.ExtendUtils.extend(this._clearOptions, clearOptions);
        }
    }
}
