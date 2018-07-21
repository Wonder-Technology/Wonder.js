let buildEmptyIMGUIFuncStr = () => {|function (customData, apiJsObj, record){ return record; }|};

let getIMGUIFunc = ManageIMGUIMainService.getIMGUIFunc;

let getCustomData = ManageIMGUIMainService.getCustomData;

let getWonderIMGUIRecord = RecordIMGUIMainService.getWonderIMGUIRecord;

let buildSettingJsObj =
    (
      ~textColor=[|1., 1., 1.|],
      ~buttonColor=[|1., 1., 1.|],
      ~hoverButtonColor=[|1., 1., 1.|],
      ~clickButtonColor=[|1., 1., 1.|],
      ~fontTexUvForWhite=[|1., 1.|],
      (),
    ) => {
  "textColor": textColor,
  "buttonColor": buttonColor,
  "hoverButtonColor": hoverButtonColor,
  "clickButtonColor": clickButtonColor,
  "fontTexUvForWhite": fontTexUvForWhite,
};

let setTextColorSetting = (textColor, state) => {
  let setting = buildSettingJsObj(~textColor, ());

  (ManageIMGUIAPI.setSetting(setting, state), setting);
};

let setButtonColorSetting =
    ((buttonColor, hoverButtonColor, clickButtonColor), state) => {
  let setting =
    buildSettingJsObj(
      ~buttonColor,
      ~hoverButtonColor,
      ~clickButtonColor,
      (),
    );

  (ManageIMGUIAPI.setSetting(setting, state), setting);
};

let getIOData = (state) => RecordIMGUIMainService.getIOData(state);

let setIOData =
    (ioData, state: StateDataMainType.state)
    : StateDataMainType.state => {
  ...state,
  imguiRecord: {
    ...state.imguiRecord,
    ioData,
  },
};