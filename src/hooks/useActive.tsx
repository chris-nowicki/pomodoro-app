export function useActive(item: string, itemCompare: string): boolean {
    if (item !== itemCompare) return false

    return true
}
