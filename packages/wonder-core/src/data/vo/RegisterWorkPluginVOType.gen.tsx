/* TypeScript file generated from RegisterWorkPluginVOType.res by genType. */
/* eslint-disable import/first */


import type {elementName as PipelineType_elementName} from '../../../src/data/PipelineType.gen';

import type {pipelineName as PipelineType_pipelineName} from '../../../src/data/PipelineType.gen';

// tslint:disable-next-line:interface-over-type-literal
export type insertAction = "before" | "after";

// tslint:disable-next-line:interface-over-type-literal
export type jobOrder = {
  readonly pipelineName: PipelineType_pipelineName; 
  readonly insertElementName: PipelineType_elementName; 
  readonly insertAction: insertAction
};

// tslint:disable-next-line:interface-over-type-literal
export type jobOrders = jobOrder[];
