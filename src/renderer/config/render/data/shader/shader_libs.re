let shader_libs = {|
[
  {
    "name": "common",
    "glsls": [{"type": "vs", "name": "common_vertex"}, {"type": "fs", "name": "common_fragment"}],
    "variables": {
      "uniforms": [
        {"name": "u_vMatrix", "field": "vMatrix", "type": "mat4", "from": "camera"},
        {"name": "u_pMatrix", "field": "pMatrix", "type": "mat4", "from": "camera"}
      ]
    }
  },
  {
    "name": "modelMatrix_noInstance",
    "glsls": [{"type": "vs", "name": "modelMatrix_noInstance_vertex"}],
    "variables": {"uniforms": [{"name": "u_mMatrix", "field": "mMatrix", "type": "mat4", "from": "model"}]}
  },
  {
    "name": "vertex",
    "variables": {"attributes": [{"name": "a_position", "buffer": "vertex", "type": "vec3"}]}
  },
  {
    "name": "basic",
    "glsls": [{"type": "vs", "name": "webgl1_basic_vertex"}]
  },
  {"name": "basic_end", "glsls": [{"type": "fs", "name": "webgl1_basic_end_fragment"}]},
  {"name": "end", "variables": {"attributes": [{"buffer": "index"}]}}
]
|};