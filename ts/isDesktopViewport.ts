import {fixture} from "../features/support/hooks";
export const isDesktopViewport = (page):boolean => {
    const size = fixture.page.viewportSize()
    return size.width >= 600
}
