type buildAPI

type init = unit => unit

type setRegisteredWorkPlugin

type saveAllRegisteredWorkPugins

type registerAllSaved = unit => unit

type setAllSavedToState

type getData = {
  buildAPI: buildAPI,
  init: init,
  setRegisteredWorkPlugin: setRegisteredWorkPlugin,
  saveAllRegisteredWorkPugins: saveAllRegisteredWorkPugins,
  registerAllSaved: registerAllSaved,
  setAllSavedToState: setAllSavedToState,
}
