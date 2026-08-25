import { getOffset, getTotalPages, PAGE_SIZE } from './pagination'

describe('pagination', () => {
  it('uses the default page size', () => {
    expect(PAGE_SIZE).toBe(151)
  })

  it('getOffset returns the offset for a page', () => {
    expect(getOffset(1, 20)).toBe(0)
    expect(getOffset(2, 20)).toBe(20)
  })

  it.skip('getTotalPages rounds up for a partial last page', () => {
    expect(getTotalPages(152, 151)).toBe(2)
  })
})
