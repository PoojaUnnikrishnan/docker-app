import React from 'react'
import PatientList from "./PatientList"
const List = () => {
    return (
        <div className='flex-col h-5/6 '>
            <div className='font-bold my-10 underline underline-offset-2 flex justify-center'>List of Patients</div>
            <div>
                <PatientList />
            </div>
        </div>
    )
}

export default List