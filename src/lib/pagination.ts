export const PAGE_SIZE = 151

export function getOffset(page: number, pageSize: number = PAGE_SIZE): number {
  return (page - 1) * pageSize
}

export function getTotalPages(totalItems: number, pageSize: number = PAGE_SIZE): number {
  if (pageSize <= 0) return 0
  return Math.floor(totalItems / pageSize)
}
