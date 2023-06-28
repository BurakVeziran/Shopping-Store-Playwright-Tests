export const isDesktopViewport = (page):boolean => {
    const size = page.viewportSize()
    return size.width >= 600
}
