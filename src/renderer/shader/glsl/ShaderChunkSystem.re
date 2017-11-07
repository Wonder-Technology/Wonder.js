open Contract;

open ShaderChunkType;

let _getGLSLChunkMap = (state: StateDataType.state) => state.glslChunkData.chunkMap;

let getChunk = (name: string, state: StateDataType.state) =>
  state |> _getGLSLChunkMap |> HashMapSystem.get(name) |> Js.Option.getExn;

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

/* todo auto write by glsl compiler */
let initData = () =>
  HashMapSystem.{
    chunkMap:
      createEmpty()
      |> set(
           "highp_fragment",
           _buildChunk({|
precision highp float;
precision highp int;
      |}, "", "", "", "", "")
         )
      |> set("common_vertex", _buildChunk("", "", "", "", "", ""))
      |> set("common_fragment", _buildChunk("", "", "", "", "", ""))
      |> set(
           "modelMatrix_noInstance_vertex",
           _buildChunk(
             "",
             "",
             "",
             "",
             {|

mat4 getModelMatrix(){
    return u_mMatrix;
}
      |},
             {|
mat4 mMatrix = getModelMatrix();
      |}
           )
         )
      |> set(
           "webgl1_basic_vertex",
           _buildChunk(
             "",
             "",
             "",
             "",
             "",
             {|
gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);
      |}
           )
         )
      |> set(
           "webgl1_basic_end_fragment",
           _buildChunk(
             "",
             "",
             "",
             "",
             "",
             {|
gl_FragColor = vec4(1.0,0.5,1.0, 1.0);
      |}
           )
         )
  };