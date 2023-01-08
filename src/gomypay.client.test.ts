import GomypayClient from "./gomypay.client";

test("getPaymentUrl", async () => {
  const client = new GomypayClient({
    customerId: "test1234",
    strCheck: "testStr",
    env: "sandbox",
  });

  const paymentUrl = client.getPaymentUrl({
    Send_Type: 0,
    Order_No: "108801100",
    Amount: 100,
  });

  expect(paymentUrl).toBe(
    "https://n.gomypay.asia/TestShuntClass.aspx?Send_Type=0&Pay_Mode_No=2&CustomerId=test1234&Str_Check=testStr&Order_No=108801100&TransMode=1&Amount=100&Installment=0&TransCode=00&e_return=1"
  );
});
