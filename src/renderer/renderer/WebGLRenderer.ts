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

                /*!
                //todo optimize: if all commands->blendType === EBlendType.ADDITIVE, sort the transparentCommandArr as the opaque command arr(but it's not necessarily because many rendering effects do not fall into this category?)
                 However, if the blending is additive-only, then this is not needed. In the case of our game Oort Online, the “effects” pass only contains geometries rendered with additive blending, which is correct no matter the order; this means that we can employ more efficient sorting for this group.
                 */
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
                this._sortOpaqueQuadCommand(opaqueQuadCommandArr);

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
            var self = this;

            for (let command of SortUtils.insertSort(transparentCommandArr, (a:QuadCommand, b:QuadCommand) => {
                return self._getObjectZDistanceInCameraCoordinate(a) < self._getObjectZDistanceInCameraCoordinate(b);
                })){
                command.execute();
            }
        }

        private _getObjectZDistanceInCameraCoordinate(cmd:QuadCommand){
            return cmd.mMatrix.applyMatrix(cmd.vMatrix, true).getTranslation().z;
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
        /*!
        //todo add sort by distance

         The front-to-back sorting helps to improve performance on all but Imagination’s PowerVR series of GPUs, which implement deferred fragment shading in hardware [Merry 12]. Also note that if shaders modify the fragment depth value or contain discard statements, the early z-test hardware won’t help.
          Another possible technique is to use a z-prepass, it’s typically not worth the overhead.
         A z-prepass is even more handicapped in JavaScript/WebGL because of the additional overhead compared to native code. And, as before, on tile-based deferred architectures, this solution may actually go against the optimizations done in hardware and result in more GPU overhead.

         If overdraw is a significant issue, then we will use the distance to the camera on the higher bits, while in some other cases it is the shading technique that requires optimization, either because overdraw is not significant or because the hardware can deal with it
         efficiently—for example, on tile-based deferred GPUs that only shade the visible fragment when required at the end of the rendering..
         */
        //todo add sort config by user(e.g., user can config sort by distance or only by buffer)
        private _buildOpaqueCommandSortId(opaqueCommand:QuadCommand){
            var target:GameObject = opaqueCommand.target,
                targetMaterial = opaqueCommand.material;

            //todo optimize:add cache

            /*!
            bit operator can only handle 32 bit, but javascript number is 64 bit.
             so here assemble two segments data(30 bit and 10 bit) to a number data to ensure that opaqueCommand only has one sortId.





            this will cause some overhead(but the overhead is minor in chrome,firefox in Mac OS X by profiling benchmark, maybe it's big in IE 11 in windows or in Chrome/Firefox in windows?):
             Comparing integers is significantly cheaper than comparing floating- point values. The JIT compiler will optimize for either integers or floating-point values, but performance is more predictable if we use the same types everywhere, every time.
             Numbers

             V8 uses tagging to represent values efficiently when types can change. V8 infers from the values that you use what number type you are dealing with. Once V8 has made this inference, it uses tagging to represent values efficiently, because these types can change dynamically. However, there is sometimes a cost to changing these type tags, so it's best to use number types consistently, and in general it is most optimal to use 31-bit signed integers where appropriate.
             */

            opaqueCommand.sortId = ((target.renderGroup << RENDER_GROUP_MOVE_LEFT_BIT) | (target.renderPriority << RENDER_PRIORITY_MOVE_LEFT_BIT) | (this._buildShaderSortId(targetMaterial.shader) << SHADER_ID_MOVE_LEFT_BIT) | (this._mapEntityIdToRenderId(this._getTargetTexture(targetMaterial), TEXTURE_ID_MAX))) * BUFFER_ID_MAX
            + (this._mapEntityIdToRenderId(this._getTargetBuffer(targetMaterial), BUFFER_ID_MAX));
        }

        private _buildShaderSortId(shader:Shader){
            return this._mapEntityIdToRenderId(shader.program, SHADER_ID_MAX);
        }

        private _getTargetTexture(material:Material){
            return material.getTextureForRenderSort();
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
            SortUtils.quickSort(opaqueCommandArr, (commandA:QuadCommand, commandB:QuadCommand) => {
                return commandA.sortId < commandB.sortId;
            }, true);
        }
    }
}
