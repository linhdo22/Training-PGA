import React from 'react'

import TableRowComponent from './TableRowComponent'
import SortIconComponent from './SortIconComponent'
import '../style/product-table.scss'
import { IProduct, ISortInfo, SortBy } from '../../../models/product'
import { FormattedMessage } from 'react-intl'

interface Props {
    onSort(sortBy: SortBy): void
    sortInfo: ISortInfo
    viewingProducts: IProduct[]
}

function ProductTableComponent(props: Props) {
    const { onSort, sortInfo, viewingProducts } = props

    return (
        <div className="w-100 py-3">
            <table className="w-100 product-table">
                <thead>
                    <tr>
                        <th>
                            <FormattedMessage id="productStatus" />
                        </th>
                        <th onClick={() => onSort(SortBy.date)}>
                            <FormattedMessage id="productDate" />
                            <SortIconComponent
                                sortBy={SortBy.date}
                                sortInfo={sortInfo}
                            />
                        </th>
                        <th onClick={() => onSort(SortBy.currency)}>
                            <FormattedMessage id="productCurrency" />
                            <SortIconComponent
                                sortBy={SortBy.currency}
                                sortInfo={sortInfo}
                            />
                        </th>
                        <th onClick={() => onSort(SortBy.total)}>
                            <FormattedMessage id="productTotal" />
                            <SortIconComponent
                                sortBy={SortBy.total}
                                sortInfo={sortInfo}
                            />
                        </th>
                        <th colSpan={3}>
                            <FormattedMessage id="productOrder" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {viewingProducts?.map((product) => {
                        return (
                            <TableRowComponent
                                product={product}
                                key={product.payroll_id}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default React.memo(ProductTableComponent)
