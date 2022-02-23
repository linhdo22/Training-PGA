export interface IFilterObject {
    status: string;
    client: string;
    from: Date | null;
    to: Date | null;
    order: string
}

export enum SortBy {
    date,
    total,
    currency,
    none
}
export enum SortType {
    normal,
    asc,
    desc
}
export interface ISortInfo {
    by: SortBy
    type: SortType
}

export interface IProduct {
    approved: boolean,
    canceled: boolean,
    company_id: string,
    confirmed: boolean,
    currency: string,
    date_canceled: Date | null,
    date_confirmed: Date | null,
    date_fulfilled: Date | null,
    date_matched: Date | null,
    date_processed: Date | null,
    date_received: Date | null,
    date_released: Date | null,
    fees: number,
    fulfilled: boolean,
    is_premium: boolean,
    matched: boolean,
    number_of_recipients: number,
    payment_type: string,
    payroll_id: string,
    received: boolean,
    released: boolean,
    subpayroll_ids: string | string[],
    time_created: string,
    volume_input_in_input_currency: number,
    status?: string;
}