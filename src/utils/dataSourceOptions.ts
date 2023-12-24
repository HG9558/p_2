export function useMatchSelector() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          label: '上1级',
          value: '1'
        },
        {
          label: '上2级',
          value: '2'
        }
      ]);
    }, 2000);
  });
}
