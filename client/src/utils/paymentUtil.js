import axios from "axios";

const makePayment = async (amount, user, date1, date2, singleRoom) => {
  try {
    const response1 = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/payment/get-key`
    );
    const response2 = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/payment/checkout`,
      {
        amount,
      }
    );

    const { key } = response1.data;
    const { order } = response2.data;

    const option = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "StayEasy",
      description: "Payment for Room Booking",
      image: "/images/favicon.svg",
      order_id: order.id,
      prefill: {
        name: "StayEasy",
        email: "stayeasy@gmail.com",
        contact: "9865541789",
      },
      notes: {
        address: "Botanical Garden Area, Howrah, West Bengal 711103",
      },
      theme: { color: "#e70b53" },
      handler: async (response) => {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/payment/payment-verification`,
            {
              ...response,
              amount,
              ...user,
              checkIn: date1,
              checkOut: date2,
              ...singleRoom,
            }
          );

          console.log(res);
        } catch (error) {
          console.log(error);
        }
      },
    };
    const razor = window.Razorpay(option);
    razor.open();
  } catch (error) {
    console.log(error);
  }
};

export default makePayment;
