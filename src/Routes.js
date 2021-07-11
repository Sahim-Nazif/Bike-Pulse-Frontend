import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import PrivateRoutes from './auth/PrivateRoute'
import UserDashboard from './user/UserDashboard'
import AdminRoutes from './auth/AdminRoutes'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProuduct'
import Shop from './core/Shop'
import Bike from './core/Bike'


const Routes = () => {
    return (
        <BrowserRouter>
     
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/shop' exact component={Shop}/>
                <Route path='/signin' exact component={Signin}/>
                <Route path='/signup' exact component={Signup}/>
                <PrivateRoutes path='/user/dashboard' exact component={UserDashboard}/>
                <AdminRoutes path='/admin/dashboard' exact component={AdminDashboard}/>
                <AdminRoutes path='/create/category' exact component={AddCategory}/>
                <AdminRoutes path='/create/product' exact component={AddProduct}/>
                <Route path='/product/:productId' exact component={Bike}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
