import { auth } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {
    const { userId } = await auth();
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard</p>
            <p>User ID: {userId}</p>
        </div>
    )
}

export default page