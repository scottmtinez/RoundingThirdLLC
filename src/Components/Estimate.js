import { useState } from 'react';
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
        const [estimatedCost, setEstimatedCost] = useState(0);
        const [packingServices, setPackingServices] = useState(false); // if you add a checkbox
        const [hasElevator, setHasElevator] = useState('');
        const [urgency, setUrgency] = useState('');

        const [services, setServices] = useState({
            packing: false,
            storage: false,
            furnitureAssembly: false,
        });

    // Pricing Constants
        const basePrices = {
            studio: 200,
            "1-bedroom": 300,
            "2-bedroom": 500,
            "3-bedroom": 700,
            "4+ bedroom": 1000,
        };
        const servicePrices = {
            packing: 100,
            storage: 150,
            furnitureAssembly: 75,
        };

    // Function to calculate estimate
        const calculateEstimate = () => {
            if (!homeSize) {
                alert("Please select a home size.");
                return;
            }

            let cost = basePrices[homeSize];

            // Add additional services cost
                Object.keys(services).forEach(service => {
                    if (services[service]) {
                        cost += servicePrices[service];
                    }
                });

                setEstimatedCost(cost);
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
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />

            <label className='Estimate-label'>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label className='Estimate-label'>Phone Number:</label>
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

            {/* Items & Services */}
            <label className='Estimate-label'>Estimated Number of Boxes:</label>
            <input type="number" value={boxes} onChange={(e) => setBoxes(e.target.value)} />

            <label className='Estimate-label'>Any large or specialty items?</label>
            <textarea className='Estimate-textarea' value={specialtyItems} onChange={(e) => setSpecialtyItems(e.target.value)} placeholder="Piano, antique furniture, medical equipment, etc." />

            <label className='Estimate-label'>Do you have a list of major items?</label>
            <textarea className='Estimate-textarea' value={majorItems} onChange={(e) => setMajorItems(e.target.value)} placeholder="Beds, couches, tables, dressers, etc." />

            <label className='Estimate-label'>Additional Information:</label>
            <textarea className='Estimate-textarea' value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} placeholder="Anything else we should know?" />

            {/* Calculate Estimate Button */}
            <button onClick={calculateEstimate} className="Estimate-button">Get Estimate</button>

            {/* Display Estimated Cost */}
            {estimatedCost > 0 && (
                <div className="Estimate-result">
                    <h2>Estimated Cost: ${estimatedCost}</h2>
                </div>
            )}
        </div>
    </div>
    );
}

export default Estimate;
