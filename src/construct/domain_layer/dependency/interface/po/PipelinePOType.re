type pipelineName = string;

type jobName = string;

type execFunc = unit => WonderBsMost.Most.stream(Result.t2(unit));

type pipelineStream = WonderBsMost.Most.stream(Result.t2(unit));
