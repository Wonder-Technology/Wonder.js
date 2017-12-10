open StateDataType;

let _getInitJobHandles = () => [
 ("preget_glslData", PregetGLSLDataJobUtils.getJob),
("init_basic_material", InitBasicMaterialJobUtils.getJob)];

let _getRenderJobHandles = () => [
  ("get_render_array", GetRenderArrayJobUtils.getJob),
  ("get_camera_data", GetCameraDataJobUtils.getJob),
  ("clear_color", ClearColorJobUtils.getJob),
  ("clear_buffer", ClearBufferJobUtils.getJob),
  ("render_basic", RenderBasicJobUtils.getJob)
];

let createJobHandleMap = () =>
  WonderCommonlib.HashMapSystem.fromList(
    List.concat([_getInitJobHandles(), _getRenderJobHandles()])
  );