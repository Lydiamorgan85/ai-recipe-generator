// Re-export the JavaScript App implementation to avoid duplicate JSX/TSX builds.
// This file exists only to satisfy TypeScript import paths that may prefer .tsx.
const App = require("./App.js").default;
export default App;