let shaders = {|
{
  "groups": [
      {"name": "top", "value": ["common", "model_matrix_no_instance", "vertice_common"]},
      {"name": "end", "value": ["end"]}
  ],
  "basic_material": [
    {
      "name": "basic_render",
      "shader_libs": [
        {"type": "group", "name": "top"},
        {"name": "basic"},
        {"name": "basic_end"},
        {"type": "group", "name": "end"}
      ]
    }
  ]
}
|};