


var buildFakeWorker = (
  function build(param){
  function Worker(path) {
    this.path = path;
  }

  window.Worker = Worker;
  }
  );

export {
  buildFakeWorker ,
  
}
/* buildFakeWorker Not a pure module */
