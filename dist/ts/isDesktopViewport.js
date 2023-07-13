"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDesktopViewport = void 0;
const hooks_1 = require("../features/support/hooks");
const isDesktopViewport = (page) => {
    const size = hooks_1.fixture.page.viewportSize();
    return size.width >= 600;
};
exports.isDesktopViewport = isDesktopViewport;
