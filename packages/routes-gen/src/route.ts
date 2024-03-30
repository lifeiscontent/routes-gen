export function route<T extends string>(path: T, params: Record<string, any> = {}): T {
  if (!path.includes('?') && !path.includes(':')) {
    return path;
  }

  let realPath = "";
  let currentIndex = path.length;
  let lastSegmentHadParam = false;

  while (currentIndex > 0) {
    const startSegmentIndex = path.lastIndexOf('/', currentIndex);
    const segment = path.slice(startSegmentIndex, currentIndex + 1);
    currentIndex = startSegmentIndex - 1;

    if (segment.startsWith('/:')) {
      const paramName = segment.endsWith('?') ? segment.slice(2, -1) : segment.slice(2);
      const paramValue = params[paramName];
      if (paramValue !== undefined) {
        lastSegmentHadParam = true;
        realPath = '/' + paramValue + realPath;
      }
    } else if (segment.endsWith('?')) {
      if (lastSegmentHadParam) {
        realPath = segment.slice(0, -1) + realPath;
      }
    } else {
      lastSegmentHadParam = false;
      realPath = segment + realPath;
    }
  }

  return realPath as T;
}
