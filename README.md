# Gomypay SDK

台灣萬事達 Gomypay 金流 SDK

## Installation

```bash
yarn add gomypay-sdk
```

## Usage

### Create SDK Instance (ES5)

```javascript
const GomypayClient = require("gomypay-sdk").default;
const client = new GomypayClient({
  customerId: "Gomypay CustomerId (商店代號)",
  strCheck: "Gomypay Str_Check (交易驗證密碼)",
  env: "production", // 'sandbox' | 'production'
});
```

### Create SDK Instance (ES6)

```javascript
import GomypayClient from "gomypay-sdk";
const client = new GomypayClient({
  customerId: "Gomypay CustomerId (商店代號)",
  strCheck: "Gomypay Str_Check (交易驗證密碼)",
  env: "production", // 'sandbox' | 'production'
});
```

### Get Payment Form 產生交易表單

詳情請見官方文件

```javascript
client.getPaymentFormHTML({
  Send_Type: 0, // 付款方式，0:信用卡 / 1:銀聯卡 / 2:超商條碼 / 3:WebAtm / 4:虛擬帳號 /  5.定期扣款 / 6.超商代碼 / 7.LinePay
  Order_No: "2020072812000000", // 訂單編號 必填
  Amount: 1000, // 訂單金額 必填
  Buyer_Name: "", // 消費者姓名 非必填
  Buyer_Telm: "", // 消費者電話 非必填
  Buyer_Mail: "test@example.com", // 消費者Email 非必填
  Buyer_Memo: "商品1,商品2", // 商品資訊 非必填
  Return_url: "", // 授權結果回傳網址: 如無則自動轉入系統預設授權頁面 非必填
  Callback_Url: "", // 背景對帳網址，如未填寫默認不進行背景對帳 非必填
  CardNo: "", // 信用卡號，如無將自動轉入系統預設付款頁面 非必填
  ExpireDate: "", // 卡片有效日期(YYMM) ，如無將自動轉入系統預設付款頁面 非必填
  CVV: "", // 卡片認證碼，如無將自動轉入系統預設付款頁面 非必填
});
```

回傳範例

```html
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<form
  id="_auto_pay_Form_自動產生ID"
  method="post"
  action=" https://n.gomypay.asia/ShuntClass.aspx"
>
  <input name="Send_Type" value="0" />
  <input name="Pay_Mode_No" value="2" />
  <input name="CustomerId" value="商店代號" />
  <input name="Order_No" value="交易單號" />
  <input name="CardNo" value="卡號" />
  <input name="ExpireDate" value="卡片有效日期(YYMM)" />
  <input name="CVV" value="卡片認證碼" />
  <input name="TransMode " value="交易模式 " />
  <input name="Amount" value="交易金額" />
  <input name="Installment" value="期數" />
  <input name="TransCode" value="00" />
  <input name="Buyer_Name" value="消費者姓名" />
  <input name="Buyer_Telm" value="消費者電話" />
  <input name="Buyer_Mail" value="消費者 email" />
  <input name="Buyer_Memo" value="商品資訊" />
  <input name="e_return" value="1" />
  <input name="Str_Check" value="交易驗證密碼" />
</form>
<script>
  document.getElementById("_auto_pay_Form_自動產生ID").submit();
</script>
```

### Get Payment URL 產生交易網址

詳情請見官方文件

```javascript
client.getPaymentUrl({
  Send_Type: 0, // 付款方式，0:信用卡 必填
  Order_No: "2020072812000000", // 訂單編號 必填
  Amount: 1000, // 訂單金額 必填
  Buyer_Name: "", // 消費者姓名 必填
  Buyer_Telm: "", // 消費者電話 必填
  Buyer_Mail: "test@example.com", // 消費者Email 必填
  Buyer_Memo: "商品1,商品2", // 商品資訊 必填
  Callback_Url: "", // 背景對帳網址 必填
  CardNo: "", // 信用卡號 必填
  ExpireDate: "", // 卡片有效日期(YYMM) 必填
  CVV: "", // 卡片認證碼 必填
});
```

回傳範例

```
https://n.gomypay.asia/ShuntClass.aspx?Send_Type=0&Pay_Mode_No=2&CustomerId=80013554&Order_No=自訂交易單號(例:2018001)&Return_url=回傳網址
```

### Request payment 送出交易 (限用信用卡交易)

詳情請見官方文件

```javascript
client.requestPayment({
  Send_Type: 0, // 付款方式，0:信用卡 / 1:銀聯卡 / 2:超商條碼 / 3:WebAtm / 4:虛擬帳號 /  5.定期扣款 / 6.超商代碼 / 7.LinePay
  Order_No: "2020072812000000", // 訂單編號 必填
  Amount: 1000, // 訂單金額 必填
  Buyer_Name: "", // 消費者姓名 非必填
  Buyer_Telm: "", // 消費者電話 非必填
  Buyer_Mail: "test@example.com", // 消費者Email 非必填
  Buyer_Memo: "商品1,商品2", // 商品資訊 非必填
  Return_url: "", // 授權結果回傳網址: 如無則自動轉入系統預設授權頁面 非必填
  Callback_Url: "", // 背景對帳網址，如未填寫默認不進行背景對帳 非必填
  CardNo: "", // 信用卡號，如無將自動轉入系統預設付款頁面 非必填
  ExpireDate: "", // 卡片有效日期(YYMM) ，如無將自動轉入系統預設付款頁面 非必填
  CVV: "", // 卡片認證碼，如無將自動轉入系統預設付款頁面 非必填
});
```

回傳範例

```json
{
  "result": "1",
  "ret_msg": "授權成功 ",
  "OrderID": "2018070900000000001",
  "e_Cur": "NT",
  "e_money": "35",
  "e_date": "20180709",
  "e_time": "12: 41:44",
  "e_orderno": "20180709test01",
  "e_no": "商店代號",
  "e_outlay": "2",
  "str_check": "MD5 編碼 ",
  "bankname": "閘道銀行",
  "avcode": "012345"
}
```
