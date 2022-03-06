"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStripeCheckoutSession = void 0;
const _1 = require("./");
async function createStripeCheckoutSession(line_items) {
    const url = process.env.WEBAPP_URL;
    console.log(url);
    const session = await _1.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        // success_url: `http://sitename.com/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
        // cancel_url: 'http://sitename.com/checkout-failed',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/failed`,
    });
    return session;
}
exports.createStripeCheckoutSession = createStripeCheckoutSession;
//# sourceMappingURL=checkout.js.map