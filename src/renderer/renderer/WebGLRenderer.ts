module wd{
    /*!
    start from 0, so its max is 32
     */
    const RENDER_GROUP_MAX = 31,
        RENDER_PRIORITY_MAX = 31,
        /*!
        shader id start from 1, so its max is 1024
         */
        SHADER_ID_MAX = 1024,
        TEXTURE_ID_MAX = 1024,
        BUFFER_ID_MAX = 1024,

        TOTAL_BIT = 30,
        RENDER_GROUP_MOVE_LEFT_BIT = TOTAL_BIT - 5,
        RENDER_PRIORITY_MOVE_LEFT_BIT = TOTAL_BIT - 5 - 5,
        SHADER_ID_MOVE_LEFT_BIT = TOTAL_BIT - 5 - 5 - 10;

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
                transparentCommandArr:Array<RenderCommand> = [],
                opaqueQuadCommandArr:Array<QuadCommand> = [];

            this._commandQueue.forEach((command:RenderCommand) => {
                command.webglState = webglState;

                if(command.blend){
                    //todo optimize: sort command here
                    transparentCommandArr.push(command);
                }
                else if(command instanceof QuadCommand){
                    this._buildOpaqueCommandSortId(command);

                    opaqueQuadCommandArr.push(command);
                }
                else{
                    command.execute();
                }
            }, this);

            if(opaqueQuadCommandArr.length > 0){
                opaqueQuadCommandArr = this._sortOpaqueQuadCommand(opaqueQuadCommandArr);

                for(let command of opaqueQuadCommandArr){
                    command.execute();
                }
            }

            if(transparentCommandArr.length > 0){
                deviceManager.depthWrite = false;
                this._renderSortedTransparentCommands(<Array<QuadCommand>>transparentCommandArr);
                deviceManager.depthWrite = true;
            }

            if(this.skyboxCommand){
                deviceManager.depthFunc = EDepthFunction.LEQUAL;
                this.skyboxCommand.webglState = webglState;
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

        @require(function(transparentCommandArr:Array<RenderCommand>){
            assert(!!Director.getInstance().scene.currentCamera, Log.info.FUNC_NOT_EXIST("current camera"));

            for (let command of transparentCommandArr){
                assert(command instanceof QuadCommand, Log.info.FUNC_MUST_BE("transparent command", "QuadCommand"));
            }
        })
        private _renderSortedTransparentCommands(transparentCommandArr:Array<QuadCommand>) {
            var self = this,
                cameraPositionZ = Director.getInstance().scene.currentCamera.transform.position.z;

            //todo optimize sort
            transparentCommandArr
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

        @require(function(opaqueCommand:QuadCommand){
            var target:GameObject = opaqueCommand.target;

            assert(target.renderGroup <= RENDER_GROUP_MAX && target.renderGroup >= 0, Log.info.FUNC_SHOULD(`renderGroup:${target.renderGroup}`, `in range:[0, ${RENDER_GROUP_MAX}]`));
            assert(target.renderPriority <= RENDER_PRIORITY_MAX && target.renderPriority >= 0, Log.info.FUNC_SHOULD(`renderPriority:${target.renderPriority}`, `in range:[0, ${RENDER_PRIORITY_MAX}]`));
        })
        //todo optimize:add cache
        private _buildOpaqueCommandSortId(opaqueCommand:QuadCommand){
            var target:GameObject = opaqueCommand.target,
                targetMaterial = opaqueCommand.material;

            //todo optimize:add cache

            /*!
            bit operator can only handle 32 bit, but javascript number is 64 bit.
             so here assemble two segments data(30 bit and 10 bit) to a number data to ensure that opaqueCommand only has one sortId.
             */

            opaqueCommand.sortId = ((target.renderGroup << RENDER_GROUP_MOVE_LEFT_BIT) + (target.renderPriority << RENDER_PRIORITY_MOVE_LEFT_BIT) + (this._buildShaderSortId(targetMaterial.shader) << SHADER_ID_MOVE_LEFT_BIT) + (this._mapEntityIdToRenderId(this._getTargetTexture(targetMaterial), TEXTURE_ID_MAX))) * BUFFER_ID_MAX
            + (this._mapEntityIdToRenderId(this._getTargetBuffer(targetMaterial), BUFFER_ID_MAX));
        }

        private _buildShaderSortId(shader:Shader){
            return this._mapEntityIdToRenderId(shader.program, SHADER_ID_MAX);
        }

        private _getTargetTexture(material:Material){
            if(material instanceof StandardBasicMaterial){
                return material.mapList.getChild(0);
            }
            else{
                return (<StandardLightMaterial>material).diffuseMap;
            }
        }

        private _getTargetBuffer(material:Material){
            return material.geometry.buffers.getBufferForRenderSort();
        }

        @ensure(function(mappedId:number, entityId:number, maxId:number){
            assert(mappedId >= 0 && mappedId <= maxId, Log.info.FUNC_SHOULD(`mappedId:${mappedId}`, `in range:[0, ${maxId}]`));
        })
        private _mapEntityIdToRenderId(entity:Entity, maxId:number){
            if(!entity){
                return 1;
            }

            return entity.uid % maxId;
        }

        @require(function(opaqueCommandArr:Array<QuadCommand>){
            for(let command of opaqueCommandArr){
                assert(command instanceof QuadCommand, Log.info.FUNC_MUST_BE("command", "QuadCommand"));
                assert(command.blend === false, Log.info.FUNC_MUST_BE("command", "opaque command"));
            }
        })
        private _sortOpaqueQuadCommand(opaqueCommandArr:Array<QuadCommand>){
            return SortUtils.insertSort(opaqueCommandArr, (commandA:QuadCommand, commandB:QuadCommand) => {
                return commandA.sortId < commandB.sortId;
            })
        }
    }
}
