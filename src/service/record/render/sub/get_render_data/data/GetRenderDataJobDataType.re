type outlineData = {outlineColor: array(float)};

type skyboxData = {cubeTexture: option(WonderWebgl.GlType.texture)};

type jobDataRecord = {
  outlineData,
  skyboxData,
};