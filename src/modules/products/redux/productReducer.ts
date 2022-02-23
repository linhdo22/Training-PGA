import { createCustomAction, ActionType, getType } from "typesafe-actions";

import { IFilterObject, IProduct } from "../../../models/product";




export interface IProductState {
    list?: IProduct[];
    filteredList: IProduct[];
    viewingList: IProduct[];
    viewingDetailProduct: IProduct | null;
    removingProduct: IProduct | null;
    filter: IFilterObject
}

const initProductState: IProductState = {
    removingProduct: null,
    viewingDetailProduct: null,
    filter: { status: "", client: "", from: null, to: null },
    filteredList: [],
    viewingList: [],
}

export const setProductsAction = createCustomAction('product/setProducts', (products: IProduct[]) => ({ products }))
export const setFilterObjectAction = createCustomAction('product/setFilterObject', (filter: IFilterObject) => ({ filter }))
export const setFilteredListAction = createCustomAction('product/setFilteredListObject', (filteredList: IProduct[]) => ({ filteredList }))
export const setViewingListAction = createCustomAction('product/setViewingListObject', (viewingList: IProduct[]) => ({ viewingList }))
export const setViewingDetailProductAction = createCustomAction('product/setViewingDetailProduct', (product: IProduct | null) => ({ product }))
export const setRemovingProductAction = createCustomAction('product/setRemovingProduct', (product: IProduct | null) => ({ product }))
export const removeProductAction = createCustomAction('product/removeProduct', (productId) => ({ productId }))

const actions = {
    setProductsAction,
    setViewingDetailProductAction,
    setRemovingProductAction,
    removeProductAction,
    setFilterObjectAction,
    setFilteredListAction,
    setViewingListAction
}

type ProductActions = ActionType<typeof actions>

export default function reducer(state: IProductState = initProductState, action: ProductActions) {
    switch (action.type) {
        case getType(setProductsAction):
            return { ...state, list: action.products }
        case getType(setFilteredListAction):
            return { ...state, filteredList: action.filteredList }
        case getType(setViewingListAction):
            return { ...state, viewingList: action.viewingList }
        case getType(setFilterObjectAction):
            return { ...state, filter: action.filter }
        case getType(removeProductAction):
            return { ...state, list: state.list?.filter(product => product.payroll_id != action.productId) }
        case getType(setRemovingProductAction):
            return { ...state, removingProduct: action.product }
        case getType(setViewingDetailProductAction):
            return { ...state, viewingDetailProduct: action.product }
        default:
            return state
    }
}