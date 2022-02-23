import { IProduct, SortBy } from "../../models/product";


export const statusSelectionOptions = [
    { label: 'All', value: '' },
    { label: 'Fulfilled', value: 'fulfilled' },
    { label: 'Processing', value: 'processing' },
    { label: 'Received', value: 'received' },
    { label: 'Pending', value: 'pending' },
    { label: 'Canceled', value: 'canceled' },
]

export const getStatus = (product: IProduct) => {
    if (product.canceled) {
        return 'canceled';
    }
    if (product.fulfilled) {
        return 'fulfilled';
    }
    if (product.matched || product.approved) {
        return 'processing';
    }
    if (product.received) {
        return 'received';
    }
    return 'pending';
}


export const validateDate = (from: Date | null, to: Date | null) => {
    if (!from) {
        return true
    }
    if (!to) {
        return true
    }
    if (from.getTime() > to.getTime()) {
        return false
    }
    return true
}

export const pagination = (length: number, current: number, adjacents: number = 3) => {
    let pages = [];
    for (let i = 0; i < length; i++) {
        pages[i] = i + 1;
    }
    const newAdj = Math.floor(adjacents / 2) * 2 + 1
    if (newAdj >= 1) {
        const startSlice = Math.max(0, Math.min(length - newAdj, current - Math.ceil(newAdj / 2)))
        pages = pages.slice(startSlice, startSlice + newAdj)
    }
    return pages;
}



export function sortAsc(sortBy: SortBy, data: IProduct[]) {
    if (sortBy == SortBy.date) {
        data.sort((a: IProduct, b: IProduct) => {
            const aTime = (new Date(a.time_created)).getTime();
            const bTime = (new Date(b.time_created)).getTime();
            return aTime - bTime
        })
    }
    else if (sortBy == SortBy.total) {
        data.sort((a: IProduct, b: IProduct) => {
            return (a.fees + a.volume_input_in_input_currency) - (b.fees + b.volume_input_in_input_currency)
        })
    }
    else if (sortBy == SortBy.currency) {
        data.sort((a: IProduct, b: IProduct) => {
            if (a.currency == b.currency) {
                return 0;
            }
            return a.currency > b.currency ? 1 : -1
        })
    }
    return data
}

export function sortDesc(sortBy: SortBy, data: IProduct[]) {
    if (sortBy == SortBy.date) {
        data.sort((a: IProduct, b: IProduct) => {
            const aTime = (new Date(a.time_created)).getTime();
            const bTime = (new Date(b.time_created)).getTime();
            return bTime - aTime
        })
    }
    else if (sortBy == SortBy.total) {
        data.sort((a: IProduct, b: IProduct) => {
            return (b.fees + b.volume_input_in_input_currency) - (a.fees + a.volume_input_in_input_currency)
        })
    }
    else if (sortBy == SortBy.currency) {
        data.sort((a: IProduct, b: IProduct) => {
            if (a.currency == b.currency) {
                return 0;
            }
            return a.currency > b.currency ? -1 : 1
        })
    }
    return data
}