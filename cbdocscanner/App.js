import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainAppRouter from './src/navigation/mainRouter';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/stores/index';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {ToastProvider} from 'react-native-toast-notifications';
import SplashScreen from 'react-native-splash-screen';

const persistor = persistStore(store);

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <MainAppRouter />
            </NavigationContainer>
          </SafeAreaProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
