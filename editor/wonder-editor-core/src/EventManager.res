let onCustomEvent = () => {
  //TODO implement
  Obj.magic(1)
}

let trigger = () => {
  //TODO implement
  Obj.magic(1)
}

let buildAPI = (): Type.eventManagerAPI => {
  trigger: trigger->Obj.magic,
  onCustomEvent: onCustomEvent->Obj.magic,
}
