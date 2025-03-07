import { useState } from 'react';
import './Estimate.css';

function Estimate() {
    // State for user inputs
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [homeSize, setHomeSize] = useState('');
    const [services, setServices] = useState({
        packing: false,
        storage: false,
        furnitureAssembly: false,
    });
    const [estimatedCost, setEstimatedCost] = useState(0);

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
                {/* Pickup & Drop-off Locations */}
                <label>Pickup Location:</label>
                <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Enter pickup address..."
                />

                <label>Drop-off Location:</label>
                <input
                    type="text"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    placeholder="Enter drop-off address..."
                />

                {/* Home Size Selection */}
                <label>Home Size:</label>
                <select value={homeSize} onChange={(e) => setHomeSize(e.target.value)}>
                    <option value="">Select Home Size</option>
                    <option value="studio">Studio</option>
                    <option value="1-bedroom">1 Bedroom</option>
                    <option value="2-bedroom">2 Bedroom</option>
                    <option value="3-bedroom">3 Bedroom</option>
                    <option value="4+ bedroom">4+ Bedroom</option>
                </select>

                {/* Additional Services */}
                <div className="Estimate-services">
                    <label>
                        <input
                            type="checkbox"
                            checked={services.packing}
                            onChange={() => setServices({ ...services, packing: !services.packing })}
                        />
                        Packing Services (+$100)
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={services.storage}
                            onChange={() => setServices({ ...services, storage: !services.storage })}
                        />
                        Storage Services (+$150)
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={services.furnitureAssembly}
                            onChange={() => setServices({ ...services, furnitureAssembly: !services.furnitureAssembly })}
                        />
                        Furniture Assembly (+$75)
                    </label>
                </div>

                {/* Calculate Estimate Button */}
                <button onClick={calculateEstimate} className="Estimate-button">
                    Get Estimate
                </button>

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
