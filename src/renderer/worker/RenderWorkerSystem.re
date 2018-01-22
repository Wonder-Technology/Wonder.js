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
       setIsTest(data.isTest, InitConfigWorkerData).run();
       break;
   case EWorkerOperateType.INIT_DATA:
       setVersion(data.webglVersion, WebGLDetectWorkerData);
       break;
   case EWorkerOperateType.INIT_GL:

       if (isWebgl1(WebGLDetectWorkerData)) {
           _initWebGL1Data();

           state = _initWebGL1GL(data, WebGLDetectWorkerData, GPUDetectWorkerData);
       }
       else {
           _initWebGL2Data();

           state = _initWebGL2GL(data, WebGLDetectWorkerData, GPUDetectWorkerData);
       }

       setState(state, StateWorkerData);

       initState(state, getGL, setSide, DeviceManagerWorkerData);
       break;
   case EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE:
       if (isWebgl1(WebGLDetectWorkerData)) {
           _handleWebGL1InitRenderData(data, AmbientLightWorkerData, WebGL1DirectionLightWorkerData, WebGL1PointLightWorkerData, WebGL1GLSLSenderWorkerData);
       }
       else {
           _handleWebGL2InitRenderData(data, render_config, AmbientLightWorkerData, WebGL2DirectionLightWorkerData, WebGL2PointLightWorkerData, GPUDetectWorkerData, WebGL2GLSLSenderWorkerData);
       }
       break;
   case EWorkerOperateType.DRAW:
       if (isWebgl1(WebGLDetectWorkerData)) {
           _handleWebGL1Draw(data, AmbientLightWorkerData, WebGL1DirectionLightWorkerData, WebGL1PointLightWorkerData, WebGL1GLSLSenderWorkerData, GPUDetectWorkerData, StateWorkerData);
       }
       else {
           _handleWebGL2Draw(data, AmbientLightWorkerData, WebGL2DirectionLightWorkerData, WebGL2PointLightWorkerData, WebGL2GLSLSenderWorkerData, GPUDetectWorkerData, StateWorkerData);
       }
       break;
   default:
       Log.error(true, Log.info.FUNC_UNKNOW(`operateType:${operateType}`));
       break; */
/* let onmessage = (e: renderWorkerMessageEvent) => { */
let onmessage = (e) => {
  let data = e##data;
  switch data##operateType {
  | INIT_GL =>
  WonderLog.Log.print(("data:",  data )) |> ignore;
    RenderWorkerStateSystem.createState()
    |> InitGlSystem.initGL(data)
    |> RenderWorkerStateSystem.setState(RenderWorkerStateData.renderWorkerStateData)
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
};