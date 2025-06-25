// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_51RajqeCooFgElGx6knar7X2Nwt2aj6KqPOA0i4tw0mBsdpW1QgcY6IXXZ9S7x5cw3Orm6IgcJDgPFudbTkCv59D1001p0qDn8S");

// const UpgradePage = () => {
//     const location = useLocation();
//     const { limitMB, usedMB, attemptedMB } = location.state || {};

//     const handleUpgrade = async () => {
//         try {
//             const stripe = await stripePromise;
//             const res = await axios.post("http://localhost:8000/create-checkout-session", {
//                 price_id: "price_1Rak3lCooFgElGx6iIjeSC3Z",
//                 quantity: 1,
//             });
//             await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
//         } catch (err) {
//             alert(" Failed to redirect to Stripe Checkout: " + err.message);
//         }
//     };

//     return (
//         <div className="upgrade-page">
//             <h2>You've Exceeded Your Plan</h2>
//             <p><strong>Plan Limit:</strong> {limitMB} MB</p>
//             <p><strong>Already Used:</strong> {usedMB} MB</p>
//             <p><strong>Attempted Upload:</strong> {attemptedMB} MB</p>
//             <button className="btn-primary" onClick={handleUpgrade}>
//                 💳 Upgrade to Yearly Plan ($9)
//             </button>
//         </div>
//     );
// };

// export default UpgradePage;

import { useLocation } from "react-router-dom";
import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_51RajqeCooFgElGx6knar7X2Nwt2aj6KqPOA0i4tw0mBsdpW1QgcY6IXXZ9S7x5cw3Orm6IgcJDgPFudbTkCv59D1001p0qDn8S");

const UpgradePage = () => {
    const location = useLocation();
    const { limitMB, usedMB, attemptedMB } = location.state || {};

    /*
    const handleStripeUpgrade = async () => {
        try {
            const stripe = await stripePromise;
            const res = await axios.post("http://localhost:8000/create-checkout-session", {
                price_id: "price_1Rak3lCooFgElGx6iIjeSC3Z",
                quantity: 1,
            });
            await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
        } catch (err) {
            alert("❌ Failed to redirect to Stripe Checkout: " + err.message);
        }
    };
    */

    const handleRazorpayUpgrade = async () => {
        try {
            const res = await axios.post("http://localhost:8000/create-razorpay-order", {
                amount: 900, // ₹9 in paise
                currency: "INR",
                receipt: "json_merger_upgrade"
            });

            const { order_id } = res.data;

            const options = {
                key: "rzp_test_MFKg0wUfOkmonX", // ✅ Replace with your Razorpay Key ID
                amount: 900,
                currency: "INR",
                name: "JSON Merger Pro Plan",
                description: "Upgrade to yearly plan",
                order_id,
                handler: function (response) {
                    alert("✅ Razorpay Payment Successful: " + response.razorpay_payment_id);
                    window.location.href = "/merge";
                },
                prefill: {
                    name: "Test User",
                    email: "test@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            alert("❌ Razorpay failed: " + error.message);
        }
    };

    return (
        <div className="upgrade-page">
            <h2>🚫 You've Exceeded Your Plan</h2>
            <p><strong>Plan Limit:</strong> {limitMB} MB</p>
            <p><strong>Already Used:</strong> {usedMB} MB</p>
            <p><strong>Attempted Upload:</strong> {attemptedMB} MB</p>

            {/* 
            <button className="btn-primary" onClick={handleStripeUpgrade}>
                💳 Pay with Stripe ($9)
            </button>
            */}

            <button className="btn-primary" onClick={handleRazorpayUpgrade}>
                🪙 Pay with Razorpay (₹9)
            </button>
        </div>
    );
};

export default UpgradePage;

