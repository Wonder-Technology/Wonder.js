import { loadFeature, defineFeature, DefineStepFunction } from 'jest-cucumber';
import { createSandbox } from "sinon";
import { exec } from "../../src/jobs/InitWebGPUJob"
import { execJob } from '../tool/JobTool';
import { prepare } from '../tool/PrepareTool';
import { prepareWebGPU } from '../tool/WebGPUTool';
import { getWebGPUExn } from '../../../wonder-commonlib-ts/src/dependency/webgpu/container/DPContainer';
import { convertToStubType } from "../../../wonder-commonlib-ts/src/SinonUtils";

const feature = loadFeature('./test/features/init_webgpu_job.feature');

defineFeature(feature, test => {
    let sandbox
    let states
    let adapter, device

    const _webgpuImplementAreRequired = (given: DefineStepFunction) => {
        given('I have previously set webgpu implement', () => {
            prepareWebGPU(sandbox)
        });

        given('webgpu implement can request adapter and device', () => {
            adapter = {}
            convertToStubType(getWebGPUExn().requestAdapter).returns(
                new Promise((resolve) => {
                    resolve(adapter)
                })
            )
            convertToStubType(getWebGPUExn().requestDevice).returns(
                new Promise((resolve) => {
                    resolve(device)
                })
            )
        });
    };

    beforeEach(() => {
        sandbox = createSandbox();
        prepare()
    });
    afterEach(() => {
        sandbox.restore();
    });

    test('set adapter to po', ({ given, when, then }) => {
        _webgpuImplementAreRequired(given)

        when('I exec job', () => {
            return execJob(exec).then(s => {
                states = s
            })
        });

        then('I can get a adapter from po', () => {
            expect(states
            ["wonder-work-plugin-init-webgpu"].adapter).toEqual(adapter)
        });
    });

    test('set device to po', ({ given, when, then }) => {
        _webgpuImplementAreRequired(given)

        when('I exec job', () => {
            return execJob(exec).then(s => {
                states = s
            })
        });

        then('I can get a device from po', () => {
            expect(states
            ["wonder-work-plugin-init-webgpu"].device).toEqual(device)
        });
    });
})