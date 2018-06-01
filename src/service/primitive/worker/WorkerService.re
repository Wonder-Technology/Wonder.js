let getSelf = [%bs.raw {|
    function(){
        return self;
    }
    |}];

let _isInOtherWorker = [%bs.raw
  {|
       function(worker) {
           return !!worker.location;
       }
        |}
];

let _logMessage = (data, worker) =>
  _isInOtherWorker(worker) === true ?
    {
      WonderLog.Log.log({j|--in other worker-- post message to main worker:|j});
      WonderLog.Log.logJson(data)
    } :
    {
      WonderLog.Log.log({j|**in main worker** post message to other worker:|j});
      WonderLog.Log.logJson(data)
    };

let postMessage = (data, worker) => {
  /* _logMessage(data, worker); */
  worker |> Worker.postMessage(data)
};

let postMessageWithTransferData = (data, transferData, worker) => {
  /* _logMessage(data, worker); */
  worker |> Worker.postMessageWithTransferData(data, transferData)
};