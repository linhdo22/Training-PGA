import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SelectOption } from '../../../models/common'
import { AppState } from '../../../redux/reducers'
import SelectionComponent from '../../products/components/SelectionComponent'
import { selectLanguageOptions } from '../constant'
import { setLocale } from '../redux/intlReducer'

function LanguageSelectionComponent() {
    const dispatch = useDispatch()
    const locale = useSelector<AppState, string>((state) => state.intl.locale)

    const handleChangeLanguage = (selection: SelectOption) => {
        dispatch(setLocale(selection.value))
    }
    return (
        <div>
            <SelectionComponent
                title=""
                list={selectLanguageOptions}
                selectedValue={locale}
                onSelect={handleChangeLanguage}
                width={120}
            />
        </div>
    )
}

export default LanguageSelectionComponent
