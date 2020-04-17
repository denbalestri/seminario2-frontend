import get from "lodash/get";

export const getInvoices = store => get(store, "invoices");
export const getInvoiceById = (store, id) =>
  get(store, "invoices").find(invoice => invoice.id === id);
export const getInvoiceToPay = store => get(store, "invoiceToPay");
