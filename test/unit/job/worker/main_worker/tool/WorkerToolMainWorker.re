let buildFakeWorker = [%bs.raw
  {|
  function build(){
  function Worker(path) {
    this.path = path;
  }

  window.Worker = Worker;
  }
  |}
];