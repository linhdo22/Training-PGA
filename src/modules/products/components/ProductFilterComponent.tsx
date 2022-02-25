import React from 'react'

import PickDateComponent from './PickDateComponent'
import SelectionComponent from './SelectionComponent'
import InputComponent from './InputComponent'
import { statusSelectionOptions, validateDate } from '../utils'
import { useSelector } from 'react-redux'
import { AppState } from '../../../redux/reducers'
import { useDispatch } from 'react-redux'
import { setFilterObjectAction } from '../redux/productReducer'
import { IFilterObject } from '../../../models/product'
import { FormattedMessage } from 'react-intl'

function ProductFilterComponent() {
    const filterObject = useSelector<AppState, IFilterObject>(
        (state) => state.products.filter,
    )
    const dispatch = useDispatch()

    const handleChangeFilter = (
        type: string,
        value: string | Date | null = null,
    ) => {
        let newFilterObject = { ...filterObject }
        if (type == 'clear') {
            newFilterObject = {
                status: '',
                client: '',
                from: null,
                to: null,
                order: '',
            }
        } else if (type == 'status' && typeof value == 'string') {
            newFilterObject[type] = value
        } else if (type == 'order' && typeof value == 'string') {
            newFilterObject[type] = value
        } else if (type == 'from' && typeof value != 'string') {
            if (validateDate(value, filterObject.to)) {
                newFilterObject[type] = value
            }
        } else if (type == 'to' && typeof value != 'string') {
            if (validateDate(filterObject.from, value)) {
                newFilterObject[type] = value
            }
        }
        dispatch(setFilterObjectAction(newFilterObject))
    }

    return (
        <div className="d-flex align-items-center py-3">
            <div className="d-flex me-auto">
                {/* filter status */}
                <FormattedMessage id="productStatus">
                    {(message) => (
                        <div className="me-3">
                            <SelectionComponent
                                title={message.toString()}
                                list={statusSelectionOptions}
                                onSelect={(data) =>
                                    handleChangeFilter('status', data.value)
                                }
                                selectedValue={filterObject.status}
                            />
                        </div>
                    )}
                </FormattedMessage>
                {/* filter from  */}
                <div className="me-3">
                    <FormattedMessage id="fromDate">
                        {(message) => (
                            <PickDateComponent
                                placeholder={message.toString()}
                                onChange={(date) =>
                                    handleChangeFilter('from', date)
                                }
                                selectedValue={filterObject.from}
                            />
                        )}
                    </FormattedMessage>
                </div>
                {/* filter to  */}
                <div className="me-3">
                    <FormattedMessage id="toDate">
                        {(message) => (
                            <PickDateComponent
                                placeholder={message.toString()}
                                onChange={(date) =>
                                    handleChangeFilter('to', date)
                                }
                                selectedValue={filterObject.to}
                            />
                        )}
                    </FormattedMessage>
                </div>
                {/* Search  */}
                <div className="me-3">
                    <FormattedMessage id="productOrder">
                        {(message) => (
                            <InputComponent
                                placeholder={message.toString()}
                                onChange={(text) =>
                                    handleChangeFilter('order', text)
                                }
                                value={filterObject.order}
                            />
                        )}
                    </FormattedMessage>
                </div>
            </div>
            <div className="d-flex">
                <div className="btn btn-outline-primary rounded-3 border-2 fw-bold me-3">
                    <FormattedMessage id="applyFilter" />
                </div>
                <div
                    className="btn btn-outline-danger rounded-3 border-2 fw-bold"
                    onClick={() => handleChangeFilter('clear')}
                >
                    <FormattedMessage id="clearFilter" />
                </div>
            </div>
        </div>
    )
}

export default React.memo(ProductFilterComponent)
