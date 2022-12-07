import { Home } from './js/pages/home.jsx'
import { AppWatchlist } from './js/pages/app-watchlist.jsx'
import { ShowDetails } from './js/pages/show-details.jsx'
import { SignIn } from './js/pages/sign-in'
import { SignUp } from './js/pages/sign-up'
import { ResetPassword } from './js/pages/reset-password'


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