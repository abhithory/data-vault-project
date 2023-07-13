export function bytesToMB(inByte: number): string {
    return (inByte / 1000000).toFixed(3) + " MB"
}

export function formatTimeSecToString(secs: number) {
    return (new Date(secs * 1000)).toString();
  }