open StateDataMainType;

let getSceneViewSize = state => {
  /* let (_, _, width, height) =
       SceneViewEditorService.unsafeGetViewRect(editorState);

     (width, height); */
  let canvas =
    ViewService.unsafeGetCanvas(state.viewRecord)
    |> WonderWebgl.DomExtendType.htmlElementToJsObj;

  (canvas##width, canvas##height);
};

let convertMouselocationInViewToNDC =
    ((x, y), (viewWidth, viewHeight)): CoordinateType.mouseData => {
  x:
    (x |> NumberType.convertIntToFloat)
    /. (viewWidth |> NumberType.convertIntToFloat)
    *. 2.
    -. 1.,
  y:
    1.
    -. (y |> NumberType.convertIntToFloat)
    /. (viewHeight |> NumberType.convertIntToFloat)
    *. 2.,
};

let convertPosFromWorldToLocalCoordSystem = (pos, mMatrix, state) =>
  Vector3Service.transformMat4Tuple(
    pos,
    mMatrix
    |> Matrix4Service.invert(_, Matrix4Service.createIdentityMatrix4()),
  );