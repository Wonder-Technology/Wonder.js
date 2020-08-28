open PipelineDOType;

let _findGroup = (groupName, groups) => {
  switch (groups->ListSt.getBy(({name}: group) => {name === groupName})) {
  | None => Result.failWith({j|groupName:$groupName not in groups|j})
  | Some(group) => group->Result.succeed
  };
};

// TODO test: should test execFunc->result->fail case
let _buildJobStream = execFunc => {
  WonderBsMost.Most.(
    execFunc
    ->just
    ->flatMap(func => func(), _)
    ->flatMap(
        result => {result->Result.either(s => s->just, f => f->throwError)},
        _,
      )
  );
};

let _buildJobStreams =
    ((pipelineName, elements), groups, buildPipelineStreamFunc) =>
  elements->ListSt.traverseReduceResultM(
    [], (streams, {name, type_}: element) => {
    switch (type_) {
    | Job =>
      JobDoService.getExecFunc(pipelineName, name)
      ->OptionSt.get
      ->Result.mapSuccess(execFunc => {
          streams->ListSt.push(execFunc->_buildJobStream)
        })
    | Group =>
      _findGroup(name, groups)
      ->Result.bind(group => {buildPipelineStreamFunc(group, groups)})
      ->Result.mapSuccess(stream => {streams->ListSt.push(stream)})
    }
  });

let rec _buildPipelineStream = ({name, link, elements}, groups) =>
  _buildJobStreams((name, elements), groups, _buildPipelineStream)
  ->Result.mapSuccess(streams => {
      streams
      ->ListSt.toArray
      ->{
          switch (link) {
          | Merge => WonderBsMost.Most.mergeArray
          | Concat => MostUtils.concatArray
          };
        }
    });

let parse = ({name, groups, firstGroup}) => {
  _findGroup(firstGroup, groups)
  ->Result.bind(group => {
      _buildPipelineStream(group, groups)
      ->Result.mapSuccess(pipelineStream => {
          pipelineStream
          ->Obj.magic
          ->WonderBsMost.Most.recoverWith(
              err => WonderBsMost.Most.just(err->Result.fail),
              _,
            )
        })
    })
  ->Result.mapSuccess(Tuple2.create(PipelineEntity.create(name)));
};
