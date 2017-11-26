open StateDataType;

let _getInitJobHandles = () => [("init_basic_material", InitBasicMaterialJobSystem.getJob)];

let _getRenderJobHandles = () => [
  ("get_render_array", GetRenderArrayJobSystem.getJob),
  ("get_camera_data", GetCameraDataJobSystem.getJob),
  ("clear_color", ClearColorJobSystem.getJob),
  ("clear_buffer", ClearBufferJobSystem.getJob),
  ("render_basic", RenderBasicJobSystem.getJob)
];

let createJobHandleMap = () =>
  WonderCommonlib.HashMapSystem.fromList(
    List.concat([_getInitJobHandles(), _getRenderJobHandles()])
  );