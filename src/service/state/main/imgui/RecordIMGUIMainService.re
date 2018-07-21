open StateDataMainType;

open IMGUIType;

let getWonderIMGUIRecord = state => state.imguiRecord.wonderImguiIMGUIRecord;

let getIOData = state => state.imguiRecord.ioData;

let create = () => {
  ioData: {
    pointUp: false,
    pointDown: false,
    pointPosition: (0, 0),
    pointMovementDelta: (0, 0),
  },
  wonderImguiIMGUIRecord: WonderImgui.ManageIMGUIService.createRecord(),
};