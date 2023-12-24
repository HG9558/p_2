const compact = (arr: any[]): any => arr.filter(Boolean);

/**
 * 类似path.resolve
 * @param args
 */
export const _resolve = (...args: string[]): string => {
  const resolveArr: string[] = [];
  args = compact(args);
  for (let i = 0; i < args.length; i++) {
    resolveArr.push(args[i].replace('./', ''));
  }
  return resolveArr.join('/');
};
