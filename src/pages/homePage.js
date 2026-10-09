const BasePage = require('./basePage');

class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  async click_checkoutBtn() {
    const selector = await this.getLocatorFromJson('home', 'cartCheckOutBtn');
    await this.page.locator(selector).click();
    this.page.waitForTimeout(3000)
  }

  async addProductToCart(productName) {
    if (!productName) {
      throw new Error('Product name is required to add an item to the cart.');
    }

    const itemSelector = await this.getLocatorFromJson('home', 'inventoryItemName');
    const itemBtnToCart = await this.getLocatorFromJson('home', 'inventoryItemBtn')
    const shopingCart_visibilityCount = await this.getLocatorFromJson('home', 'shoppingCartBadge')

    const names_product = await this.page.locator(itemSelector).allTextContents()
    const addToCart = await this.page.locator(itemBtnToCart)
    
    for(let i=0; i<names_product.length; i++){
        if(names_product[i].includes(productName)){
            await addToCart.nth(i).click();
            console.log("clicked successfully")
            this.page.waitForTimeout(3000)
        }
    }
    const flag = await this.page.locator(shopingCart_visibilityCount).isVisible();
    if(flag){
        return flag;
    }

  }
}

module.exports = HomePage;