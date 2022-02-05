


function onCustomEvent(param) {
  return 1;
}

function trigger(param) {
  return 1;
}

function buildAPI(param) {
  return {
          trigger: trigger,
          onCustomEvent: onCustomEvent
        };
}

export {
  onCustomEvent ,
  trigger ,
  buildAPI ,
  
}
/* No side effect */
