import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="flex items-center bg-green-200 p-5 justify-between border-4">
            <div className="font-bold text-lg sm:text-sm"><Link to="/">Patient Resource</Link></div>
            <div className="flex">
                <div className="mx-4">
                    <Link to="/register">Register</Link>
                </div>
                <div className="mx-4">
                    <Link to="/list">List</Link>
                </div>
                <div className="mx-4">
                    <Link to="/tree">Tree</Link>
                </div>
            </div>
        </div>
    )
}

export default Header