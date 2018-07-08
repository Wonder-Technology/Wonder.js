open StateDataMainType;

open EventType;

let getLastXY = ({touchEventData}) => (
  touchEventData.lastX,
  touchEventData.lastY,
);

let setLastXY = (lastX, lastY, {touchEventData} as eventRecord) => {
  ...eventRecord,
  touchEventData: {
    lastX,
    lastY,
  },
};