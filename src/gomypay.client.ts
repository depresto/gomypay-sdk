import axios from "axios";
import FormData from "form-data";
import { GomypayPaymentParams, GomypayResultDataJSONProps } from ".";

class GomypayClient {
  customerId: string;
  strCheck: string;
  dryRun: boolean;
  paymentUrl: string;

  constructor(params: {
    customerId: string;
    strCheck: string;
    env: "sandbox" | "production";
  }) {
    this.customerId = params.customerId;
    this.strCheck = params.strCheck;
    this.dryRun = params.env === "sandbox";
    this.paymentUrl =
      this.dryRun === true
        ? "https://n.gomypay.asia/TestShuntClass.aspx"
        : "https://n.gomypay.asia/ShuntClass.aspx";
  }

  /**
   * Generate Gomypay payment HTML form
   */
  public getPaymentFormHTML(params: GomypayPaymentParams): string {
    const html: string[] = [];
    const formId = `_auto_pay_Form_${new Date().getTime()}`;

    html.push(
      "<META http-equiv='Content-Type' content='text/html;charset=utf-8'>"
    );
    html.push(
      `<form id="${formId}" method="post" action="${this.paymentUrl}">`
    );
    html.push(`<input name='Send_Type' value='${params.Send_Type ?? 0}'>" />`);
    html.push("<input name='Pay_Mode_No' value='2'>");
    html.push(`<input name='CustomerId' value='${this.customerId}'>`);
    html.push(`<input name='Order_No' value='${params.Order_No}'>`);

    if (params.CardNo)
      html.push(`<input name='CardNo' value='${params.CardNo}'>`);
    if (params.ExpireDate)
      html.push(`<input name='ExpireDate' value='${params.ExpireDate}'>`);
    if (params.CVV) html.push(`<input name='CVV' value='${params.CVV}'>`);

    html.push(
      `<input name='TransMode' value='${
        params.Installment && params.Installment > 1 ? 2 : 1
      }'>`
    );
    html.push(`<input name='Amount' value='${params.Amount}'>`);
    html.push(`<input name='Installment' value='${params.Installment ?? 0}'>`);
    html.push("<input name='TransCode' value='00'>");
    html.push(`<input name='Buyer_Name' value='${params.Buyer_Name}'>`);
    html.push(`<input name='Buyer_Telm' value='${params.Buyer_Telm}'>`);
    html.push(`<input name='Buyer_Mail' value='${params.Buyer_Mail}'>`);
    html.push(`<input name='Buyer_Memo' value='${params.Buyer_Memo}'>`);
    html.push("<input name='e_return' value='1'>");
    html.push(`<input name='Str_Check' value='${this.strCheck}'>`);

    html.push("</form>");
    html.push("<script>");
    html.push(`document.getElementById("${formId}").submit();`);
    html.push("</script>");
    return html.join("\n");
  }

  public getPaymentUrl(params: GomypayPaymentParams): string {
    const searchParams = new URLSearchParams();
    searchParams.append("Send_Type", (params.Send_Type ?? 0).toString());
    searchParams.append("Pay_Mode_No", "2");
    searchParams.append("CustomerId", this.customerId);
    searchParams.append("Order_No", params.Order_No ?? "");

    if (params.CardNo) searchParams.append("CardNo", params.CardNo);
    if (params.ExpireDate) searchParams.append("ExpireDate", params.ExpireDate);
    if (params.CVV) searchParams.append("CVV", params.CVV);

    searchParams.append(
      "TransMode",
      (params.Installment && params.Installment > 1 ? 2 : 1).toString()
    );
    searchParams.append("Amount", params.Amount?.toString() ?? "");
    searchParams.append("Installment", (params.Installment ?? 0).toString());
    searchParams.append("TransCode", "00");
    searchParams.append("Buyer_Name", params.Buyer_Name ?? "");
    searchParams.append("Buyer_Telm", params.Buyer_Telm ?? "");
    searchParams.append("Buyer_Mail", params.Buyer_Mail ?? "");
    searchParams.append("Buyer_Memo", params.Buyer_Memo ?? "");
    searchParams.append("e_return", "1");
    searchParams.append("Str_Check", this.strCheck);

    return `${this.paymentUrl}?${searchParams.toString()}`;
  }

  /**
   * Request Gomypay payment (Credit card only)
   */
  public async requestPayment(params: GomypayPaymentParams) {
    const formData = new FormData();
    formData.append("Send_Type", (params.Send_Type ?? 0).toString());
    formData.append("Pay_Mode_No", "2");
    formData.append("CustomerId", this.customerId);
    formData.append("Order_No", params.Order_No);

    if (params.CardNo) formData.append("CardNo", params.CardNo);
    if (params.ExpireDate) formData.append("ExpireDate", params.ExpireDate);
    if (params.CVV) formData.append("CVV", params.CVV);

    formData.append(
      "TransMode",
      (params.Installment && params.Installment > 1 ? 2 : 1).toString()
    );
    formData.append("Amount", params.Amount?.toString());
    formData.append("Installment", (params.Installment ?? 0).toString());
    formData.append("TransCode", "00");
    formData.append("Buyer_Name", params.Buyer_Name);
    formData.append("Buyer_Telm", params.Buyer_Telm);
    formData.append("Buyer_Mail", params.Buyer_Mail);
    formData.append("Buyer_Memo", params.Buyer_Memo);
    formData.append("e_return", "1");
    formData.append("Str_Check", this.strCheck);

    const { data } = await axios({
      method: "post",
      url: this.paymentUrl,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data as GomypayResultDataJSONProps;
  }
}

export default GomypayClient;
