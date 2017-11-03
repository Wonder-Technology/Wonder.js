let shader_libs = {|
[
  {
    "name": "common",
    "glsls": [{"type": "vs", "name": "common_vertex"}, {"type": "fs", "name": "common_vertex"}],
    "variables": {
      "uniforms": [
        {"name": "u_vMatrix", "field": "vMatrix", "type": "mat4", "from": "camera"},
        {"name": "u_pMatrix", "field": "pMatrix", "type": "mat4", "from": "camera"}
      ]
    }
  },
  {
    "name": "model_matrix_no_instance",
    "glsls": [{"type": "vs", "name": "modelMatrix_noInstance_vertex"}],
    "variables": {"uniforms": [{"name": "u_mMatrix", "field": "mMatrix", "type": "mat4", "from": "model"}]}
  },
  {
    "name": "common_vertex",
    "glsls": [{"type": "vs", "name": "modelMatrix_noInstance_vertex"}],
    "variables": {"attributes": [{"name": "a_position", "buffer": "vertex", "type": "vec3"}]}
  },
  {
    "name": "basic",
    "glsls": [{"name": "vs", "name": "webgl1_setPos_mvp"}]
  },
  {"name": "basic_end", "glsls": [{"name": "fs", "name": "webgl1_basic_end_fragment"}]},
  {"name": "end", "variables": {"attributes": [{"buffer": "index"}]}}
]
|};