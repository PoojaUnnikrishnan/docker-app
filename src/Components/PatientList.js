import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

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
            <div >
                <table className="border-2 w-screen">
                    <thead>
                        <tr>
                            <th className="border-2">Name</th>
                            <th className="border-2">Age</th>
                            <th className="border-2">Gender</th>
                        </tr>
                    </thead>
                    <tbody className="border-2">
                        {patients.map((patient) => {
                            const { id, name, birthDate, gender } = patient.resource;
                            const currentDate = new Date();
                            const dob = new Date(birthDate);
                            const age = currentDate.getFullYear() - dob.getFullYear();
                            return (
                                <tr key={id} className="border-2">
                                    <td className="border-2">{`${name[0].given.join(' ')} ${name[0].family}`}</td>
                                    <td className="border-2">{age}</td>
                                    <td className="border-2">{gender}</td>
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
