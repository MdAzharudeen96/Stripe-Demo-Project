import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FirebaseAppProvider } from 'reactfire';


export const firebaseConfig = {
  apiKey: "AIzaSyDL5ixDpCaA5aDg4HhPKCjXYq9pQ6Dyzyg",
  authDomain: "stripe-js-course-87b80.firebaseapp.com",
  projectId: "stripe-js-course-87b80",
  storageBucket: "stripe-js-course-87b80.appspot.com",
  messagingSenderId: "828338490321",
  appId: "1:828338490321:web:27237b3a84ad56a4e2aef0"
};

export const stripePromise = loadStripe(
  'pk_test_51KWvcTSC2MIwJhdmHW2uL48v1vLQlj6WCeLYKSty7PSOroBZetQvEhFP9B8RO9Ja36AolxvAzqSef9CAtx2uJync00sCgml2p1'
);

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
