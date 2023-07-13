"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsPage = void 0;
const test_1 = require("@playwright/test");
const navigation_1 = require("./navigation");
const isDesktopViewport_1 = require("../ts/isDesktopViewport");
const hooks_1 = require("../features/support/hooks");
class ProductsPage {
    page;
    addButtons;
    sortDropdown;
    productTitle;
    goto;
    constructor(page) {
        this.page = page;
        this.addButtons = hooks_1.fixture.page.locator('[data-qa="product-button"]');
        this.sortDropdown = hooks_1.fixture.page.locator('[data-qa="sort-dropdown"]');
        this.productTitle = hooks_1.fixture.page.locator('[data-qa="product-title"]');
        this.goto = hooks_1.fixture.page.goto("http://localhost:2221/");
    }
    visit = async () => {
        await this.goto;
    };
    addProductToBasket = async (index) => {
        const specificAddButton = this.addButtons.nth(index);
        await specificAddButton.waitFor();
        await (0, test_1.expect)(specificAddButton).toHaveText("Add to Basket");
        const navigation = new navigation_1.Navigation(this.page);
        let basketCountBeforeAdding = await navigation.getBasketCount();
        await specificAddButton.click();
        await (0, test_1.expect)(specificAddButton).toHaveText("Remove from Basket");
        if ((0, isDesktopViewport_1.isDesktopViewport)(hooks_1.fixture.page)) {
            let basketCountAfterAdding = await navigation.getBasketCount();
            (0, test_1.expect)(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
        }
    };
    sortByCheapestSimpleCheck = async () => {
        await this.sortDropdown.waitFor();
        await this.productTitle.first().waitFor();
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts();
        await this.sortDropdown.selectOption("price-asc");
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts();
        (0, test_1.expect)(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting);
    };
    sortByPriceComplexCheck = async (sortOption) => {
        await this.sortDropdown.waitFor();
        await this.productTitle.first().waitFor();
        await this.sortDropdown.selectOption(sortOption);
        let productPrices = await hooks_1.fixture.page.$$eval('[datatype="product-price"]', elements => elements.map(item => item.textContent));
        let output = [];
        for (let i = 0; i < productPrices.length; i++) {
            const text = productPrices[i].slice(0, -1);
            output.push(text);
        }
        let pricesJson = JSON.stringify(output);
        let parsedProductPrices = JSON.parse(pricesJson);
        let firstOption = parseInt(parsedProductPrices[0]);
        let SecondOption = parseInt(parsedProductPrices[1]);
        let thirdOption = parseInt(parsedProductPrices[2]);
        let fourthOption = parseInt(parsedProductPrices[3]);
        let lastOption = parseInt(parsedProductPrices[productPrices.length - 1]);
        if (sortOption === "price-asc") {
            (0, test_1.expect)(lastOption).toBeGreaterThan(firstOption);
            (0, test_1.expect)(lastOption).toBeGreaterThan(fourthOption);
            (0, test_1.expect)(fourthOption).toBeGreaterThan(thirdOption);
            (0, test_1.expect)(thirdOption).toBeGreaterThan(SecondOption);
            (0, test_1.expect)(SecondOption).toBeGreaterThan(firstOption);
        }
        else if (sortOption === "price-desc") {
            (0, test_1.expect)(lastOption).toBeLessThan(firstOption);
            (0, test_1.expect)(lastOption).toBeLessThan(fourthOption);
            (0, test_1.expect)(fourthOption).toBeLessThan(thirdOption);
            (0, test_1.expect)(thirdOption).toBeLessThan(SecondOption);
            (0, test_1.expect)(SecondOption).toBeLessThan(firstOption);
        }
    };
    sortByCheapestComplexCheck = async () => {
        await this.sortByPriceComplexCheck("price-asc");
    };
    sortByMostExpensiveComplexCheck = async () => {
        await this.sortByPriceComplexCheck("price-desc");
    };
    productButtonOperation = async (buttonIndex, operation) => {
        let button = this.addButtons.nth(buttonIndex);
        await button.waitFor();
        await button.click();
        await (0, test_1.expect)(button).toHaveText(operation === 'add' ? "Remove from Basket" : "Add to Basket");
    };
    productCountAdd = async () => {
        const navigation = new navigation_1.Navigation(hooks_1.fixture.page);
        await this.productButtonOperation(0, 'add');
        await this.productButtonOperation(2, 'add');
        await this.productButtonOperation(4, 'add');
        // only desktop viewport
        if ((0, isDesktopViewport_1.isDesktopViewport)(hooks_1.fixture.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount();
            (0, test_1.expect)(basketCountAfterAdding).toBeGreaterThan(0);
            (0, test_1.expect)(basketCountAfterAdding).toBeGreaterThan(1);
            (0, test_1.expect)(basketCountAfterAdding).toBeGreaterThan(2);
            (0, test_1.expect)(basketCountAfterAdding).toBeLessThan(4);
        }
    };
    productCountRemove = async () => {
        const navigation = new navigation_1.Navigation(hooks_1.fixture.page);
        await this.productButtonOperation(0, 'add');
        await this.productButtonOperation(2, 'add');
        await this.productButtonOperation(4, 'add');
        await this.productButtonOperation(2, 'remove');
        await this.productButtonOperation(4, 'remove');
        // only desktop viewport
        if ((0, isDesktopViewport_1.isDesktopViewport)(hooks_1.fixture.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount();
            (0, test_1.expect)(basketCountAfterAdding).toBeGreaterThan(0);
            (0, test_1.expect)(basketCountAfterAdding).toBeLessThan(2);
        }
    };
}
exports.ProductsPage = ProductsPage;
