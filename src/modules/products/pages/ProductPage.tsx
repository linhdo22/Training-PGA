import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CSVLink } from 'react-csv'

import '../style/style.scss'
import ProductTableComponent from '../components/ProductTableComponent'
import ProductFilterComponent from '../components/ProductFilterComponent'
import ProductDetailModalComponent from '../components/ProductDetailModalComponent'
import { useSelector } from 'react-redux'
import { AppState } from '../../../redux/reducers'
import ProductRemoveAlertComponent from '../components/ProductRemoveAlertComponent'
import {
    IFilterObject,
    IProduct,
    ISortInfo,
    SortBy,
    SortType,
} from '../../../models/product'
import TablePaginationCompoent from '../components/TablePaginationComponent'
import { sortAsc, sortDesc } from '../utils'
import { FormattedMessage } from 'react-intl'
import SelectionComponent from '../components/SelectionComponent'
import { productsPerPageOptions } from '../constant'

export default function ProductPage() {
    const products = useSelector<AppState, IProduct[] | undefined>(
        (state) => state.products.list,
    )
    const filterObject = useSelector<AppState, IFilterObject>(
        (state) => state.products.filter,
    )
    const [productsPerPage, setProductsPerPage] = useState(5)
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])
    const [sortedProducts, setSortedProducts] = useState<IProduct[]>([])
    const [viewingProducts, setViewingProducts] = useState<IProduct[]>([])
    const [sortInfo, setSortInfo] = useState<ISortInfo>({
        type: SortType.normal,
        by: SortBy.none,
    })
    const [currentPage, setCurrentPage] = useState(1)

    // if pull lastest products from sv then re-assign to filteredList
    useEffect(() => {
        setFilteredProducts(
            products!.filter((product) => {
                let valid = true
                if (
                    filterObject.status !== '' &&
                    filterObject.status !== product.status
                ) {
                    valid = false
                }
                if (
                    valid && // if false then skip rest conditions
                    filterObject.from &&
                    filterObject.from.getTime() >
                        new Date(product.time_created).getTime()
                ) {
                    valid = false
                }
                if (
                    valid && // if false then skip rest conditions
                    filterObject.to &&
                    filterObject.to.getTime() <
                        new Date(product.time_created).getTime()
                ) {
                    valid = false
                }
                if (
                    valid && // if false then skip rest conditions
                    filterObject.order &&
                    !product.payroll_id.includes(filterObject.order)
                ) {
                    valid = false
                }
                return valid
            }),
        )
    }, [products, filterObject])

    // only run when filter change - for prevent back to page 1 when changing data
    useEffect(() => {
        setCurrentPage(1)
    }, [filterObject])

    // change sortedProducts
    useEffect(() => {
        let tempList = []
        if (sortInfo.type == SortType.asc) {
            tempList = sortAsc(sortInfo.by, [...filteredProducts])
        } else if (sortInfo.type == SortType.desc) {
            tempList = sortDesc(sortInfo.by, [...filteredProducts])
        } else {
            tempList = [...filteredProducts]
        }
        setSortedProducts(tempList)
    }, [filteredProducts, sortInfo])

    const pagesLength = useMemo(
        () => Math.ceil(sortedProducts.length / productsPerPage),
        [sortedProducts, productsPerPage],
    )
    const startIndex = useMemo(
        () => (currentPage - 1) * productsPerPage,
        [currentPage, productsPerPage],
    )

    // set viewingProducts
    useEffect(() => {
        setViewingProducts(
            sortedProducts.slice(startIndex, startIndex + productsPerPage),
        )
    }, [sortedProducts, startIndex, productsPerPage])

    const handleSort = useCallback((sortBy: SortBy) => {
        setSortInfo((prev) => {
            // behavior on click - 1: asc -> 2: desc -> 3: normal
            if (prev.by == sortBy) {
                if (prev.type == SortType.desc) {
                    return { type: SortType.normal, by: SortBy.none }
                }
                return { ...prev, type: SortType.desc }
            }
            return { type: SortType.asc, by: sortBy }
        })
    }, [])
    return (
        <div className="container" id="table-container">
            <div className="row my-5">
                <div className="col p-3">
                    <div className="d-flex my-2 ">
                        <div id="table-title" className="fs-3 fw-bold ">
                            <FormattedMessage id="payrollTransistionTitle" />
                        </div>
                        <div className="ms-auto">
                            <button className="btn btn-info ">
                                <CSVLink
                                    data={viewingProducts!}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'white',
                                    }}
                                >
                                    <FormattedMessage id="exportCSV" />
                                </CSVLink>
                            </button>
                        </div>
                    </div>
                    <ProductFilterComponent />
                    <ProductTableComponent
                        onSort={handleSort}
                        sortInfo={sortInfo}
                        viewingProducts={viewingProducts}
                    />
                    <div className="d-flex w-100 px-5">
                        <div>
                            <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <FormattedMessage id="selectProductsPerPage" />
                                </div>
                                <SelectionComponent
                                    title=""
                                    list={productsPerPageOptions}
                                    selectedValue={productsPerPage.toString()}
                                    onSelect={(selection) =>
                                        setProductsPerPage(
                                            parseInt(selection.value),
                                        )
                                    }
                                    width={60}
                                />
                            </div>
                            <div className='mt-1'>
                                <FormattedMessage id="countProductShow" />{' '}
                                {startIndex}{' '}
                                <FormattedMessage id="countProductTo" />{' '}
                                {Math.min(
                                    startIndex + productsPerPage,
                                    filteredProducts.length,
                                )}{' '}
                                <FormattedMessage id="countProductOf" />{' '}
                                {filteredProducts.length}
                            </div>
                        </div>
                        <div className="ms-auto">
                            <TablePaginationCompoent
                                currentPage={currentPage}
                                pagesLength={pagesLength}
                                setPage={setCurrentPage}
                            />
                        </div>
                    </div>
                    <ProductDetailModalComponent />
                    <ProductRemoveAlertComponent />
                </div>
            </div>
        </div>
    )
}
