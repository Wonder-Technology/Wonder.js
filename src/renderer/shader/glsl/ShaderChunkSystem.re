
open ShaderChunkType;

let _getGLSLChunkMap = (state: StateDataType.state) => state.glslChunkData.chunkMap;

let getChunk = (name: string, state: StateDataType.state) =>
  state |> _getGLSLChunkMap |> WonderCommonlib.HashMapSystem.get(name) |> Js.Option.getExn;

let _buildChunk =
    (
      top: string,
      define: string,
      varDeclare: string,
      funcDeclare: string,
      funcDefine: string,
      body: string
    ) => {
  top,
  define,
  varDeclare,
  funcDeclare,
  funcDefine,
  body
};

let initData = () =>

  WonderCommonlib.HashMapSystem.{
    chunkMap:
      createEmpty()
      
|> set("modelMatrix_noInstance_vertex", _buildChunk({|

|},{|

|},{|

|},{|

|},{|

|},{|
mat4 mMatrix = u_mMatrix;
|}))

|> set("modelMatrix_hardware_instance_vertex", _buildChunk({|

|},{|

|},{|

|},{|

|},{|

|},{|
mat4 mMatrix = mat4(a_mVec4_0, a_mVec4_1, a_mVec4_2, a_mVec4_3);
|}))

|> set("modelMatrix_batch_instance_vertex", _buildChunk({|

|},{|

|},{|

|},{|

|},{|

|},{|
mat4 mMatrix = u_mMatrix;
|}))

|> set("webgl1_setPos_mvp", _buildChunk({|

|},{|

|},{|

|},{|

|},{|

|},{|
gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);
|}))

|> set("mediump_fragment", _buildChunk({|
precision mediump float;
precision mediump int;
|},{|

|},{|

|},{|

|},{|

|},{|

|}))

|> set("lowp_fragment", _buildChunk({|
precision lowp float;
precision lowp int;
|},{|

|},{|

|},{|

|},{|

|},{|

|}))

|> set("highp_fragment", _buildChunk({|
precision highp float;
precision highp int;
|},{|

|},{|

|},{|

|},{|

|},{|

|}))

|> set("common_vertex", _buildChunk({|

|},{|


// #export 

// ##name
// aaaa
// ##end

// ##body


// ##end


// #end
|},{|

|},{|

|},{|
// #import * from "common_function"
// mat2 transpose(mat2 m) {
//   return mat2(  m[0][0], m[1][0],   // new col 0
//                 m[0][1], m[1][1]    // new col 1
//              );
//   }

// mat3 transpose(mat3 m) {
//   return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0
//                 m[0][1], m[1][1], m[2][1],  // new col 1
//                 m[0][2], m[1][2], m[2][2]   // new col 1
//              );
//   }

//bool isRenderArrayEmpty(int isRenderArrayEmpty){
//  return isRenderArrayEmpty == 1;
//}
|},{|

|}))

|> set("common_function", _buildChunk({|

|},{|

|},{|

|},{|

|},{|
// mat2 transpose(mat2 m) {
//   return mat2(  m[0][0], m[1][0],   // new col 0
//                 m[0][1], m[1][1]    // new col 1
//              );
//   }

// mat3 transpose(mat3 m) {
//   return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0
//                 m[0][1], m[1][1], m[2][1],  // new col 1
//                 m[0][2], m[1][2], m[2][2]   // new col 1
//              );
//   }

//bool isRenderArrayEmpty(int isRenderArrayEmpty){
//  return isRenderArrayEmpty == 1;
//}
|},{|

|}))

|> set("common_fragment", _buildChunk({|

|},{|

|},{|

|},{|

|},{|

|},{|

|}))

|> set("common_define", _buildChunk({|

|},{|

|},{|

|},{|

|},{|

|},{|

|}))

|> set("webgl1_basic_vertex", _buildChunk({|

|},{|

|},{|

|},{|

|},{|

|},{|
gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);
|}))

|> set("webgl1_basic_fragment", _buildChunk({|

|},{|

|},{|

|},{|

|},{|

|},{|
vec4 totalColor = vec4(u_color, 1.0);
|}))

|> set("webgl1_basic_end_fragment", _buildChunk({|

|},{|

|},{|

|},{|

|},{|

|},{|
gl_FragColor = vec4(totalColor.rgb, totalColor.a);
|}))

  };
