import React from 'react'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { ROUTES } from '../../../config/routes'
import { AppState } from '../../../redux/reducers'
import { ACCESS_TOKEN } from '../../../utils/constant'
import { logOutAction } from '../../auth/redux/authReducer'
import LanguageSelectionComponent from '../../intl/component/LanguageSelectionComponent'
import { FormattedMessage } from 'react-intl'

function Header() {
    const user = useSelector((state: AppState) => state.auth.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch(logOutAction())
        Cookies.remove(ACCESS_TOKEN)
        history.push(ROUTES.login)
    }

    if (!user) {
        return null
    }
    return (
        <div className="bg-primary">
            <div className="container">
                <div className="navbar navbar-expand-lg navbar-dark bg-primay">
                    <Link to={ROUTES.home} className="navbar-brand">
                        <FormattedMessage id="headerHome" />
                    </Link>
                    <div className="navbar-nav me-auto">
                        <Link to={ROUTES.photoList} className="nav-link">
                            <FormattedMessage id="headerPhotoList" />
                        </Link>
                        <Link to={ROUTES.profile} className="nav-link">
                            <FormattedMessage id="headerProfile" />
                        </Link>
                        <Link to={ROUTES.products} className="nav-link">
                            <FormattedMessage id="headerProducts" />
                        </Link>
                    </div>
                    <div className="ms-auto d-flex ">
                        <LanguageSelectionComponent />
                        <div
                            className="ms-2 btn btn-warning text-white"
                            onClick={handleLogout}
                        >
                            <FormattedMessage id="headerLogout" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
