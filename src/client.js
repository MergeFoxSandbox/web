// Talks to the api repository and renders invoices. Field names mirror shared-schema.
export async function fetchInvoices(baseUrl, fetchImpl = fetch) {
  const res = await fetchImpl(`${baseUrl}/invoices`);
  if (!res.ok) throw new Error(`api answered ${res.status}`);
  return res.json();
}

export function formatAmount(amountCents, currency) {
  return new Intl.NumberFormat('en', { style: 'currency', currency }).format(amountCents / 100);
}

export function renderInvoiceRow(invoice) {
  return `${invoice.id} | ${invoice.customerId} | ${formatAmount(invoice.amountCents, invoice.currency)} | ${invoice.status}`;
}
