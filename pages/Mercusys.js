class Mercusys {
    constructor(page, password_router, login_l2tp, password_l2tp, VPN_server_l2tp) {
        this.page = page;
        this.password_router = password_router;
        this.login_l2tp = login_l2tp;
        this.password_l2tp = password_l2tp;
        this.VPN_server_l2tp = VPN_server_l2tp;
    }

    URL = 'http://mwlogin.net/';

    inputLogin = '.text-text.password-text.password-hidden';
    
    buttonLogin = './/span[text()="ВХОД"]';
    
    internetSettings = './/span[text()="Интернет"]';
    
    internetType = '.combobox-text';

    inputL2TP = ".//span[text()='L2TP/L2TP Россия']";

    inputs = ".//span[@class='text-wrap-inner']/input";

    inputPassword = ".//input[@class='text-text password-text password-hidden  ']";

    inputsSelector = "span[class='text-wrap-inner'] > input";

    passwordSelector = "input[class='text-text password-text password-hidden  ']";

    submitSelector = ".//span[text()='СОХРАНИТЬ']";

    async getPage() {
        await this.page.goto(this.URL);
    }

    async getIn() {
        const inputLoginElement = await this.page.$(this.inputLogin);
        await inputLoginElement.type(this.password_router);
        const [buttonLogin] = await this.page.$x(this.buttonLogin);
        await buttonLogin.click();
    }

    async getInternetSection() {
        await this.page.waitForXPath(this.internetSettings);
        const [internetSetting] = await this.page.$x(this.internetSettings);
        await internetSetting.click();
    }

    async selectL2TP() {
        await this.page.waitForSelector(this.internetType);
        const internetTypeArray = await this.page.$$(this.internetType); 
        await internetTypeArray[0].click();

        const inputL2TPArray = await this.page.$x(this.inputL2TP);
        await inputL2TPArray[1].click();
    }

    async clearFields() {
        await this.page.evaluate((inputsSelector, passwordSelector) => {
            const inputArray = Array.from(document.querySelectorAll(inputsSelector));
            const passwordArray = Array.from(document.querySelectorAll(passwordSelector));
            inputArray.concat(passwordArray).forEach(el => el.value = "")
        }, this.inputsSelector, this.passwordSelector);
    }

    async typeFields() {
        const inputsArray = await this.page.$x(this.inputs);
        await inputsArray[0].type(this.login_l2tp);
        await inputsArray[1].type(this.VPN_server_l2tp);
        
        const [inputPasswordField] = await this.page.$x(this.inputPassword);
        await inputPasswordField.type(this.password_l2tp);
    }

    async submitFields() {
        const submitButtons = await this.page.$x(this.submitSelector);
        await submitButtons[1].click();
    }
}

module.exports = Mercusys;