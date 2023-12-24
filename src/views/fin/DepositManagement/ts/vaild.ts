export function range(min: any, max: any) {
  if ((!min && !max) || (min && max)) {
    return true;
  } else {
    return false;
  }
}
