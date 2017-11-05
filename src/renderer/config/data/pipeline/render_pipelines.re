let render_pipelines = {|
{
  "simple_basic_render": [
    {"job": "get_render_list"},
    {"job": "get_camera_data"},
    {"job": "clear_color", "flags": ["#000000"]},
    {"job": "clear_buffer", "flags": ["COLOR_BUFFER", "DEPTH_BUFFER", "STENCIL_BUFFER"]},
    {"job": "render_basic"}
  ]
}
|};