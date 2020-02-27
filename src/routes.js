import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import Order from './pages/Order';
import CreateOrder from './pages/CreateOrder';
import Signin from './pages/Signin';
import PersonalDataForm from './pages/PersonalDataForm';
import SocioeconomicForm from './pages/SocioeconomicForm';
import ReferenceForm from './pages/ReferenceForm';
import FinancesDataForm from './pages/FinancesDataForm';
import FinancialClose from './pages/FinancialClose';
import FinancialDetailed from './pages/FinancialDetailed';
import DocumentsForm from './pages/DocumentsForm';
import Interviewed from './pages/Interviewed';
import ShowData from './pages/ShowData';
import EditPersonalData from './pages/EditPersonalData';
import EditSocioeconomicData from './pages/EditSocioeconomicData';
import EditReferenceData from './pages/EditReferenceData';
import EditFinancesData from './pages/EditFinancesData';
import EditDocumentsData from './pages/EditDocumentsData';
import PersonalData from './pages/PersonalData';
import DiscountsForm from './pages/DiscountsForm';
import AdditionForm from './pages/AdditionForm';
import ContractData from './pages/ContractData';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import UserList from './pages/UserList';
import Home from './pages/Home';
import LayOff from './pages/LayOff';
import InterviewedList from './pages/InterviewedList';

const AppStack = createStackNavigator(
  {
    // Main: {
    //   screen: Main,
    //   navigationOptions: {
    //     title: 'Pedidos',
    //   },
    // },
    // CreateOrder: {
    //   screen: CreateOrder,
    //   navigationOptions: () => ({
    //     headerShown: false,
    //   }),
    // },
    // Order: {
    //   screen: Order,
    //   navigationOptions: {
    //     title: 'Pedido Detalhado',
    //   },
    // },
    Home: {
      screen: Home,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    Interviewed: {
      screen: Interviewed,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    PersonalData: {
      screen: PersonalData,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    DiscountsForm: {
      screen: DiscountsForm,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    AdditionForm: {
      screen: AdditionForm,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    FinancialClose: {
      screen: FinancialClose,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    FinancialDetailed: {
      screen: FinancialDetailed,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    ShowData: {
      screen: ShowData,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    EditPersonalData: {
      screen: EditPersonalData,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    EditSocioeconomicData: {
      screen: EditSocioeconomicData,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    EditReferenceData: {
      screen: EditReferenceData,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    EditFinancesData: {
      screen: EditFinancesData,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    EditDocumentsData: {
      screen: EditDocumentsData,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    ContractData: {
      screen: ContractData,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    PersonalDataForm: {
      screen: PersonalDataForm,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    SocioeconomicForm: {
      screen: SocioeconomicForm,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    ReferenceForm: {
      screen: ReferenceForm,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    FinancesDataForm: {
      screen: FinancesDataForm,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    DocumentsForm: {
      screen: DocumentsForm,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    Profile: {
      screen: Profile,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    LayOff: {
      screen: LayOff,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    Settings: {
      screen: Settings,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    UserList: {
      screen: UserList,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    InterviewedList: {
      screen: InterviewedList,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    User,
  },
  {
    headerLayoutPreset: 'center',
    headerBackTitleVisible: false,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f48024',
        // backgroundColor: '#222426'
        // backgroundColor: '#bcbbbb'
      },
      headerTintColor: '#fff',
    },
  }
);
const AuthStack = createStackNavigator({
  Signin: {
    screen: Signin,
    navigationOptions: () => ({
      headerShown: false,
    }),
  },
});

// const FormStack = createStackNavigator({
//   PersonalDataForm: {
//     screen: PersonalDataForm,
//     navigationOptions: () => ({
//       headerShown: false,
//       // headerLeft: () => {
//       //   return (
//       //     <TouchableOpacity
//       //       style={{
//       //         paddingHorizontal: 20,
//       //         height: 50,
//       //         justifyContent: 'center',
//       //         alignItems: 'center',
//       //         backgroundColor: 'pink',
//       //       }}
//       //     >
//       //       <Feather name="chevron-left" size={28} color="#f48024" />
//       //     </TouchableOpacity>
//       //   );
//       // },
//     }),
//   },
//   SocioeconomicForm: {
//     screen: SocioeconomicForm,
//     navigationOptions: () => ({
//       headerShown: false,
//     }),
//   },
//   ReferenceForm: {
//     screen: ReferenceForm,
//     navigationOptions: () => ({
//       headerShown: false,
//     }),
//   },
// });

const Routes = (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: AuthStack,
        App: AppStack,
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
        // initialRouteName: 'App',
        // initialRouteName: 'Sign',
      }
    )
  );

export default Routes;
