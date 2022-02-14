"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
// class CustomProcessor extends DisplayProcessor {
//     public displayJasmineStarted(info: SuiteInfo, log: unknown): unknown {
//         return `${log}`;
//     }
// }
jasmine.getEnv().clearReporters();
// jasmine.getEnv().addReporter(new SpecReporter({
//     spec: {
//         displayStacktrace: StacktraceOption.NONE
//     },
//     customProcessors: [CustomProcessor],
// }));
jasmine.getEnv().addReporter(new jasmine_spec_reporter_1.SpecReporter());
