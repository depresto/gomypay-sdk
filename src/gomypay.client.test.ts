import GomypayClient from "./gomypay.client";

test("getPaymentUrl", async () => {
  const client = new GomypayClient({
    customerId: "E7D6CAD3C78C68DCAAA6844BFEAF858E",
    strCheck: "y2nbt0qs7i36h8ncg4i1e8r0q97obelf",
    env: "sandbox",
  });

  const paymentUrl = client.getPaymentUrl({
    Send_Type: 0,
    Order_No: "108801100",
    Amount: 100,
  });

  expect(paymentUrl).toBe(
    "https://n.gomypay.asia/TestShuntClass.aspx?Send_Type=0&Pay_Mode_No=2&CustomerId=E7D6CAD3C78C68DCAAA6844BFEAF858E&Str_Check=y2nbt0qs7i36h8ncg4i1e8r0q97obelf&Order_No=108801100&e_return=1&TransMode=1&Amount=100&Installment=0&TransCode=00"
  );
});
