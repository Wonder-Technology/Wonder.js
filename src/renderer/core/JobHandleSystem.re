open StateDataType;

let createJobHandleMap = () =>
  HashMapSystem.(
    createEmpty()
    |> set("init_basic_material", InitBasicMaterialJobSystem.getJob)
    |> set("get_render_list", GetRenderListJobSystem.getJob)
    |> set("get_camera_data", GetCameraDataJobSystem.getJob)
    |> set("clear_color", ClearColorJobSystem.getJob)
    |> set("clear_buffer", ClearBufferJobSystem.getJob)
    |> set("render_basic", RenderBasicJobSystem.getJob)
  );