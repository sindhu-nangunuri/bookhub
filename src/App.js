import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import BookShelves from './components/BookShelves'
import BookItemDetails from './components/BookItemDetails'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/shelf" component={BookShelves} />
        <ProtectedRoute exact path="/books/:id" component={BookItemDetails} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

export default App
