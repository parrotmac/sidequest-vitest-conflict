# Sidequest / Vitest IPC Conflict

This is a minimal reproduction of an error where a test case that directly or transitively imports the [Sidequest.js](https://sidequestjs.com/) engine.

By design the worker library calls `process.send("ready")` when a worker is started as a child process, but this happens even if the parent process isn't the Sidequest engine. In some cases that might be cool, but sending a message to Vitest results in a failure.

### Structure

`pure/` contains an example using just Vitest

`sidequest` contains an example with Vitest + Sidequest

### Example

```
> test
> vitest run


 RUN  v3.2.6 /Users/isaac/Dev/djnv/repro


⎯⎯⎯⎯ Unhandled Rejection ⎯⎯⎯⎯⎯
Error: [vitest-pool]: Unexpected call to process.send(). Make sure your test cases are not interfering with process's channel.
Received value: "ready"
 ❯ deserialize node_modules/vitest/dist/chunks/coverage.DfSpMS-b.js:2592:11
 ❯ EventEmitter.onMessage node_modules/vitest/dist/chunks/index.B521nVV-.js:89:13
 ❯ EventEmitter.emit node:events:507:28
 ❯ Object.postMessage node_modules/vitest/dist/chunks/coverage.DfSpMS-b.js:2575:37
 ❯ ChildProcess.<anonymous> node_modules/tinypool/dist/index.js:163:86
 ❯ ChildProcess.emit node:events:507:28
 ❯ emit node:internal/child_process:949:14
 ❯ process.processTicksAndRejections node:internal/process/task_queues:91:21

Caused by: Error: Unable to deserialize cloned data due to invalid or unsupported version.
 ❯ Object.deserialize node:v8:435:7
 ❯ deserialize node_modules/vitest/dist/chunks/coverage.DfSpMS-b.js:2586:15
 ❯ EventEmitter.onMessage node_modules/vitest/dist/chunks/index.B521nVV-.js:89:13
 ❯ EventEmitter.emit node:events:507:28
 ❯ Object.postMessage node_modules/vitest/dist/chunks/coverage.DfSpMS-b.js:2575:37
 ❯ ChildProcess.<anonymous> node_modules/tinypool/dist/index.js:163:86
 ❯ ChildProcess.emit node:events:507:28
 ❯ emit node:internal/child_process:949:14
 ❯ process.processTicksAndRejections node:internal/process/task_queues:91:21
```
