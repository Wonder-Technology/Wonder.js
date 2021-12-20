Feature: InitWebGPU Job
    As a Job
    I want to init webgpu
    So that I can use webgpu

    Background: webgpu implement are required
        Given I have previously set webgpu implement
        Given webgpu implement can request adapter and device

    Scenario: set adapter to po
        When I exec job
        Then I can get a adapter from po

    Scenario: set device to po
        When I exec job
        Then I can get a device from po
