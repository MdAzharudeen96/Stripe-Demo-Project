import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { Checkout, CheckoutSuccess, CheckoutFail } from './Checkout';
import Payments from './Payments';
import Customers from './Customers';
import Subscriptions from './Subscriptions';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="navbar-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/checkout">
                <span aria-label="emoji" role="img">
                  🛒
                </span>{' '}
                Checkout
              </Link>
            </li>
            <li>
              <Link to="/payments">
                <span aria-label="emoji" role="img">
                  💸
                </span>{' '}
                Payments
              </Link>
            </li>
            <li>
              <Link to="/customers">
                <span aria-label="emoji" role="img">
                  🧑🏿‍🤝‍🧑🏻
                </span>{' '}
                Customers
              </Link>
            </li>
            <li>
              <Link to="/subscriptions">
                <span aria-label="emoji" role="img">
                  🔄
                </span>{' '}
                Subscriptions
              </Link>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/success" element={<CheckoutSuccess />} />
            <Route path="/failed" element={<CheckoutFail />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <div className="well">
        <h2>Stripe React + Node.js Live Demo</h2>
      </div>

      <div className="embed-responsive embed-responsive-16by9 vid">
        <iframe
          src="https://player.vimeo.com/video/416381401"
          // width="640"
          // height="360"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          title='stripe-checkout'></iframe>
      </div>

      <div className="well">
        <h2>Running in Test Mode</h2>
        <p>
          This demo is running in Stripe test mode, so feel free to submit
          payments with testing cards.
        </p>
        <a className="btn btn-outline-success"  href="https://fireship.io/courses/stripe-js">
            Full Stripe JS Course
          </a>
          <a className="btn btn-secondary" href="https://github.com/fireship-io/stripe-payments-js-course">
            source code
          </a>
      </div>
    </>
  );
}

export default App;