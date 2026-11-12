const BLACKCAT_API = "https://api.blackcatoficial.com/api";
export const CARD_UPDATE_AMOUNT_CENTS = 1490;

export interface PixCustomer {
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

interface BlackcatResponse<T> {
  success: boolean;
  data?: T;
}

export interface BlackcatSale {
  transactionId: string;
  status: string;
  amount: number;
  invoiceUrl?: string;
  paymentData?: { qrCode?: string; copyPaste?: string; expiresAt?: string };
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const apiKey = process.env.BLACKCAT_SECRET_KEY;
  if (!apiKey) throw new Error("BLACKCAT_SECRET_KEY não configurada.");

  const response = await fetch(`${BLACKCAT_API}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
  });
  const body = await response.json() as BlackcatResponse<T>;
  if (!response.ok || !body.success || !body.data) {
    throw new Error("Não foi possível processar a solicitação na Blackcat.");
  }
  return body.data;
}

export function createPixSale(customer: PixCustomer, externalRef: string) {
  return request<BlackcatSale>("/sales/create-sale", {
    method: "POST",
    body: JSON.stringify({
      amount: CARD_UPDATE_AMOUNT_CENTS,
      currency: "BRL",
      paymentMethod: "pix",
      items: [{ title: "Atualização de acesso à carteirinha", unitPrice: CARD_UPDATE_AMOUNT_CENTS, quantity: 1, tangible: false }],
      customer: { name: customer.name, email: customer.email, phone: customer.phone.replace(/\D/g, ""), document: { number: customer.cpf.replace(/\D/g, ""), type: "cpf" } },
      externalRef,
    }),
  });
}

export function getSaleStatus(transactionId: string) {
  return request<BlackcatSale>(`/sales/${encodeURIComponent(transactionId)}/status`);
}
