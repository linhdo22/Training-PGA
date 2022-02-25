import React from 'react'
import { FormattedMessage } from 'react-intl'

import '../style/avatar.scss'

interface Props {
    src: string
    width: number
    height: number
    onClick(): void
}

function AvatarComponent(props: Props) {
    const { src, width, height, onClick } = props
    return (
        <div
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
            onClick={onClick}
        >
            <div
                className="avatar border border-3 border-primary bg-white w-100 h-100 rounded-circle"
                style={{
                    backgroundImage: `url(http://api.training.div3.pgtest.co/${src})`,
                }}
            >
                <div className="slider">
                    <FormattedMessage id="profileAvatarHover" />
                </div>
            </div>
        </div>
    )
}

export default AvatarComponent
