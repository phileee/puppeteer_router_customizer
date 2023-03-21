const Mercusys = require('../pages/Mercusys');
const puppeteer = require('puppeteer');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const parameters = {
    headless: false,
    slowMo: 100,
    defaultViewport: null,
    args: [
        '--start-maximized'
    ]
}

let password_router;
let login_l2tp;
let password_l2tp;
let VPN_server_l2tp;

readline.question(`Print router password and press ENTER: `, var_1 => {
    password_router = var_1;
    readline.question(`Print login_l2tp and press ENTER: `, var_2 => {
        login_l2tp = var_2;
        readline.question(`Print password_l2tp and press ENTER: `, var_3 => {
            password_l2tp = var_3;
            readline.question(`Print VPN-server_l2tp and press ENTER: `, var_4 => {
                VPN_server_l2tp = var_4;
                internetSetup();
                readline.close();
            });
        });
    });
});



async function internetSetup() {
    const browser = await puppeteer.launch(parameters);
    const page = await browser.newPage();
    
    const mercusys = new Mercusys(page, password_router, login_l2tp, password_l2tp, VPN_server_l2tp)
    await mercusys.getPage();
    await mercusys.getIn();
    await mercusys.getInternetSection();
    await mercusys.selectL2TP();
    await mercusys.clearFields();
    await mercusys.typeFields();
    await mercusys.submitFields();

    await browser.close();
}