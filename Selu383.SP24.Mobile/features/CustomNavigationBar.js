import React, { useContext } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { useAuth } from './AuthContext';

export default function CustomNavigationBar({
  navigation,
  route,
  options,
  back,
}) {
  const { userType } = useAuth(); 
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const title = getHeaderTitle(options, route.name);

  const handleLoginPress = () => {
    navigation.navigate('Login'); 
    closeMenu(); 
  };

  const handleAdminPortalPress = () => {
    navigation.navigate('AdminPortal'); // Navigate to AdminPortal.js
    closeMenu();
  };

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={openMenu}
            />
          }>
          <Menu.Item
            onPress={handleLoginPress}
            title="Login"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 2 was pressed');
            }}
            title="Option 2"
          />
          {userType === 'Admin' ? (
            <Menu.Item
              onPress={handleAdminPortalPress} // Handle Admin Portal Press
              title="Admin Portal"
            />
          ) : (
            <Menu.Item
              onPress={() => {
                console.log('Option 3 was pressed');
              }}
              title="Option 3"
              disabled
            />
          )}
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}
