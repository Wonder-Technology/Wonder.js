open POType

open EventType

let getLastXY = ({touchEventData}) => (touchEventData.lastX, touchEventData.lastY)

let setLastXY = (lastX, lastY, {touchEventData} as eventRecord) => {
  ...eventRecord,
  touchEventData: {
    ...touchEventData,
    lastX: lastX,
    lastY: lastY,
  },
}
