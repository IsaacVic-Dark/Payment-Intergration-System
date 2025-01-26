require("dotenv").config();
const axios = require("axios");
const moment = require("moment");

const getAccessToken = async () => {
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;
  const sandboxUrl = process.env.SANDBOX_URL;
  try {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      "base64"
    );
    const response = await axios.get(`${sandboxUrl}`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error feetching access token", error);
  }
};

const stkPush = async (phone, amount) => {
  const shortCode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const mpesaUrl = process.env.MPESA_URL;
  const callBackURL = process.env.MPESA_CALLBACK_URL;
  // const phone = 254710927292;
  // const amount = 1;
  try {
    const token = await getAccessToken();
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString(
      "base64"
    );
    const call_back_url = `${callBackURL}/callback`;
    const payload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: shortCode,
      PhoneNumber: phone,
      CallBackURL: call_back_url,
      AccountReference: "Test",
      TransactionDesc: "Test",
    };

    const response = await axios.post(`${mpesaUrl}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error making stk push", error);
  }
};

module.exports = { getAccessToken, stkPush };
