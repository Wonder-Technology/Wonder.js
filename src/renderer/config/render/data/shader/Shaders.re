let shaders = {|
{
  "static_branchs": [
    {
      "name": "modelMatrix_instance",
      "value": [
        "modelMatrix_noInstance",
        "modelMatrix_hardware_instance",
        "modelMatrix_batch_instance"
      ]
    }
  ],
  "groups": [
    {
      "name": "top",
      "value": [
        "common",
        "vertex"
      ]
    },
    {
      "name": "end",
      "value": [
        "end"
      ]
    }
  ],
  "basic_material": {
    "material_shader": {
      "shader_libs": [
        {
          "type": "group",
          "name": "top"
        },
        {
          "type": "static_branch",
          "name": "modelMatrix_instance"
        },
        {
          "name": "basic"
        },
        {
          "name": "basic_end"
        },
        {
          "type": "group",
          "name": "end"
        }
      ]
    }
  }
}
|};