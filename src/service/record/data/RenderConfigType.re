type shaderMapData = {
  name: string,
  value: array(string)
};

/* type shaderStaticBranch = {
     name: string,
     value: array(string)
   }; */
type shaderLibItem = {
  type_: option(string),
  name: string
};

type material_shader = {
  name: string,
  shader_libs: array(shaderLibItem)
};

type shaders = {
  static_branchs: array(shaderMapData),
  groups: array(shaderMapData),
  material_shaders: array(material_shader)
};

type glsl = {
  type_: string,
  name: string
};

type attribute = {
  name: option(string),
  buffer: string,
  type_: option(string)
};

type uniform = {
  name: string,
  field: string,
  type_: string,
  from: string
};

type variables = {
  uniforms: option(array(uniform)),
  attributes: option(array(attribute))
};

type shaderLib = {
  name: string,
  glsls: option(array(glsl)),
  variables: option(variables)
};

type shader_libs = array(shaderLib);

type renderConfigData = {
  shaders,
  shader_libs
};