open StateDataMainType;

let getGameTime = (state) => TimeControllerService.getGameTime(state.timeControllerRecord);

let getFps = (state) => TimeControllerService.getFps(state.timeControllerRecord);