import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Result } from 'antd';

const NotFound = () => {
    return (
        <div style={{minHeight:"100vh"}}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary"><NavLink to="/">Back To Home Page</NavLink></Button>}
                className="notFound"
            />
        </div>

    )
}

export default memo(NotFound)