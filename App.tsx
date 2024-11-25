import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView} from 'react-native';
import AppNavigator from './app/screens/navigation';
import {Provider} from 'react-redux';
import {store} from './app/store/store';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaView>
  );
}

export default App;
