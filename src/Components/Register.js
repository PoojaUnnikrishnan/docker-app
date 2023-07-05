import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [contactNo, setContactNo] = useState('')
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
        setErrors(validationErrors)
        return Object.keys(validationErrors).length === 0;

    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(firstName, lastName, dob, contactNo, gender)
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
        <div className="flex justify-center items-center h-5/6 mt-10">
            <div>
                <div className='border-2 border-black p-10'>
                    <div className="text-2xl font-bold mb-7 border-b-2 flex justify-center">
                        Register
                    </div>
                    <form onSubmit={handleFormSubmit} className='flex-col'>
                        <div>
                            <div>
                                <label>FirstName:</label>
                                <input type='text' id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <div className='text-xs text-red-600'>
                                    {errors.firstName && <span>{errors.firstName}</span>}
                                </div>
                            </div>
                            <br />
                            <div>
                                <label>LastName:</label>
                                <input type='text' id='firstName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <br />
                            <div>
                                <label>Gender: </label>
                                <select id='gender' value={gender} onChange={(e) => setGender(e.target.value)} className='w-48'>
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="unknown">Unknown</option>
                                </select>
                                <div className='text-xs text-red-600'>
                                    {errors.gender && <span>{errors.gender}</span>}
                                </div>
                            </div>
                            <br />
                            <div style={{ marginRight: "70px" }}>
                                <label>DOB: </label>
                                <input type='date' id='dob' value={dob} onChange={(e) => setDob(e.target.value)} />
                            </div>
                            <br />
                            <div style={{ marginLeft: "15px" }}>
                                <label>Contact No:</label>
                                <input type='text' id='contactNo' value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                                <div className='text-xs text-red-600'>
                                    {errors.contactNo && <span>{errors.contactNo}</span>}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className='border-2 rounded-lg bg-green-200 p-1 mt-10'>Register</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register