open POType

open EventType

let getLastXY = ({mouseEventData}) => (mouseEventData.lastX, mouseEventData.lastY)

let setLastXY = (lastX, lastY, {mouseEventData} as eventRecord) => {
  ...eventRecord,
  mouseEventData: {
    ...mouseEventData,
    lastX: lastX,
    lastY: lastY,
  },
}
