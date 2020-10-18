import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './i18n';
import ErrorBoundary from './ErrorBoundary';

ReactDOM.render(<Suspense fallback={<div>Loading...</div>}>
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
</Suspense>, document.getElementById('root'));
