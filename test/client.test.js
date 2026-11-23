import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchInvoices, renderInvoiceRow } from '../src/client.js';

const invoice = { id: 'inv_1', customerId: 'cus_1', amountCents: 1250, currency: 'USD', status: 'sent' };

test('renders one row per invoice', () => {
  assert.equal(renderInvoiceRow(invoice), 'inv_1 | cus_1 | $12.50 | sent');
});

test('fetchInvoices reads the api', async () => {
  const fake = async (url) => ({ ok: url === 'http://api/invoices', json: async () => [invoice] });
  assert.deepEqual(await fetchInvoices('http://api', fake), [invoice]);
});

test('fetchInvoices surfaces api errors', async () => {
  await assert.rejects(fetchInvoices('http://api', async () => ({ ok: false, status: 503 })), /503/);
});

test('shows the due date when present', () => {
  assert.equal(renderInvoiceRow({ ...invoice, dueDate: '2026-12-31' }), 'inv_1 | cus_1 | $12.50 | sent | due 2026-12-31');
});
