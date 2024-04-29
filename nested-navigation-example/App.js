import { NavigationContainer } from "@react-navigation/native"

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from './src/screens/Home';
import { Products } from "./src/screens/Products";



const Drawer = createDrawerNavigator();

export default function App() {
  
    return (
    
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Products" component={Products} />
      </Drawer.Navigator>
  
      </NavigationContainer>
    );
}


