export function shakeParams(target: any = {}, source: any = {}) {
  for (const p of Object.keys(target)) {
    target[p] = source[p];
  }
  return target;
}
