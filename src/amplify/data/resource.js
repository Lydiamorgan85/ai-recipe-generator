// Local mock for Amplify data client used in development when real backend is absent.
exports.generateClient = function generateClient() {
  return {
    async generate({ ingredients } = {}) {
      // Simulate async API call
      await new Promise((r) => setTimeout(r, 100));
      return { text: `Mock generated recipe for: ${ingredients || 'nothing'}` };
    },
  };
};
