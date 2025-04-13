import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { db } from './FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './Estimate.css';

function Estimate() {
    // States
        const [homeSize, setHomeSize] = useState('');
        const [pickupLocation, setPickupLocation] = useState('');
        const [dropoffLocation, setDropoffLocation] = useState('');
        const [movingDate, setMovingDate] = useState('');
        const [flexibleDate, setFlexibleDate] = useState('');
        const [residenceType, setResidenceType] = useState('');
        const [roomSize, setRoomSize] = useState('');
        const [fullName, setFullName] = useState('');
        const [email, setEmail] = useState('');
        const [phoneNumber, setPhoneNumber] = useState('');
        const [boxes, setBoxes] = useState('');
        const [specialtyItems, setSpecialtyItems] = useState('');
        const [majorItems, setMajorItems] = useState('');
        const [additionalInfo, setAdditionalInfo] = useState('');

        const [services, setServices] = useState({
            packing: false,
            storage: false,
            furnitureAssembly: false,
        });

    // Sends Email to Admins for Manual review
        const sendEstimateEmail = async (templateParams) => {
            try {
            const result = await emailjs.send(
                'HIDDEN',    
                'HIDDEN',    
                templateParams,
                'HIDDEN'      
            );
            console.log('Email successfully sent:', result.text);
            return true;
            } catch (error) {
            console.error('Failed to send email:', error);
            return false;
            }
        };

    // Handle Form Submission
        const handleEstimateSubmit = async () => {
            const templateParams = {
                name: fullName,
                email: email,
                phone: phoneNumber,
                pickup_location: pickupLocation,
                dropoff_location: dropoffLocation,
                moving_date: movingDate,
                flexible_date: flexibleDate,
                residence_type: residenceType,
                room_size: roomSize,
                boxes: boxes,
                specialty_items: specialtyItems,
                major_items: majorItems,
                additional_info: additionalInfo
            };
        
            try {
                // Add to Firestore
                    await addDoc(collection(db, 'estimates'), {
                        ...templateParams,
                        timestamp: new Date()
                    });
                    
                    console.log('Estimate added to Firestore');
        
                // Send Email
                    const success = await sendEstimateEmail(templateParams);

                    if (success) {
                        alert("Your estimate request has been sent successfully!");
                    } else {
                        alert("Failed to send your estimate. Please try again.");
                    }
        
            } catch (error) {
                console.error("Error submitting estimate:", error);
                alert("Something went wrong. Please try again.");
            }
        };   

    return (
        <div className="Estimate-container">
        <h1 className="Estimate-h1">Moving Cost Estimate</h1>

        <div className="Estimate-form">
            {/* Locations */}
            <label className='Estimate-label'>Pickup Location:</label>
            <input type="text" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} placeholder="Enter pickup address..." />

            <label className='Estimate-label'>Drop-off Location:</label>
            <input type="text" value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)} placeholder="Enter drop-off address..." />

            {/* Moving Date */}
            <label className='Estimate-label'>Preferred Moving Date:</label>
            <input type="date" value={movingDate} onChange={(e) => setMovingDate(e.target.value)} />

            <label className='Estimate-label'>Flexible Moving Dates?</label>
            <select value={flexibleDate} onChange={(e) => setFlexibleDate(e.target.value)}>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            {/* Residence Info */}
            <label className='Estimate-label'>Type of Residence:</label>
            <select value={residenceType} onChange={(e) => setResidenceType(e.target.value)}>
                <option value="">Select</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="house">House</option>
                <option value="senior-living">Senior Living Facility</option>
            </select>

            <label className='Estimate-label'>Number of Rooms / Square Footage:</label>
            <input type="text" value={roomSize} onChange={(e) => setRoomSize(e.target.value)} placeholder="e.g. 3 rooms / 1200 sq ft" />

            {/* Contact Info */}
            <label className='Estimate-label'>Full Name:</label>
            <input type="text" placeholder='John Smith' value={fullName} onChange={(e) => setFullName(e.target.value)} />

            <label className='Estimate-label'>Email:</label>
            <input type="email" placeholder='JohnSmith@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />

            <label className='Estimate-label'>Phone Number:</label>
            <input type="tel" placeholder='(000) 000-0000' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

            {/* Items & Services */}
            <label className='Estimate-label'>Estimated Number of Boxes:</label>
            <input type="number" placeholder='1 - 5 Boxes' value={boxes} onChange={(e) => setBoxes(e.target.value)} />

            <label className='Estimate-label'>Any large or specialty items?</label>
            <textarea className='Estimate-textarea' value={specialtyItems} onChange={(e) => setSpecialtyItems(e.target.value)} placeholder="Piano, antique furniture, medical equipment, etc." />

            <label className='Estimate-label'>Do you have a list of major items?</label>
            <textarea className='Estimate-textarea' value={majorItems} onChange={(e) => setMajorItems(e.target.value)} placeholder="Beds, couches, tables, dressers, etc." />

            <label className='Estimate-label'>Additional Information:</label>
            <textarea className='Estimate-textarea' value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} placeholder="Anything else we should know?" />

            {/* Calculate Estimate Button */}
            <button className="Estimate-button" onClick={handleEstimateSubmit}>Get Estimate</button>

        </div>
    </div>
    );
}

export default Estimate;
