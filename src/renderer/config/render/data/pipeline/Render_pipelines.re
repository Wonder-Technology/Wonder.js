let render_pipelines = {|
[
  {"name": "simple_basic_render", "jobs":[
    {"name": "get_render_array"},
    {"name": "get_camera_data"},
    {"name": "clear_color", "flags": ["#000000"]},
    {"name": "clear_buffer", "flags": ["COLOR_BUFFER", "DEPTH_BUFFER", "STENCIL_BUFFER"]},
    {"name": "render_basic"}
  ]}
]
|};