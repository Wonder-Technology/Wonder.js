import { common_define, common_fragment, common_function, common_vertex } from "../shader/chunk/ShaderChunk";

export var shaderLib_generator = {
    "CommonShaderLib": {
        "glsl": {
            "vs": {
                "source": common_vertex,
                "define":common_define.define + common_vertex.define,
                "funcDefine":common_function.funcDefine + common_vertex.funcDefine
            },
            "fs": {
                "source": common_fragment,
                "define":common_define.define + common_fragment.define,
                "funcDefine":common_function.funcDefine + common_fragment.funcDefine
            }
        },
        "send": {
            "attribute": [
                {
                    "name": "a_position",
                    "buffer": "vertice"
                }
            ],
            "uniform": [
                //todo add more
                {
                    "name": "u_vMatrix",
//          "from": "cmd",
                    "value": ["cmd", "vMatrix"]
                }
            ]
        }
    }
}