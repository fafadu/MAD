import store from './src/store/store';
import { Provider } from 'react-redux';
import Counter from './src/components/Counter';

export default function App() {
  return (
      <Provider store={store}>
          <Counter/>
      </Provider>
  );
}