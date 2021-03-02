import React from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Chakra
import { ChakraProvider } from '@chakra-ui/react'

// Context
import { AuthProvider } from './contexts/AuthContext'

// Comps
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import CreateEventPage from './pages/CreateEventPage'
import FourOhFour from './pages/FourOhFour'
import ForgotPassword from './pages/ForgotPassword'
import EventDetailsPage from './pages/EventDetailsPage'
import DashboardPage from './pages/DashboardPage'

const App = () => {
  return (
    <Router>
      <ChakraProvider>
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/event/:id" component={EventDetailsPage} />
            <PrivateRoute exact path="/dashboard" component={DashboardPage} />
            <PrivateRoute exact path="/create" component={CreateEventPage} />
            <Route path="*" component={FourOhFour} />
          </Switch>
          <Footer />
        </AuthProvider>
      </ChakraProvider>
    </Router>
  )
}
export default hot(App)
