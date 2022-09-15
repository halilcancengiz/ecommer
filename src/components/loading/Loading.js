import React, { memo } from 'react'
import { SpinnerDiamond } from 'spinners-react';


const Loading = () => {
    return (
        <div className='mt-5'>
            <SpinnerDiamond size={100} color={"blue"} secondaryColor="white" />
        </div>
    )
}

export default memo(Loading)