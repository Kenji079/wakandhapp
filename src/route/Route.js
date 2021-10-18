import slider from './../component/slider';
import login from './../component/login';
import signup from './../component/signup';
import resetPassword from './../component/resetPassword';
import OTP from './../component/OTP';
import newPassword from './../component/newPassword';
import selectcategory from './../component/selectcategory';
import servicedescription from './../component/servicedescription';
import servicetracking from './../component/servicetracking';
import notification from './../component/notification';
import blog from './../component/blog';
import createblog from './../component/createblog';
import group from './../component/group';
import groupdetail from './../component/groupdetail';
import creategroup from './../component/creategroup';
import verified from './../component/verified';
import events from './../component/events';
import createevents from './../component/createevents';
import comments from './../component/comments';
import setting from './../component/setting';
import pages from './../component/pages';
import timelineuserprofile from './../component/timelineuserprofile';
import pagedetail from './../component/pagedetail';
import friends from './../component/friends';
import menu from './../component/menu';
import rate from './../component/rate';
import verificationprofile from './../component/verificationprofile';
import myinformation from './../component/myinformation';
import automotive from './../component/automotive';
import addautomotive from './../component/automotive';
import videolibrary from './../component/videolibrary';
import createpage from './../component/createpage';
import Search from './../component/Search';
import login2 from './../component/login2';
import shop from './../component/shop';
import products from './../component/products';
import cart from './../component/cart';
import checkout from './../component/checkout';
import chatlist from './../component/chatlist';
import productdetails from './../component/productdetails';
import rating from './../component/rating';
import conversation from './../component/conversation';
import profile from './../component/profile';
import history from './../component/history';
import videos from './../component/videos';
import videodetail from './../component/videodetail';
import offers from './../component/offers';
import chat from './../component/chat';
import myfriends from './../component/myfriends';
import advancesearch from './../component/advancesearch';
import sideMenu from '../route/sideMenu';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';

const Route = createStackNavigator({
    slider: {
        screen: slider,
        navigationOptions: {
            header: null,
        },
    },
    login: {
        screen: login,
        navigationOptions: {
            header: null,
        },
    },
    myfriends: {
        screen: myfriends,
        navigationOptions: {
            header: null,
        },
    },
    timelineuserprofile: {
        screen: timelineuserprofile,
        navigationOptions: {
            header: null,
        },
    },
    videodetail: {
        screen: videodetail,
        navigationOptions: {
            header: null,
        },
    },
    videolibrary: {
        screen: videolibrary,
        navigationOptions: {
            header: null,
        },
    },
    conversation: {
        screen: conversation,
        navigationOptions: {
            header: null,
        },
    },
    chatlist: {
        screen: chatlist,
        navigationOptions: {
            header: null,
        },
    },
    checkout: {
        screen: checkout,
        navigationOptions: {
            header: null,
        },
    },
    cart: {
        screen: cart,
        navigationOptions: {
            header: null,
        },
    },
    productdetails: {
        screen: productdetails,
        navigationOptions: {
            header: null,
        },
    },
    products: {
        screen: products,
        navigationOptions: {
            header: null,
        },
    },
    shop: {
        screen: shop,
        navigationOptions: {
            header: null,
        },
    },
    login2: {
        screen: login2,
        navigationOptions: {
            header: null,
        },
    },
    pagedetail: {
        screen: pagedetail,
        navigationOptions: {
            header: null,
        },
    },
    chat: {
        screen: chat,
        navigationOptions: {
            header: null,
        },
    },
    groupdetail: {
        screen: groupdetail,
        navigationOptions: {
            header: null,
        },
    },
    pages: {
        screen: pages,
        navigationOptions: {
            header: null,
        },
    },
    comments: {
        screen: comments,
        navigationOptions: {
            header: null,
        },
    },
    videos: {
        screen: videos,
        navigationOptions: {
            header: null,
        },
    },
    advancesearch: {
        screen: advancesearch,
        navigationOptions: {
            header: null,
        },
    },
    automotive: {
        screen: automotive,
        navigationOptions: {
            header: null,
        },
    },
    addautomotive: {
        screen: addautomotive,
        navigationOptions: {
            header: null,
        },
    },
    myinformation: {
        screen: myinformation,
        navigationOptions: {
            header: null,
        },
    },
    createpage: {
        screen: createpage,
        navigationOptions: {
            header: null,
        },
    },
    verificationprofile: {
        screen: verificationprofile,
        navigationOptions: {
            header: null,
        },
    },
    setting: {
        screen: setting,
        navigationOptions: {
            header: null,
        },
    },
    notification: {
        screen: notification,
        navigationOptions: {
            header: null,
        },
    },
    friends: {
        screen: friends,
        navigationOptions: {
            header: null,
        },
    },
    verified: {
        screen: verified,
        navigationOptions: {
            header: null,
        },
    },
    group: {
        screen: group,
        navigationOptions: {
            header: null,
        },
    },
    creategroup: {
        screen: creategroup,
        navigationOptions: {
            header: null,
        },
    },
    blog: {
        screen: blog,
        navigationOptions: {
            header: null,
        },
    },
    createblog: {
        screen: createblog,
        navigationOptions: {
            header: null,
        },
    },
    menu: {
        screen: menu,
        navigationOptions: {
            header: null,
        },
    },
    events: {
        screen: events,
        navigationOptions: {
            header: null,
        },
    },
    createevents: {
        screen: createevents,
        navigationOptions: {
            header: null,
        },
    },
    rate: {
        screen: rate,
        navigationOptions: {
            header: null,
        },
    },
    signup: {
        screen: signup,
        navigationOptions: {
            header: null,
        },
    },
    servicedescription: {
        screen: servicedescription,
        navigationOptions: {
            header: null,
        },
    },
    servicetracking: {
        screen: servicetracking,
        navigationOptions: {
            header: null,
        },
    },
    resetPassword: {
        screen: resetPassword,
        navigationOptions: {
            header: null,
        },
    },
    OTP: {
        screen: OTP,
        navigationOptions: {
            header: null,
        },
    },
    newPassword: {
        screen: newPassword,
        navigationOptions: {
            header: null,
        },
    },
    selectcategory: {
        screen: selectcategory,
        navigationOptions: {
            header: null,
        },
    },
    home2: {
        screen: sideMenu,
        navigationOptions: {
            header: null,
        },
    },
    Search: {
        screen: Search,
        navigationOptions: {
            header: null,
        },
    },
    rating: {
        screen: rating,
        navigationOptions: {
            header: null,
        },
    },
    profile: {
        screen: profile,
        navigationOptions: {
            header: null,
        },
    },
    history: {
        screen: history,
        navigationOptions: {
            header: null,
        },
    },
    offers: {
        screen: offers,
        navigationOptions: {
            header: null,
        },
    },

}, {
    initialRouteName: 'slider'
})

export default createAppContainer(Route);

