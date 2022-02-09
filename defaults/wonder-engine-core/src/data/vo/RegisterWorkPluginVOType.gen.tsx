/* TypeScript file generated from RegisterWorkPluginVOType.res by genType. */
/* eslint-disable import/first */


import type {PipelineType_elementName as WonderEngineCoreType_PipelineType_elementName} from 'wonder-engine-core-type/WonderEngineCoreType.gen';

import type {PipelineType_pipelineName as WonderEngineCoreType_PipelineType_pipelineName} from 'wonder-engine-core-type/WonderEngineCoreType.gen';

// tslint:disable-next-line:interface-over-type-literal
export type insertAction = "before" | "after";

// tslint:disable-next-line:interface-over-type-literal
export type jobOrder = {
  readonly pipelineName: WonderEngineCoreType_PipelineType_pipelineName; 
  readonly insertElementName: WonderEngineCoreType_PipelineType_elementName; 
  readonly insertAction: insertAction
};

// tslint:disable-next-line:interface-over-type-literal
export type jobOrders = jobOrder[];
