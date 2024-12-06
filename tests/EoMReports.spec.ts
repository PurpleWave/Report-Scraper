import { test } from '@playwright/test';
import * as dotenv from 'dotenv';
import { generateFilePath } from '../utilities/utilities.page';

// Load environment variables
dotenv.config();

const username = process.env.USERNAME || '';
const password = process.env.PASSWORD || '';

test(`Generate PDF for Invoice Summary`, async ({ page }) => {
    console.log(`Processing: https://cliq.purplewave.com/c/invoice_summary.php?auction_id=241031 with report name: InvoiceSummary`);

    // Navigate to login page and perform login
    await page.goto('https://cliq.purplewave.com/c/invoice_summary.php?auction_id=241031');
    await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForTimeout(10000); // Adjust timeout as needed

    // Navigate to the target page (same as the login URL in this case)
    await page.goto('https://cliq.purplewave.com/c/invoice_summary.php?auction_id=241031');
    await page.waitForTimeout(10000); // Adjust timeout as needed

    // Generate file path and PDF
    const filePath = generateFilePath('InvoiceSummary');
    await page.pdf({
      path: filePath,
      format: 'A4',
      landscape: true,
      printBackground: true,
    });

    console.log(`PDF generated for InvoiceSummary: ${filePath}`);
});
test(`Generate PDF for Bidder Fees`, async ({ page }) => {
    console.log(`Processing: https://dashboard.purplewave.com/fees/invoice/241031 with report name: BidderFees`);

    // Navigate to login page and perform login
    await page.goto('https://dashboard.purplewave.com/fees/invoice/241031');
    await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForTimeout(10000); // Adjust timeout as needed

    // Navigate to the target page (same as the login URL in this case)
    await page.goto('https://dashboard.purplewave.com/fees/invoice/241031');
    await page.waitForTimeout(10000); // Adjust timeout as needed

    // Generate file path and PDF
    const filePath = generateFilePath('BidderFees');
    await page.pdf({
      path: filePath,
      format: 'A4',
      landscape: true,
      printBackground: true,
    });

    console.log(`PDF generated for BidderFees: ${filePath}`);
});

test(`Generate PDF for New Tax Summary`, async ({ page }) => {
    console.log(`Processing: https://cliquidator.purplewave.com/#!/reports/tax/241031 with report name: NewTaxSummary`);

    // Navigate to login page and perform login
    await page.goto('https://cliquidator.purplewave.com/#!/reports/tax/241031');
    await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForTimeout(10000); // Adjust timeout as needed

    // Navigate to the target page (same as the login URL in this case)
    await page.goto('https://cliquidator.purplewave.com/#!/reports/tax/241031');
    await page.waitForTimeout(10000); // Adjust timeout as needed

    // Generate file path and PDF
    const filePath = generateFilePath('NewTaxSummary');
    await page.pdf({
      path: filePath,
      format: 'A4',
      landscape: true,
      printBackground: true,
    });

    console.log(`PDF generated for NewTaxSummary: ${filePath}`);
});

test(`Generate PDF for Settlement Summary`, async ({ page }) => {
    console.log(`Processing: https://cliq.purplewave.com/c/settlement_summary.php?auction_id=241031 with report name: SettlementSummary`);

    // Navigate to login page and perform login
    await page.goto('https://cliq.purplewave.com/c/settlement_summary.php?auction_id=241031');
    await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForTimeout(10000); // Adjust timeout as needed

    // Navigate to the target page (same as the login URL in this case)
    await page.goto('https://cliq.purplewave.com/c/settlement_summary.php?auction_id=241031');
    await page.waitForTimeout(10000); // Adjust timeout as needed

    // Generate file path and PDF
    const filePath = generateFilePath('SettlementSummary');
    await page.pdf({
      path: filePath,
      format: 'A4',
      landscape: true,
      printBackground: true,
    });

    console.log(`PDF generated for SettlementSummary: ${filePath}`);
});

test(`Generate PDF for Seller Fees`, async ({ page }) => {
    console.log(`Processing: https://cliq.purplewave.com/cgi-bin/pwsellfees.cgi?241031 with report name: SellerFees`);

    // Navigate to login page and perform login
    await page.goto('https://cliq.purplewave.com/');
    await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForTimeout(10000); // Adjust timeout as needed

    // Navigate to the target page (same as the login URL in this case)
    await page.goto('https://cliq.purplewave.com/cgi-bin/pwsellfees.cgi?241031');
    await page.waitForTimeout(10000); // Adjust timeout as needed

    // Generate file path and PDF
    const filePath = generateFilePath('SellerFees');
    await page.pdf({
      path: filePath,
      format: 'A4',
      landscape: true,
      printBackground: true,
    });

    console.log(`PDF generated for SellerFees: ${filePath}`);
});