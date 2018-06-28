let convertGLTFToWD = (gltfFileContent: string) =>
  ConvertGLTFSystem.convert(gltfFileContent);

let convertGLBToWD = glb => ConvertGLTFSystem.convertGlb(glb);