module wd{
    export class WebGLRenderer extends Renderer{
        public static create():WebGLRenderer {
            var obj = new this();

            return obj;
        }

        private _commandQueue:wdCb.Collection<RenderCommand> = wdCb.Collection.create<RenderCommand>();

        private _clearOptions:any = {
            color:Color.create("#000000")
        };

        @ensure(function(){
            assert(!this._commandQueue.hasRepeatItems(), Log.info.FUNC_SHOULD_NOT("has duplicate render command"));
        })
        public addCommand(command:RenderCommand){
            this._commandQueue.addChild(command);

            command.init();
        }

        public hasCommand(){
            return this._commandQueue.getCount() > 0 || !!this.skyboxCommand;
        }

        public clear(){
            DeviceManager.getInstance().clear(this._clearOptions);
        }

        @require(function(){
            assert(!!this.webglState, Log.info.FUNC_MUST_DEFINE("webglState"));
        })
        public render(){
            var deviceManager:DeviceManager = DeviceManager.getInstance(),
                webglState:WebGLState = this.webglState,
                transparentCommands:Array<RenderCommand> = [];

            this._commandQueue.forEach((command:RenderCommand) => {
                command.webglState = webglState;

                if(command.blend){
                    transparentCommands.push(command);
                }
                else{
                    command.execute();
                }
            }, this);

            if(transparentCommands.length > 0){
                deviceManager.depthWrite = false;
                this._renderSortedTransparentCommands(<Array<QuadCommand>>transparentCommands);
                deviceManager.depthWrite = true;
            }

            if(this.skyboxCommand){
                deviceManager.depthFunc = EDepthFunction.LEQUAL;
                this.skyboxCommand.execute();
                deviceManager.depthFunc = EDepthFunction.LESS;
            }

            this._clearCommand();
            this.webglState = null;
        }

        public init(){
            var deviceManager = DeviceManager.getInstance();

            deviceManager.depthTest = true;
            deviceManager.blend = false;
            deviceManager.setColorWrite(true, true, true, true);
            deviceManager.side = ESide.FRONT;
            deviceManager.depthWrite = true;
        }

        public setClearColor(color:Color){
            this._setClearOptions({
                color:color
            });
        }

        @require(function(transparentCommands:Array<RenderCommand>){
            assert(!!Director.getInstance().scene.currentCamera, Log.info.FUNC_NOT_EXIST("current camera"));

            for (let command of transparentCommands){
                assert(command instanceof QuadCommand, Log.info.FUNC_MUST_BE("transparent command", "QuadCommand"));
            }
        })
        private _renderSortedTransparentCommands(transparentCommands:Array<QuadCommand>) {
            var self = this,
                cameraPositionZ = Director.getInstance().scene.currentCamera.transform.position.z;

            transparentCommands
                .sort((a:QuadCommand, b:QuadCommand) => {
                    return self._getObjectToCameraZDistance(cameraPositionZ, b) - self._getObjectToCameraZDistance(cameraPositionZ, a);
                })
                .forEach((command:QuadCommand) => {
                    command.execute();
                });
        }

        private _getObjectToCameraZDistance(cameraPositionZ:number, cmd:QuadCommand){
            return cameraPositionZ - cmd.z;
        }

        private _clearCommand(){
            this._commandQueue.forEach((command:RenderCommand) => {
                command.dispose();
            });

            this._commandQueue.removeAllChildren();

            if(this.skyboxCommand){
                this.skyboxCommand.dispose();
                this.skyboxCommand = null;
            }
        }

        private _setClearOptions(clearOptions:any){
            wdCb.ExtendUtils.extend(this._clearOptions, clearOptions);
        }
    }
}
