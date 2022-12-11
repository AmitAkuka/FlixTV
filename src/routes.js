import { Home } from './js/pages/Home/Home'
import { AppWatchlist } from './js/pages/AppWatchlist/AppWatchlist'
import { ShowDetails } from './js/pages/ShowDetails/ShowDetails'
import { SignIn } from './js/pages/SignIn/SignIn'
import { SignUp } from './js/pages/SignUp/SignUp'
import { ResetPassword } from './js/pages/ResetPassword/ResetPassword'


export const routes = [
  {
    path: "/password-recovery",
    component: ResetPassword,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/login",
    component: SignIn,
  },
  {
    path: '/show/:id',
    component: ShowDetails,
  },
  {
    path: '/watchlist',
    component: AppWatchlist,
  },
  {
    path: '/',
    component: Home,
  }
]