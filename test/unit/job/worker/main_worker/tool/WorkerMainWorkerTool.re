let buildFakeWorker = [%bs.raw
  {|
  function build(param){
  function Worker(path) {
    this.path = path;
  }

  window.Worker = Worker;
  }
  |}
];