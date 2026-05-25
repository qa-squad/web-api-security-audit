import { chromium } from 'playwright';
import fs from "fs";
import { checkSecurityHeaders } from '../utils/securityHeaders';

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
    const headers = response?.headers() || {};
    const securityHeaders = checkSecurityHeaders(headers);

    await page.screenshot({
        path: 'screenshots/homepage.png',
        fullPage: true
    });

    const report = {
        url,
        title,
        status: response?.status(),
        consoleErrors,
        securityHeaders,
    };

    fs.writeFileSync(
        'sample-reports/basic-report.json',
        JSON.stringify(report, null, 2)
    );

    console.log('Audit Complete');
    console.log('\n=== AUDIT REPORT ===');
    console.log(`URL: ${url}`);
    console.log(`Title: ${title}`);
    console.log(`Status: ${response?.status()}`);
    console.log(`Console Errors: ${consoleErrors.length}`);

    console.log('\n=== SECURITY HEADERS ===');

    securityHeaders.forEach(header => {
        console.log(
            `${header.name}: ${header.present ? 'Present' : 'Missing'}`
        );
    });

    await browser.close();
}

runAudit();