open PipelineDOType;

let _findGroup = (groupName, groups) => {
  switch (groups->ListSt.getBy(({name}: group) => {name === groupName})) {
  | None => Result.failWith({j|groupName:$groupName not in groups|j})
  | Some(group) => group->Result.succeed
  };
};

let _buildJobStream = execFunc => {
  MostUtils.callStreamFunc(execFunc);
};

let _buildJobStreams = (elements, groups, buildPipelineStreamFunc) =>
  elements->ListSt.traverseReduceResultM(
    [], (streams, {name, type_}: element) => {
    switch (type_) {
    | Job =>
      JobDoService.getExecFunc(name)
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
  _buildJobStreams(elements, groups, _buildPipelineStream)
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
  ->Result.bind(group => {_buildPipelineStream(group, groups)})
  ->Result.mapSuccess(Tuple2.create(PipelineEntity.create(name)));
};
