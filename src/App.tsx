import Cookies from 'js-cookie'
import React, { lazy, Suspense, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css'
import { ROUTES } from './config/routes'
import { LIST_PAYROLL } from './mock_data'
import { IProduct } from './models/product'
import Header from './modules/common/components/Header'
import ProtectedRoute from './modules/common/components/ProtectedRoute'
import { getProfileThunk } from './modules/common/redux/thunk'
import { setProductsAction } from './modules/products/redux/productReducer'
import { getStatus } from './modules/products/utils'
import { AppState } from './redux/reducers'
import { CustomThunkDispatch } from './redux/thunk'
import { ACCESS_TOKEN } from './utils/constant'


const HomePage = lazy(() => import('./modules/home/pages/HomePage'))
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'))
const RegisterPage = lazy(() => import('./modules/auth/pages/RegisterPage'))
const ProfilePage = lazy(() => import('./modules/profile/pages/ProfilePage'))
const ProductPage = lazy(() => import('./modules/products/pages/ProductPage'))
const PhotoListPage = lazy(
    () => import('./modules/photo-list/pages/PhotoListPage'),
)
const PhotoDetailPage = lazy(
    () => import('./modules/photo-list/pages/DetailPhotoPage'),
)

function App() {
    const dispatch = useDispatch<CustomThunkDispatch>()
    const user = useSelector<AppState>((state) => state.auth.user)

    const getProfile = useCallback(async () => {
        const accessToken = Cookies.get(ACCESS_TOKEN)
        if (accessToken && !user) {
            dispatch(getProfileThunk)
        }
    }, [dispatch, user])

    useEffect(() => {
        getProfile()
    }, [getProfile])

    useEffect(() => {
        const products = (LIST_PAYROLL.payrolls as any).map(
            (product: IProduct) => {
                product.status = getStatus(product)
                return product
            },
        )
        dispatch(setProductsAction(products))
    })
    return (
        <BrowserRouter>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <ProtectedRoute
                        exact
                        path={ROUTES.home}
                        component={HomePage}
                    />
                    <ProtectedRoute
                        path={ROUTES.photoList + '/:id'}
                        component={PhotoDetailPage}
                    />
                    <ProtectedRoute
                        path={ROUTES.photoList}
                        component={PhotoListPage}
                    />
                    <ProtectedRoute
                        path={ROUTES.profile}
                        component={ProfilePage}
                    />
                    <Route path={ROUTES.products} component={ProductPage} />
                    <Route path={ROUTES.login} component={LoginPage} />
                    <Route path={ROUTES.register} component={RegisterPage} />
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}

export default App
