const React = require('react');

// Simple mock Authenticator that just renders children for tests
function Authenticator({ children }) {
  return React.createElement(React.Fragment, null, children);
}

module.exports = { Authenticator };
