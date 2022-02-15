import Cookies from "js-cookie";

import { ACCESS_TOKEN } from "../../utils/constant";

export async function CustomFetch(url: string,
    method: 'get' | 'post' | 'delete' | 'put' = 'get',
    body?: object | FormData,
    auth = true,
    contentType?: string) {
    const res = await fetch(url, {
        credentials: 'include',
        method,
        body: typeof body === 'object' ? JSON.stringify(body) : body,
        headers:
            contentType !== 'multipart/form-data'
                ? {
                    'Content-Type': contentType || 'application/json',
                    Authorization: Cookies.get(ACCESS_TOKEN) || '',
                }
                : {},
        cache: 'no-store',
    });
    const json = await res.json();
    return json
}