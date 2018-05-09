open RenderConfigType;

let getShaders = ({shaders}) => shaders;

let getShaderLibs = ({shaderLibs}) => shaderLibs;

let getPass = ({pass}) => pass |> OptionService.unsafeGet;