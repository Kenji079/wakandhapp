import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import sideMenuDesign from '../route/sideMenuDesign';
import home2 from '../component/home2';

const sideMenu = createDrawerNavigator({

  home2:{
    screen: home2
}

}, {
  drawerWidth: 250,
  initialRouteName: 'home2',
  contentComponent: sideMenuDesign,
});


export default (sideMenu);

