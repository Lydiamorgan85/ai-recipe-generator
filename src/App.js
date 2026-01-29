import React, { useState, useEffect } from 'react';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem('recipeHistory');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('recipeHistory', JSON.stringify(history));
    } catch (e) {
      // ignore
    }
  }, [history]);

  const handleGenerate = async () => {
    // Try real Amplify data client first, then local mock
    let got = false;
    try {
      const mod = await import('aws-amplify/data');
      const generateClient = mod?.generateClient;
      if (typeof generateClient === 'function') {
        const client = generateClient();
        if (typeof client.generate === 'function') {
          const res = await client.generate({ ingredients });
          const text = res?.text ?? '(no text returned)';
          setRecipe(text);
          setHistory((h) => [{ input: ingredients, result: text, at: Date.now() }, ...h]);
          got = true;
        }
      }
    } catch (err) {
      // ignore, try local mock next
    }

    if (!got) {
      try {
        const local = await import('./amplify/data/resource');
        const generateClient = local?.generateClient;
        if (typeof generateClient === 'function') {
          const client = generateClient();
          const res = await client.generate({ ingredients });
          const text = res?.text ?? `Mock recipe generated for: ${ingredients}`;
          setRecipe(text);
          setHistory((h) => [{ input: ingredients, result: text, at: Date.now() }, ...h]);
          return;
        }
      } catch (e) {
        // final fallback
      }
      const text = `Mock recipe generated for: ${ingredients}`;
      setRecipe(text);
      setHistory((h) => [{ input: ingredients, result: text, at: Date.now() }, ...h]);
    }
  };

  const clearHistory = () => setHistory([]);

  return (
    <Authenticator>
      <div className="App" style={{ padding: 16 }}>
        <h1>AI Recipe Generator (dev)</h1>
        <label style={{ display: 'block', marginBottom: 8 }}>
          Ingredients:
          <input
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            style={{ width: '100%', marginTop: 8 }}
          />
        </label>
        <div>
          <button onClick={handleGenerate}>Generate Recipe</button>
        </div>
        {recipe && (
          <pre style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>{recipe}</pre>
        )}

        <section style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>History</h2>
            <button onClick={clearHistory}>Clear</button>
          </div>
          {history.length === 0 ? (
            <p>No history yet.</p>
          ) : (
            <ul>
              {history.map((item, idx) => (
                <li key={item.at + idx} style={{ marginBottom: 8 }}>
                  <strong>Input:</strong> {item.input}
                  <br />
                  <strong>Result:</strong> {item.result}
                  <br />
                  <small>{new Date(item.at).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Authenticator>
  );
}

export default App;
