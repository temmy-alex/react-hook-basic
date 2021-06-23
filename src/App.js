import React from 'react';
import './Load.css';
import HookApp from './HookApp';

// function App() {
//   return (
//     <div>
      
//       {/* <HookApp name="Linus" imageSrc="https://images.unsplash.com/photo-1622902116716-8dd7bec10584?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80" /> */}
//       <HookApp />
//     </div>
//   );
// }

function useTimeout(callback, delay) {
  const timeoutRef = React.useRef();
  const callbackRef = React.useRef(callback);

  // Remember the latest callback:
  //
  // Without this, if you change the callback, when setTimeout kicks in, it
  // will still call your old callback.
  //
  // If you add `callback` to useEffect's deps, it will work fine but the
  // timeout will be reset.

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the timeout:

  React.useEffect(() => {
    if (typeof delay === 'number') {
      timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay);

      // Clear timeout if the components is unmounted or the delay changes:
      return () => window.clearTimeout(timeoutRef.current);
    }
  }, [delay]);

  // In case you want to manually clear the timeout from the consuming component...:
  return timeoutRef;
}

const App = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [showLoader, setShowLoader] = React.useState(false);
  
  // Simulate loading some data:
  const fakeNetworkRequest = React.useCallback(() => {
    setLoading(true);
    setShowLoader(false);
    
    // 50% of the time it will display the loder, and 50% of the time it won't:
    window.setTimeout(() => setLoading(false), Math.random() * 4000);
  }, []);
  
  // Initial data load:
  React.useEffect(fakeNetworkRequest, []);
        
  // After 2 second, we want to show a loader:
  useTimeout(() => setShowLoader(true), isLoading ? 2000 : null);

  return (<React.Fragment>
    <button onClick={ fakeNetworkRequest } disabled={ isLoading }>
      { isLoading ? 'LOADING...📀 ' : 'LOAD MORE 🚀' }
    </button>
    
    { isLoading && showLoader ? <div className="loader"><span className="loaderIcon">📀</span></div> : null }
    { isLoading ? null : <HookApp />}
  </React.Fragment>);
}

export default App;
