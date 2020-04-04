import React, { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import * as Font from 'expo-font';

import './src/config/ReactotronConfig';

import { store, persistor } from './src/store';
import App from './src/App';

export default function Index() {
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    async function loadFont() {
      try {
        await Font.loadAsync({
          'Lato-Black': require('./src/assets/fonts/Lato-Black.ttf'),
          'Lato-Bold': require('./src/assets/fonts/Lato-Bold.ttf'),
          'Lato-Regular': require('./src/assets/fonts/Lato-Regular.ttf'),
          'Lato-Light': require('./src/assets/fonts/Lato-Light.ttf'),
          'Lato-Thin': require('./src/assets/fonts/Lato-Thin.ttf'),
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    }
    loadFont();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#f48024" />
        <App />
      </PersistGate>
    </Provider>
  );
}
