// import { common_define, common_fragment, common_function, common_vertex } from "../shader/chunk/ShaderChunk";
// import { ShaderLib } from "./ShaderLib";
//
// add init, sendShaderVariables func to material->init, send
//
// export var create = () => {
//
// }
//
// export var init = (lib:ShaderLib, ShaderLibData:any) => {
//     var index = lib.index;
//
//     ShaderLibData.vsChunkMap[index] = common_vertex;
//     ShaderLibData.fsChunkMap[index] = common_vertex;
//
//     ShaderLibData.vsChunkSectionMap[index] = {
//         define:common_define.define + common_vertex.define,
//         funcDefine:common_function.funcDefine + common_vertex.funcDefine
//     }
//
//     ShaderLibData.fsChunkSectionMap[index] = {
//         define:common_define.define + common_fragment.define,
//         funcDefine:common_function.funcDefine + common_fragment.funcDefine
//     }
//
//     //node: not add xxx variable any more
// }
//
// export var sendShaderVariables = (program: Program, cmd: QuadCommand, material: IMaterial) => {
//     this.sendUniformData(program, "u_vMatrix", cmd.vMatrix);
//     this.sendUniformData(program, "u_pMatrix", cmd.pMatrix);
//     this.sendUniformData(program, "u_mMatrix", cmd.mMatrix);
// }
