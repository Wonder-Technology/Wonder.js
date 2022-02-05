open EventType

let create = (eventName, userData) => {
  name: eventName,
  isStopPropagation: false,
  // target: None,
  phase: None,
  userData: userData,
}
