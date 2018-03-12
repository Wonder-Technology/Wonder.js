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

let postMessage = (record, worker) => {
  /* TODO remove */
  _isInOtherWorker(worker) === Js.true_ ?
    {
      WonderLog.Log.log({j|--in other worker-- post message to main worker:|j});
      WonderLog.Log.logJson(record)
    } :
    {
      WonderLog.Log.log({j|**in main worker** post message to other worker:|j});
      WonderLog.Log.logJson(record)
    };
  worker |> Worker.postMessage(record)
};