import React from 'react'
import LoginComponent from '../components/LoginComponent'

const LoginContainer = () => {
    return (
        <div style={{
            background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,92,121,1) 0%, rgba(0,220,255,1) 100%)",
            height: "100vh"
        }}>
            <LoginComponent />
        </div>
    )
}

export default LoginContainer
