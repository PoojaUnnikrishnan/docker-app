import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = (e) => {
        const validationErrors = {}
        if (!firstName) {
            validationErrors.firstName = "first name is mandatory";
        }
        if (!gender) {
            validationErrors.gender = "gender is mandatory";
        }
        if (contactNo && !/^\d{10}$/.test(contactNo)) {
            validationErrors.contactNo = "contact number must have 10 digits";
        }
        if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            validationErrors.email = "email is incorrect";
        }
        setErrors(validationErrors)
        return Object.keys(validationErrors).length === 0;

    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(firstName, lastName, dob, contactNo, gender, email)
            let data = JSON.stringify({
                "resourceType": "Patient",
                "name": [
                    {
                        "given": [
                            firstName
                        ],
                        "family": lastName
                    }
                ],
                "gender": gender,
                "birthDate": dob,
                "telecom": [
                    {
                        "value": contactNo
                    },
                    {
                        "value": email
                    }
                ]
            });
            console.log(data)
            //Making a post request to the fhir/patient end point for all the newly registered users.
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/fhir/Patient',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            await axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    navigate("/list")
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <div className="flex justify-center items-center mt-20">
            <div className=''>
                <div className="mb-7 flex justify-center">
                    New Registration
                </div>
                <form onSubmit={handleFormSubmit} className='flex-col'>
                    <div className='flex-col text-left'>
                        <div className='text-sm/[11px] pb-3'>
                            Name*
                        </div>
                        <div className='flex gap-5'>
                            <div className=''>
                                <div className=''>
                                    <input type='text' id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} className='bg-gray-100' />
                                </div>
                                <div className='text-xs text-gray-400'>
                                    <label>First Name</label>
                                </div>
                                <div className='text-xs text-red-600 flex'>
                                    {errors.firstName && <span>{errors.firstName}</span>}
                                </div>
                            </div>
                            <div className=''>
                                <div>
                                    <input type='text' id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} className='bg-gray-100' />
                                </div>
                                <div className='text-xs text-gray-400'>
                                    <label>Last Name</label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <br />
                    <div className='flex-col'>
                        <div className='text-left text-sm/[11px] pb-3'>
                            <label>
                                Email
                            </label>
                        </div>
                        <div>
                            <input className='bg-gray-100 w-full' type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='text-xs text-red-600 flex'>
                            {errors.email && <span>{errors.email}</span>}
                        </div>
                    </div>
                    <br />
                    <div className='flex-col'>
                        <div className='text-left text-sm/[11px] pb-3'>
                            <label >Gender*</label>
                        </div>
                        <div>
                            <select className='bg-gray-100 w-full text-gray-400 p-1' id='gender' value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="unknown">Unknown</option>
                            </select>

                        </div>
                        <div className='text-xs text-red-600 flex'>
                            {errors.gender && <span>{errors.gender}</span>}
                        </div>
                    </div>
                    <br />
                    <div className=''>
                        <div className='text-left text-sm/[11px] pb-3'>
                            <label>DOB</label>
                        </div>
                        <div>
                            <input className='bg-gray-100 w-full text-gray-400 p-1/2' type='date' id='dob' value={dob} onChange={(e) => setDob(e.target.value)} />
                        </div>
                    </div>
                    <br />
                    <div>
                        <div className='text-left text-sm/[11px] pb-3'>
                            <label>Contact No</label>
                        </div>
                        <div className=''>
                            <input className='w-full bg-gray-100' type='text' id='contactNo' value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                        </div>
                        <div className='text-xs text-red-600 flex'>
                            {errors.contactNo && <span>{errors.contactNo}</span>}
                        </div>
                    </div>
                    <div className='border-2 mt-10'>
                        <button type="submit" className='bg-green-200 w-full'>Register</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Register


