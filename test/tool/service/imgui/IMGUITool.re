let buildEmptyIMGUIFuncStr = () => {|function (customData, imguiAPIJsObj, record){ return record; }|};

let getIMGUIFunc = ManageIMGUIMainService.getIMGUIFunc;

let getCustomData = ManageIMGUIMainService.getCustomData;

let getWonderIMGUIRecord = RecordIMGUIMainService.getWonderIMGUIRecord;

let buildSettingJsObj =
    (
      ~textColor=[|1., 1., 1.|],
      /* ~buttonColor=[|1., 0.5, 0.3|],
         ~hoverButtonColor=[|1., 0.5, 0.3|],
         ~clickButtonColor=[|1., 0.5, 0.3|],
         ~radioButtonOuterColor=[|1., 0.5, 0.3|],
         ~radioButtonInnerColor=[|1., 0.5, 0.3|],
         ~radioButtonOuterColorHover=[|1., 0.5, 0.3|],
         ~radioButtonInnerColorHover=[|1., 0.5, 0.3|],
         ~radioButtonCircleSegments=9,
         ~radioButtonInnerRadius=0.9,
         ~radioButtonOuterRadius=0.6,
         ~checkboxOuterColor=[|1., 0.5, 0.3|],
         ~checkboxInnerColor=[|1., 0.5, 0.3|],
         ~checkboxOuterColorHover=[|1., 0.5, 0.3|],
         ~checkboxInnerColorHover=[|1., 0.5, 0.3|],
         ~checkboxInnerSizeRatio=0.9,
         ~checkboxOuterSizeRatio=0.6,
         ~sliderBackgroundColor=[|1., 0.5, 0.3|],
         ~sliderFillColor=[|0.2, 0.5, 0.3|],
         ~sliderBackgroundColorHover=[|1., 0.5, 0.3|],
         ~sliderFillColorHover=[|1., 0.5, 0.3|], */
      ~fontTexUvForWhite=[|0.5, 0.|],
      (),
    ) => {
  "textColor": textColor,
  "fontTexUvForWhite": fontTexUvForWhite,
};

let setTextColorSetting = (textColor, state) => {
  let setting = buildSettingJsObj(~textColor, ());

  (ManageIMGUIAPI.setSetting(setting, state), setting);
};

let getIOData = state => RecordIMGUIMainService.getIOData(state);

let setIOData =
    (ioData, state: StateDataMainType.state): StateDataMainType.state => {
  ...state,
  imguiRecord: {
    ...state.imguiRecord,
    ioData,
  },
};