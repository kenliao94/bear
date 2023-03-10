// filename :reportWebVitals.ts
// This is a JavaScript code that exports a function called reportWebVitals that takes an optional parameter called onPerfEntry of type ReportHandler. If onPerfEntry is provided and is a function, the function dynamically imports a package called 'web-vitals' and then calls the functions getCLS, getFID, getFCP, getLCP, and getTTFB with onPerfEntry as an argument. These functions are used to measure website performance metrics.

import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
