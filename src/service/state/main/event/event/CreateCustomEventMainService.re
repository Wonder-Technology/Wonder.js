open EventType;

let create = (eventName, userData) => {
  name: eventName,
  target: None,
  phase: None,
  userData,
};