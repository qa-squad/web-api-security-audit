import { chromium } from 'playwright';
import fs from "fs";

async function runAudit() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const url = process.argv[2] || 'https://example.com';

    const consoleErrors: string[] = [];

    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });

    const response = await page.goto(url);

    const title = await page.title();

    await page.screenshot({
        path: 'screenshots/homepage.png',
        fullPage: true
    });

    const report = {
        url,
        title,
        status: response?.status(),
        consoleErrors
    };

    fs.writeFileSync(
        'sample-reports/basic-report.json',
        JSON.stringify(report, null, 2)
    );

    console.log('Audit Complete');
    console.log(report);

    await browser.close();
}

runAudit();