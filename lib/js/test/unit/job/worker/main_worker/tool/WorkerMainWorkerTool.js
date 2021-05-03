'use strict';


var buildFakeWorker = (
  function build(param){
  function Worker(path) {
    this.path = path;
  }

  window.Worker = Worker;
  }
  );

exports.buildFakeWorker = buildFakeWorker;
/* buildFakeWorker Not a pure module */
