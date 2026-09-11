const currencyFormatter = new Intl.NumberFormat('en-US', { // No i18n requirements
  style: 'currency',
  currency: 'USD', // Transaction does not have currency field, USD will show just `$`;
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}
