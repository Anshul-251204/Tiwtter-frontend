// import axios from "axios";

// function PaymentPage() {
// 	const paymentHandler = async () => {
// 		const res = await axios.post("/api/v1/payments/buy");
// 		console.log(res.data.id);
// 		let options = {
// 			key: "rzp_test_yllbbYSQNH6DV4", // Enter the Key ID generated from the Dashboard
// 			amount: "5000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
// 			currency: "INR",
// 			name: "Anshul Choure",
// 			description: "Test Transaction",
// 			image: "https://example.com/your_logo",
// 			order_id: res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
// 			handler: function (response: any) {
// 				alert(response.razorpay_payment_id);
// 				alert(response.razorpay_order_id);
// 				alert(response.razorpay_signature);
// 			},
// 			prefill: {
// 				name: "Gaurav Kumar",
// 				email: "gaurav.kumar@example.com",
// 				contact: "9000090000",
// 			},
// 			notes: {
// 				address: "Razorpay Corporate Office",
// 			},
// 			theme: {
// 				color: "#3399cc",
// 			},
// 		};

// 		const rzp1 = new window.Razorpay(options);
// 		rzp1.on("payment.failed", function (response) {
// 			alert(response.error.code);
// 			alert(response.error.description);
// 			alert(response.error.source);
// 			alert(response.error.step);
// 			alert(response.error.reason);
// 			alert(response.error.metadata.order_id);
// 			alert(response.error.metadata.payment_id);
// 		});
// 		rzp1.open();
	
// 	};

// 	return (
// 		<div>
// 			<button id="rzp-button1">Pay with Razorpay</button>

// 			<button
// 				onClick={paymentHandler}
// 				className=" bg-green-600 py-2 px-4 rounded-sm m-5 "
// 			>
// 				Payment
// 			</button>
// 		</div>
// 	);
// }

// export default PaymentPage;
