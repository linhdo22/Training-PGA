import React, { useCallback, useEffect, useRef } from 'react'
import { Modal } from 'bootstrap'

import {
    removeProductAction,
    setRemovingProductAction,
} from '../redux/productReducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../redux/reducers'
import { IProduct } from '../../../models/product'
import { FormattedMessage } from 'react-intl'

function ProductRemoveAlertComponent() {
    const removingProduct = useSelector<AppState, IProduct | null>(
        (state) => state.products.removingProduct,
    )
    const dispatch = useDispatch()
    const modal = useRef<Modal | null>(null)

    useEffect(() => {
        if (removingProduct) {
            modal.current?.show()
        }
    }, [removingProduct])

    const handleCloseModal = useCallback(() => {
        modal.current?.hide()
    }, [])

    useEffect(() => {
        const modalTarget = document.getElementById('product-remove-alert')
        if (modalTarget) {
            modal.current = new Modal(modalTarget)
            modalTarget.addEventListener('hidden.bs.modal', () => {
                dispatch(setRemovingProductAction(null))
            })
            return () => {
                if (modal.current) {
                    modal.current.dispose()
                }
            }
        }
    }, [handleCloseModal, dispatch])

    const handleRemove = () => {
        dispatch(removeProductAction(removingProduct?.payroll_id))
        handleCloseModal()
    }
    return (
        <>
            <div id="product-remove-alert" className="modal" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                <FormattedMessage id="removingProductAlertTitle" />
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleCloseModal}
                            ></button>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleRemove}
                            >
                                <FormattedMessage id="remove" />
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCloseModal}
                            >
                                <FormattedMessage id="stopChange" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(ProductRemoveAlertComponent)
