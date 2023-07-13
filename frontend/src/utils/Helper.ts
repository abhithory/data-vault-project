export function bytesToMB(inByte: number): string {
    return (inByte / 1000000).toFixed(3) + " MB"
}

