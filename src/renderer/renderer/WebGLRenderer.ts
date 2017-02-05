module wd{
    /*!
    start from 0, so its max is 32
     */
    // const RENDER_GROUP_MAX = 31,
    //     RENDER_PRIORITY_MAX = 31,
    //     /*!
    //     shader id start from 1, so its max is 1024
    //      */
    //     SHADER_ID_MAX = 1024,
    //     TEXTURE_ID_MAX = 1024,
    //     BUFFER_ID_MAX = 1024,
    //
    //     TOTAL_BIT = 30,
    //     RENDER_GROUP_MOVE_LEFT_BIT = TOTAL_BIT - 5,
    //     RENDER_PRIORITY_MOVE_LEFT_BIT = TOTAL_BIT - 5 - 5,
    //     SHADER_ID_MOVE_LEFT_BIT = TOTAL_BIT - 5 - 5 - 10;

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
            // return this._commandQueue.getCount() > 0 || !!this.skyboxCommand;
            return this._commandQueue.getCount() > 0;
        }

        public clear(){
            DeviceManager.getInstance().clear(this._clearOptions);
        }

        @require(function(){
            assert(!!this.webglState, Log.info.FUNC_MUST_DEFINE("webglState"));
        })
        public render(){
            var deviceManager:DeviceManager = DeviceManager.getInstance(),
                webglState:WebGLState = this.webglState;
                // transparentCommandArr:Array<RenderCommand> = [],
                // opaqueQuadCommandArr:Array<QuadCommand> = [];

            this._commandQueue.forEach((command:RenderCommand) => {
                command.webglState = webglState;

                /*!
                //todo optimize: if all commands->blendType === EBlendType.ADDITIVE, sort the transparentCommandArr as the opaque command arr(but it's not necessarily because many rendering effects do not fall into this category?)
                 However, if the blending is additive-only, then this is not needed. In the case of our game Oort Online, the “effects” pass only contains geometries rendered with additive blending, which is correct no matter the order; this means that we can employ more efficient sorting for this group.
                 */
                // if(command.blend){
                //     //todo optimize: sort command here
                //     transparentCommandArr.push(command);
                // }
                // else if(command instanceof QuadCommand){
                //     this._buildOpaqueCommandSortId(command);
                //
                //     opaqueQuadCommandArr.push(command);
                // }
                // else{
                    command.execute();
                // }
            }, this);

            // if(opaqueQuadCommandArr.length > 0){
            //     this._sortOpaqueQuadCommand(opaqueQuadCommandArr);
            //
            //     for(let command of opaqueQuadCommandArr){
            //         command.execute();
            //     }
            // }
            //
            // if(transparentCommandArr.length > 0){
            //     deviceManager.depthWrite = false;
            //
            //     this._renderSortedTransparentCommands(<Array<QuadCommand>>transparentCommandArr);
            //
            //     deviceManager.depthWrite = true;
            // }

            // if(this.skyboxCommand){
            //     deviceManager.depthFunc = EDepthFunction.LEQUAL;
            //     this.skyboxCommand.webglState = webglState;
            //     this.skyboxCommand.execute();
            //     deviceManager.depthFunc = EDepthFunction.LESS;
            // }

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

        // @require(function(transparentCommandArr:Array<RenderCommand>){
        //     assert(!!Director.getInstance().scene.currentCamera, Log.info.FUNC_NOT_EXIST("current camera"));
        //
        //     for (let command of transparentCommandArr){
        //         assert(command instanceof QuadCommand, Log.info.FUNC_MUST_BE("transparent command", "QuadCommand"));
        //     }
        // })
        // private _renderSortedTransparentCommands(transparentCommandArr:Array<QuadCommand>) {
        //     var self = this;
        //
        //     for (let command of SortUtils.insertSort(transparentCommandArr, (a:QuadCommand, b:QuadCommand) => {
        //         return self._getObjectZDistanceInCameraCoordinate(a) < self._getObjectZDistanceInCameraCoordinate(b);
        //         })){
        //         command.execute();
        //     }
        // }
        //
        // private _getObjectZDistanceInCameraCoordinate(cmd:QuadCommand){
        //     return cmd.mMatrix.applyMatrix(cmd.vMatrix, true).getTranslation().z;
        // }

        private _clearCommand(){
            this._commandQueue.forEach((command:RenderCommand) => {
                command.dispose();
            });

            this._commandQueue.removeAllChildren();

            // if(this.skyboxCommand){
            //     this.skyboxCommand.dispose();
            //     this.skyboxCommand = null;
            // }
        }

        private _setClearOptions(clearOptions:any){
            wdCb.ExtendUtils.extend(this._clearOptions, clearOptions);
        }
    }
}
