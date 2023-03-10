// filename : App.tsx
// This code imports React and a CSS file, as well as a Form component and a test data file. The App function returns a div element containing a title and the Form component with a prop of AutomateWindowBlindsAST. Finally, the App component is exported as the default. It seems to be a basic React app with a form component related to home automation.

import React from 'react';
import './css/App.css';
import Form from './ui/Form';
import {AutomateWindowBlindsAST} from './testdata/Tasks';

function App() {
  return (<div>
    <h1>Home automation</h1>
      <Form task={AutomateWindowBlindsAST} />
  </div>);
}

export default App;
