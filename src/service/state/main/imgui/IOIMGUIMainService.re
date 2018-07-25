open StateDataMainType;

let bindEvent = state => {
  let state =
    ManageEventMainService.onCustomGlobalEvent(
      ~eventName=NameEventService.getPointDownEventName(),
      ~handleFunc=
        (. event: EventType.customEvent, {imguiRecord} as state) => {
          ...state,
          imguiRecord: {
            ...imguiRecord,
            ioData: {
              ...imguiRecord.ioData,
              pointDown: true,
            },
          },
        },
      ~state,
      (),
    );

  let state =
    ManageEventMainService.onCustomGlobalEvent(
      ~eventName=NameEventService.getPointUpEventName(),
      ~handleFunc=
        (. event: EventType.customEvent, {imguiRecord} as state) => {
          ...state,
          imguiRecord: {
            ...imguiRecord,
            ioData: {
              ...imguiRecord.ioData,
              pointUp: true,
            },
          },
        },
      ~state,
      (),
    );

  let state =
    ManageEventMainService.onCustomGlobalEvent(
      ~eventName=NameEventService.getPointMoveEventName(),
      ~handleFunc=
        (. event: EventType.customEvent, {imguiRecord} as state) => {
          let pointEvent =
            event.userData
            |> OptionService.unsafeGet
            |> EventType.userDataToPointEvent;

          {
            ...state,
            imguiRecord: {
              ...imguiRecord,
              ioData: {
                ...imguiRecord.ioData,
                pointPosition: pointEvent.locationInView,
                pointMovementDelta: pointEvent.movementDelta,
              },
            },
          };
        },
      ~state,
      (),
    );

  state;
};

let resetPointEventStateWhenPointUp = ({imguiRecord} as state) => {
  open WonderImgui.IMGUIType;

  let {pointUp} = RecordIMGUIMainService.getIOData(state);

  pointUp ?
    {
      ...state,
      imguiRecord: {
        ...imguiRecord,
        ioData: {
          ...imguiRecord.ioData,
          pointUp: false,
          pointDown: false,
        },
      },
    } :
    state;
};