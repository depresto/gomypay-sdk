export type GomypayPaymentParams = {
  Send_Type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  Pay_Mode_No?: 2
  CustomerId?: string
  Order_No?: string
  Amount?: number
  TransCode?: '00'
  Buyer_Name?: string
  Buyer_Telm?: string
  Buyer_Mail?: string
  Buyer_Memo?: string
  CardNo?: string
  ExpireDate?: string
  CVV?: string
  Installment?: number
  Return_url?: string
  Callback_Url?: string
  e_return?: 1
};

export type GomypayResultDataProps = {
  Send_Type: 0
  result: 0 | 1
  ret_msg: string
  OrderID: string
  e_orderno: string
  AvCode: string
  str_check: string
  Invoice_No?: string
  CardLastNum?: string
}

export type GomypayResultDataJSONProps = {
  Send_Type: 0
  result: 0 | 1
  ret_msg: string
  OrderID: string
  e_Cur: string
  e_money: string
  e_date: string
  e_time: string
  e_orderno: string
  e_no: string
  e_outlay: string
  avcode: string
  str_check: string
  Invoice_No?: string
  CardLastNum?: string
}
