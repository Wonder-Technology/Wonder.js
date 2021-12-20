import { loadFeature, defineFeature } from 'jest-cucumber';
import { createSandbox } from "sinon";
import { exec } from "../../src/jobs/GetContextJob"
import { execJob } from '../tool/JobTool';
import { prepare } from '../tool/PrepareTool';
import { buildFakeCanvas } from '../tool/SceneGraphRepoTool';

const feature = loadFeature('./test/features/get_context_job.feature');

defineFeature(feature, test => {
  let sandbox
  let states

  beforeEach(() => {
    sandbox = createSandbox();
    prepare()
  });
  afterEach(() => {
    sandbox.restore();
  });

  test('Set context to po', ({
    when,
    then
  }) => {
    let context

    when('I exec job', () => {
      let [canvas, c] = buildFakeCanvas()
      context = c

      return execJob(exec, canvas).then(s => {
        states = s
      })
    });

    then('I can get a context from po', () => {
      expect(states
      ["wonder-work-plugin-init-webgpu"].context).toEqual(context)
    });
  });
});