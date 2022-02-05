const vertexShader = `
[[block]] struct Uniforms {
  modelMatrix : mat4x4<f32>;
};

[[binding(0), group(0)]] var<uniform> uniforms : Uniforms;

    [[stage(vertex)]]
    fn main([[location(0)]] aVertexPosition:vec3<f32>) -> [[builtin(position)]] vec4<f32> {
      return uniforms.modelMatrix * vec4<f32>(aVertexPosition, 1.0);
    }
`;

const fragmentShader = `
[[block]] struct Colors {
  color: vec3<f32>;
};

[[binding(0), group(1)]] var<uniform> colors : Colors;

[[stage(fragment)]]
fn main([[builtin(position)]] coord_in: vec4<f32>) -> [[location(0)]] vec4<f32> {
  return vec4<f32>(colors.color, 1.0);
}
`;

// const fragmentShader = `
// [[block]] struct Color {
//   randomVal: vec3<f32>;
// };

// [[binding(0), group(1)]] var<uniform> color : Color;

// [[stage(fragment)]]
// fn main([[builtin(position)]] coord_in: vec4<f32>) -> [[location(0)]] vec4<f32> {
//   // return vec4<f32>(coord_in.z, 1.0, 0.0, 1.0);
//   return vec4<f32>(coord_in.z,coord_in.z + color.randomVal.x * 0.1 ,0.0, 1.0);
// }
// `;


export { vertexShader, fragmentShader }