let createDefaultButtonSkinData = () =>
  WonderImgui.ExtendButton.Skin.createDefaultSkinData();

let _addSkinData = (~state, ~color) => {
  open ExtendIMGUIAPI;

  let allCustomStyleData = createAllCustomStyleData();

  let singleCustomStyleData = createSingleCustomStyleData();

  let singleCustomStyleData =
    singleCustomStyleData |> addCustomStyleData("color", color |> Obj.magic);

  let skinName = "Skin1";
  let customStyleName = "CustomStyle1";

  let allCustomStyleData =
    allCustomStyleData
    |> addSingleCustomStyleData(customStyleName, singleCustomStyleData);

  (
    createSkinData(createDefaultButtonSkinData(), allCustomStyleData)
    |> ExtendIMGUIAPI.addSkinData(skinName, _, state),
    (skinName, customStyleName),
  );
};

let addExtendData = state => {
  let rectData = (1, 2, 10, 11);

  let customControlName = "A1";

  let (state, (skinName, customStyleName)) =
    state |> _addSkinData(~state=_, ~color=[|0.5, 1., 2.|]);

  let state =
    state
    |> ExtendIMGUIAPI.registerCustomControl(
         customControlName,
         (. customControlFuncData, showData, apiJsObj, record) => {
           let rect = customControlFuncData |> Obj.magic;

           let apiJsObj = apiJsObj |> Obj.magic;

           let drawBox = apiJsObj##drawBox;

           let parseShowData = apiJsObj##parseShowData;
           let unsafeGetSkinData = apiJsObj##unsafeGetSkinData;
           let unsafeGetSingleCustomStyleDataMap =
             apiJsObj##unsafeGetSingleCustomStyleDataMap;

           let unsafeGetCustomStyleData = apiJsObj##unsafeGetCustomStyleData;

           let hasSingleCustomStyleName = apiJsObj##hasSingleCustomStyleName;

           let parseSingleCustomStyleName =
             apiJsObj##parseSingleCustomStyleName;

           let hasCustomStyleData = apiJsObj##hasCustomStyleData;

           let (skinName, singleCustomStyleNameNullable) =
             parseShowData(. showData);

           let defaultColor = [|0.5, 0.1, 0.2|];

           let color =
             hasSingleCustomStyleName(. singleCustomStyleNameNullable) ?
               {
                 let singleCustomStyleName =
                   parseSingleCustomStyleName(.
                     singleCustomStyleNameNullable,
                   );

                 let singleCustomStyleDataMap =
                   unsafeGetSingleCustomStyleDataMap(.
                     singleCustomStyleName,
                     unsafeGetSkinData(. skinName, record),
                   );

                 hasCustomStyleData(. "color", singleCustomStyleDataMap) ?
                   unsafeGetCustomStyleData(.
                     "color",
                     singleCustomStyleDataMap,
                   ) :
                   defaultColor;
               } :
               defaultColor;

           let record = drawBox(. rect, color, record);

           (record, true |> Obj.magic);
         },
       );

  let state =
    ManageIMGUIAPI.setIMGUIFunc(
      (rectData, customControlName, (skinName, customStyleName)) |> Obj.magic,
      (. customData, imguiAPIJsObj, state) => {
        let (
          (x1, y1, w1, w2),
          customControlName,
          (skinName, customStyleName),
        ) =
          customData |> Obj.magic;

        let imguiAPIJsObj = Obj.magic(imguiAPIJsObj);

        let unsafeGetCustomControl = imguiAPIJsObj##unsafeGetCustomControl;

        let getWonderImguiIMGUIRecord =
          imguiAPIJsObj##getWonderImguiIMGUIRecord;
        let setWonderImguiIMGUIRecord =
          imguiAPIJsObj##setWonderImguiIMGUIRecord;

        let customControl =
          unsafeGetCustomControl(. customControlName, state);

        let record = getWonderImguiIMGUIRecord(. state);

        let (record, _) =
          customControl(.
            (x1, y1, w1, w2),
            Js.Nullable.return((skinName, customStyleName)),
            record,
          );

        let state = setWonderImguiIMGUIRecord(. record, state);

        state;
      },
      state,
    );

  state;
};

let judgeColorBufferData = (bufferData, bufferDataCallCountAfterInit) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        Sinon.(
          bufferData
          |> getCall(bufferDataCallCountAfterInit + 1)
          |> getSpecificArg(1)
          |> Array.of_list
          |> expect == [|0.5, 1., 2., 0.5, 1., 2., 0.5, 1., 2., 0.5, 1., 2.|]
        )
      )
    )
  );