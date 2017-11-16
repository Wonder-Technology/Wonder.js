open StateDataType;

open ShaderChunkType;

open ShaderChunkSystem;

let webgl1_main_begin: string = "void main(void){\n";

let webgl1_main_end: string = "}\n";

let _getPrecisionSource = (highp: glslChunk) =>
  /* todo judge gpu detect data */
  highp.top;

let _generateAttributeSource = (shaderLibDataArr: shader_libs) =>
  shaderLibDataArr
  |> Js.Array.reduce(
       (result: string, {variables}) =>
         switch variables {
         | None => result
         | Some(variables) =>
           switch variables.attributes {
           | None => result
           | Some(attributes) =>
             result
             ++ (
               attributes
               |> Js.Array.reduce(
                    (result: string, {name, type_}: attribute) =>
                      switch (name, type_) {
                      | (Some(name), Some(type_)) => result ++ {j|attribute $type_ $name;
  |j}
                      | (_, _) => result
                      },
                    ""
                  )
             )
           }
         },
       ""
     );

let _isInSource = (key: string, source: string) => Js.String.indexOf(key, source) > (-1);

let _generateUniformSourceType = (type_: string) =>
  switch type_ {
  /* | "float3" => "vec3" */
  | _ => type_
  };

let _generateUniformSource =
    (
      shaderLibDataArr: shader_libs,
      sourceVarDeclare: string,
      sourceFuncDefine: string,
      sourceBody: string
    ) =>
  shaderLibDataArr
  |> Js.Array.reduce(
       (result: string, {variables}) =>
         switch variables {
         | None => result
         | Some(variables) =>
           switch variables.uniforms {
           | None => result
           | Some(uniforms) =>
             result
             ++ (
               uniforms
               |> Js.Array.filter(
                    ({name}: uniform) =>
                      _isInSource(name, sourceVarDeclare)
                      || _isInSource(name, sourceFuncDefine)
                      || _isInSource(name, sourceBody)
                  )
               |> Js.Array.reduce(
                    (result: string, {name, type_}: uniform) => {
                      let type_ = _generateUniformSourceType(type_);
                      result ++ {j|uniform $type_ $name;
|j}
                    },
                    ""
                  )
             )
           }
         },
       ""
     );

let buildGLSLSource =
  [@bs]
  (
    (materialIndex: int, shaderLibDataArr: shader_libs, state: StateDataType.state) => {
      let vs: glslChunk = {
        top: "",
        define: "",
        varDeclare: "",
        funcDeclare: "",
        funcDefine: "",
        body: ""
      };
      let fs: glslChunk = {
        top: "",
        define: "",
        varDeclare: "",
        funcDeclare: "",
        funcDefine: "",
        body: ""
      };
      let _setSource =
          (
            {
              top: sourceTop,
              define: sourceDefine,
              varDeclare: sourceVarDeclare,
              funcDeclare: sourceFuncDeclare,
              funcDefine: sourceFuncDefine,
              body: sourceBody
            } as sourceChunk,
            {top, define, varDeclare, funcDeclare, funcDefine, body}
          ) => {
        sourceChunk.top = sourceTop ++ top;
        sourceChunk.define = sourceDefine ++ define;
        sourceChunk.varDeclare = sourceVarDeclare ++ varDeclare;
        sourceChunk.funcDeclare = sourceFuncDeclare ++ funcDeclare;
        sourceChunk.funcDefine = sourceFuncDefine ++ funcDefine;
        sourceChunk.body = sourceBody ++ body
      };
      vs.body = vs.body ++ webgl1_main_begin;
      fs.body = fs.body ++ webgl1_main_begin;
      fs.top = _getPrecisionSource(getChunk("highp_fragment", state)) ++ fs.top;
      shaderLibDataArr
      |> Js.Array.forEach(
           ({glsls}) =>
             switch glsls {
             | None => ()
             | Some(glsls) =>
               glsls
               |> Js.Array.forEach(
                    ({type_, name}: glsl) =>
                      switch type_ {
                      | "vs" => _setSource(vs, getChunk(name, state))
                      | "fs" => _setSource(fs, getChunk(name, state))
                      | _ => ExceptionHandleSystem.throwMessage({j|unknow glsl type:$type_|j})
                      }
                  )
             }
         );
      vs.body = vs.body ++ webgl1_main_end;
      fs.body = fs.body ++ webgl1_main_end;
      vs.top = vs.top ++ _generateAttributeSource(shaderLibDataArr);
      vs.top =
        vs.top ++ _generateUniformSource(shaderLibDataArr, vs.varDeclare, vs.funcDefine, vs.body);
      fs.top =
        fs.top ++ _generateUniformSource(shaderLibDataArr, fs.varDeclare, fs.funcDefine, fs.body);
      (
        vs.top ++ vs.define ++ vs.varDeclare ++ vs.funcDeclare ++ vs.funcDefine ++ vs.body,
        fs.top ++ fs.define ++ fs.varDeclare ++ fs.funcDeclare ++ fs.funcDefine ++ fs.body
      )
    }
  );