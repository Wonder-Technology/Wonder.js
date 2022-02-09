/* TypeScript file generated from IWorkForJs.res by genType. */
/* eslint-disable import/first */


import type {Stream as $$stream} from 'most';

import type {pipelineData as PipelineType_pipelineData} from '../../src/data/PipelineType.gen';

import type {pipelineName as PipelineType_pipelineName} from '../../src/data/PipelineType.gen';

// tslint:disable-next-line:interface-over-type-literal
export type jobName = string;

// tslint:disable-next-line:interface-over-type-literal
export type stream<a> = $$stream<a>;

// tslint:disable-next-line:interface-over-type-literal
export type execFunc<states> = (_1:states) => stream<states>;

// tslint:disable-next-line:interface-over-type-literal
export type getExecFunc<states> = (_1:PipelineType_pipelineName, _2:jobName) => (null | undefined | execFunc<states>);

// tslint:disable-next-line:interface-over-type-literal
export type pipelineData = PipelineType_pipelineData;

// tslint:disable-next-line:interface-over-type-literal
export type createStateFunc<state> = () => state;

// tslint:disable-next-line:interface-over-type-literal
export type initFunc<state> = (_1:state) => void;

// tslint:disable-next-line:interface-over-type-literal
export type pluginName = string;

// tslint:disable-next-line:interface-over-type-literal
export type allPipelineData = pipelineData[];

// tslint:disable-next-line:interface-over-type-literal
export type registeredWorkPlugin<state,states> = {
  readonly pluginName: pluginName; 
  readonly createStateFunc: createStateFunc<state>; 
  readonly initFunc: initFunc<state>; 
  readonly getExecFunc: getExecFunc<states>; 
  readonly allPipelineData: allPipelineData
};

// tslint:disable-next-line:interface-over-type-literal
export type getRegisteredWorkPluginData<state,config,states> = (_1:config) => registeredWorkPlugin<state,states>;
