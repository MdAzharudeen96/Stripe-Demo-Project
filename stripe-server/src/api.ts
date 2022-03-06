import express, {Request, Response, NextFunction} from "express";
export const app = express();

app.use(express.json())

import cors from 'cors';
import { createStripeCheckoutSession } from "./checkout";
import { createPaymentIntent } from "./payments";
import { handleStripeWebhook } from "./webhooks";
import { auth } from "./firebase";
import {createSetupIntent, listPaymentMethods} from './customers';
import {
    createSubscription,
    cancelSubscription,
    listSubscriptions,
} from './billing';

//////MIDDLEWAR//////

//Allows cross origin requests
app.use( cors({origin:true}) );

//Sets rawBody for webhook handling
app.use(
    express.json({
        verify: (req, res, buffer) => (req['rawBody'] = buffer),
    })
);

//Decodes the Firebase JSON web token
app.use(decodeJWT);

/* Decodes the JSON web token */
async function decodeJWT(req: Request, res: Response, next: NextFunction){
    if(req.headers?.authorization?.startsWith('Bearer ')){
        const idToken = req.headers.authorization.split('Bearer ')[1];

        try{
            const decodedToken = await auth.verifyIdToken(idToken);
            req['currentUser'] = decodedToken;
        }catch(err){
            console.log(err);
        }
    }
    next();
}


//////HELPERS////

/* Check async errors when awaiting promises */
function runAsync(callback: Function){
    return(req: Request, res: Response, next: NextFunction) => {
        callback(req, res, next).catch(next);
    }
}

/* Throws an error if the currentUser does not exist on the request */
function validateUser(req: Request){
    const user = req['currentUser'];
    if(!user){
        throw new Error('You must be logged into make this request. i.e Authorization: Bearer <token>');
    }
    return user;
}


///////MAIN API//////

/* Checkouts */
app.post(
    '/checkouts/', runAsync(async({body}: Request, res: Response) => {
        res.send(await createStripeCheckoutSession(body.line_items));
    })
)

/* Payment Intents API */

//Create a PaymentIntent
app.post('/payments',
    runAsync(async ({body}: Request, res: Response) => {
        res.send(await createPaymentIntent(body.amount));
    })
);

/* Customers & setup Intents */

//Save a card on the customer record with a SetupIntent
app.post('/wallet',
    runAsync(async (req: Request, res: Response) => {
        const user = validateUser(req);
        const SetupIntent = await createSetupIntent(user.uid);
        res.send(SetupIntent)
    })
);

//Retrieve all cards attached to a customer
app.get('/wallet',
    runAsync(async (req: Request, res: Response) => {
        const user = validateUser(req);
        const wallet = await listPaymentMethods(user.uid);
        res.send(wallet.data);
    })
);

/**
 * Billing and Recurring Subscriptions
 */

// Create a and charge new Subscription
app.post(
    '/subscription',
    runAsync(async (req: Request, res: Response) => {
      const user = validateUser(req);
      const { plan, payment_method } = req.body;
      const subscription = await createSubscription(user.uid, plan, payment_method);
      res.send(subscription);
    })
);
  
  // Get all subscriptions for a customer
app.get(
    '/subscriptions',
    runAsync(async (req: Request, res: Response) => {
      const user = validateUser(req);
  
      const subscriptions = await listSubscriptions(user.uid);
      res.send(subscriptions.data);
    })
);
  
  // Unsubscribe or cancel a subscription
app.patch(
    '/subscriptions/:id',
    runAsync(async (req: Request, res: Response) => {
      const user = validateUser(req);
      res.send(await cancelSubscription(user.uid, req.params.id));
    })
);

/* Webhooks */

//Handle webhooks
app.post('/hooks', runAsync(handleStripeWebhook));

/* Test */
// app.post('/test', (req: Request, res:Response) => {
//     const amount = req.body.amount;
//     res.status(200).send({ with_tax: amount*7 });
// });