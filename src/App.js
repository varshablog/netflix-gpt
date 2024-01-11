import './App.css'
import Body from "../src/Components/Body";
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

function App() {
  return (
    <Provider store={appStore}>
      <Body/>
    </Provider>
  );
}

export default App;
