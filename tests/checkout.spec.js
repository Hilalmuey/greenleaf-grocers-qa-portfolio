// GreenLeaf Grocers — guest checkout happy path
// Reconstructed from the documented Coursera lab steps and test IDs.
// The checkout app and its Playwright baseURL configuration are not included
// in this public portfolio, so this file is not independently runnable here.

import { test, expect } from '@playwright/test';

test('guest checkout happy path without expired promo', async ({ page }) => {
  // Start from the application's catalog.
  await page.goto('/');
  await expect(page.getByTestId('catalog-section')).toBeVisible();

  // Add an item and proceed from cart to checkout.
  await page.getByTestId('add-to-cart-btn-p-apples').click();
  await page.getByTestId('nav-cart').click();
  await page.getByTestId('proceed-to-checkout-btn').click();

  // Provide guest details. The happy path does not apply a promo code.
  await page.getByTestId('checkout-name-input').fill('Capstone Guest');
  await page.getByTestId('checkout-email-input').fill('capstone.guest@example.test');
  await page.getByTestId('checkout-address-input').fill('123 QA Test Street');
  await page.getByTestId('checkout-submit-btn').click();

  // Verify that checkout succeeded and returned an order identifier.
  await expect(page.getByTestId('success-section')).toBeVisible();
  await expect(page.getByTestId('success-order-id')).not.toBeEmpty();
});
