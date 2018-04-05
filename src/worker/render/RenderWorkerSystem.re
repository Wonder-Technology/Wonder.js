open RenderWorkerType;

let onerrorHandler = (msg: string, fileName: string, lineno: int) =>
  WonderLog.Log.error(
    WonderLog.Log.buildErrorMessage(
      ~title="render worker error",
      ~description={j|$msg|j},
      ~reason="",
      ~solution={j||j},
      ~params={j|fileName:$(fileName)
        lineno:$(lineno)|j}
    )
  );

/* case EWorkerOperateType.INIT_CONFIG:
       setIsTest(record.isTest, InitConfigWorkerData).run();
       break;
   case EWorkerOperateType.INIT_DATA:
       setVersion(record.webglVersion, WebGLDetectWorkerData);
       break;
   case EWorkerOperateType.INIT_GL:

       if (isWebgl1(WebGLDetectWorkerData)) {
           _initWebGL1Data();

           state = _initWebGL1GL(record, WebGLDetectWorkerData, GPUDetectWorkerData);
       }
       else {
           _initWebGL2Data();

           state = _initWebGL2GL(record, WebGLDetectWorkerData, GPUDetectWorkerData);
       }

       setState(state, StateWorkerData);

       initState(state, getGL, setSide, DeviceManagerWorkerData);
       break;
   case EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE:
       if (isWebgl1(WebGLDetectWorkerData)) {
           _handleWebGL1InitRenderData(record, AmbientLightWorkerData, WebGL1DirectionLightWorkerData, WebGL1PointLightWorkerData, WebGL1GLSLSenderWorkerData);
       }
       else {
           _handleWebGL2InitRenderData(record, render_config, AmbientLightWorkerData, WebGL2DirectionLightWorkerData, WebGL2PointLightWorkerData, GPUDetectWorkerData, WebGL2GLSLSenderWorkerData);
       }
       break;
   case EWorkerOperateType.DRAW:
       if (isWebgl1(WebGLDetectWorkerData)) {
           _handleWebGL1Draw(record, AmbientLightWorkerData, WebGL1DirectionLightWorkerData, WebGL1PointLightWorkerData, WebGL1GLSLSenderWorkerData, GPUDetectWorkerData, StateWorkerData);
       }
       else {
           _handleWebGL2Draw(record, AmbientLightWorkerData, WebGL2DirectionLightWorkerData, WebGL2PointLightWorkerData, WebGL2GLSLSenderWorkerData, GPUDetectWorkerData, StateWorkerData);
       }
       break;
   default:
       Log.error(true, Log.info.FUNC_UNKNOW(`operateType:${operateType}`));
       break; */
/* let onmessage = (e: renderWorkerMessageEvent) => { */
/* let onmessage = (e) => {
     let record = e##data;
     switch record##operateType {
     | INIT_GL =>
       WonderLog.Log.print(("record:", record)) |> ignore;
       StateRenderWorkerService.createState()
       |> InitGlRenderWorkerService.initGl(record)
       |> StateRenderWorkerService.setState(RenderWorkerStateData.renderWorkerStateData)
       |> ignore
     | operateType =>
       WonderLog.Log.fatal(
         WonderLog.Log.buildFatalMessage(
           ~title="render worker->onmessage",
           ~description={j|unknown operateType: $operateType|j},
           ~reason="",
           ~solution={j||j},
           ~params={j||j}
         )
       )
     }
   }; */
/* TODO refactor: extract function */
MostUtils.fromWorkerEvent("message", WorkerService.getSelf())
|> Most.filter((e) => e##data##operateType === "SEND_JOB_DATA" |> Js.Boolean.to_js_boolean)
|> Most.concatMap(
     (e) =>
       WorkerJobService.getRenderWorkerJobStreamArr(
         e##data##pipelineJobs |> Js.Json.parseExn |> Obj.magic,
         e##data##jobs |> Js.Json.parseExn |> Obj.magic,
         RenderWorkerStateData.renderWorkerStateData
       )
       |> ArrayService.push(
            MostUtils.fromWorkerEvent("message", WorkerService.getSelf())
            |> Most.filter((e) => e##data##operateType === "loop" |> Js.Boolean.to_js_boolean)
            |> Most.map((e) => Some(e))
            |> Most.tap(
                 (e) =>
                   WonderLog.Log.log({j|--in other worker-- get message from main worker: loop|j})
               )
            |> Most.concatMap(
                 (e) =>
                   MostUtils.callFunc(
                     () => {
                       WorkerService.getSelf()
                       |> WorkerService.postMessage({"operateType": "finish_loop"});
                       e
                     }
                   )
               )
          )
       |> Most.mergeArray
   )
|> Most.drain;