// filename : App.test.tsx
// This code is testing whether the App component is rendering a link with the text "learn react". It uses React Testing Library's render function to mount the App component and then checks if the link is in the document using the screen.getByText method. If the link is found, the test passes, otherwise it fails.

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
