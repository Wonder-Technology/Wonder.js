open StateDataMainType;

open EventType;

let getLastXY = ({mouseEventData}) => (
  mouseEventData.lastX,
  mouseEventData.lastY,
);