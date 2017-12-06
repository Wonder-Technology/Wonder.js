let getShaderData = (state: StateDataType.state) => state.shaderData;

let getGLSLData = (state: StateDataType.state) => getShaderData(state).glslData;