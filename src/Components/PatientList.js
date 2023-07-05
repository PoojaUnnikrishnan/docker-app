import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    // This fetch the all the patient data from fhir/patient endpoint 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/fhir/Patient');
                setPatients(response.data.entry);
                console.log(response.data.entry)
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='flex'>
            <div className='w-full justify-center flex'>
                <table className="border-2 md:w-11/12 lg:w-1/2">
                    <thead>
                        <tr>
                            <th className="border-2 bg-green-200">Name</th>
                            <th className="border-2 bg-green-200">Age</th>
                            <th className="border-2 bg-green-200">Gender</th>
                            <th className="border-2 bg-green-200">Date Of Birth</th>
                            <th className="border-2 bg-green-200">Conatct Number</th>
                        </tr>
                    </thead>
                    <tbody className="border-2">
                        {patients.map((patient) => {
                            const { id, name, birthDate, gender, telecom } = patient.resource;
                            const currentDate = new Date();
                            const dob = new Date(birthDate);
                            const age = currentDate.getFullYear() - dob.getFullYear();
                            return (
                                <tr key={id} className="border-2">
                                    <td className="border-2">{`${name[0].given.join(' ')} ${name[0].family}`}</td>
                                    <td className="border-2">{age || "-"}</td>
                                    <td className="border-2">{gender}</td>
                                    <td className="border-2">{birthDate || "-"}</td>
                                    <td className="border-2">{telecom ? telecom[0].value : "-"}</td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PatientList;
