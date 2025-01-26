const { getAccessToken } = require("../../services/MpesaService");
const { stkPush } = require("../../services/MpesaService");

const mpesaCallbackHandler = (req, res) => {
  try {
    const merchantRequestID = req.body.Body.stkCallback.MerchantRequestID;
    const checkoutRequestID = req.body.Body.stkCallback.CheckoutRequestID;
    const resultCode = req.body.Body.stkCallback.ResultCode;
    const resultDesc = req.body.Body.stkCallback.ResultDesc;
    const callbackMetadata = req.body.Body.stkCallback.CallbackMetadata;
    const amount = callbackMetadata.Item[0].Value;
    const mpesaReceiptNumber = callbackMetadata.Item[1].Value;
    const transactionDate = callbackMetadata.Item[3].Value;
    const phoneNumber = callbackMetadata.Item[4].Value;

    console.log("MerchantRequestID:", merchantRequestID);
    console.log("CheckoutRequestID:", checkoutRequestID);
    console.log("ResultCode:", resultCode);
    console.log("ResultDesc:", resultDesc);

    console.log("Amount:", amount);
    console.log("MpesaReceiptNumber:", mpesaReceiptNumber);
    console.log("TransactionDate:", transactionDate);
    console.log("PhoneNumber:", phoneNumber);
    res.status(200).json({ message: "Callback received successfully" });
  } catch (error) {
    console.error("Error processing callback:", error.message);
  }
};

const get_access_token = async (req, res) => {
  try {
    const token = await getAccessToken();
    res.status(200).json({ access_token: token });
  } catch (error) {
    res.status(500).json({ error: "Failed to get access token" });
  }
};

const stk_push = async (req, res) => {
  try {
    const { phone, amount } = req.body;
    const response = await stkPush(phone, amount);
    res.status(200).json({ message: "STK push sent successfully", response });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { get_access_token, stk_push, mpesaCallbackHandler };
