const isChildProcess = !!process.send;
if (isChildProcess) {
  process.send("ready");
}

export function doWork() {
  return "what a worker";
}