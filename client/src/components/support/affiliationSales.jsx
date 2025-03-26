import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AffiliateSales = () => {
    const [affiliateCode, setAffiliateCode] = useState('');
    const [commission, setCommission] = useState(0);
    const [qrCode, setQrCode] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAffiliateDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/affiliate/details', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setAffiliateCode(response.data.affiliateCode);
                setCommission(response.data.commissionEarned);
            } catch (err) {
                console.error(err.response?.data?.message || 'Error fetching affiliate details');
            }
        };

        fetchAffiliateDetails();
    }, []);

    const generateQrCode = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/affiliate/generate-qr', {
                headers: { Authorization: `Bearer ${token}` },
            });

            setQrCode(response.data.qrCode);
        } catch (err) {
            console.error(err.response?.data?.message || 'Error generating QR code');
        }
    };

    const registerAsAffiliate = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                '/api/affiliate/register',
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage(response.data.message);
            setAffiliateCode(response.data.affiliateCode);
        } catch (err) {
            console.error(err.response?.data?.message || 'Error registering as an affiliate');
        }
    };

    return (
        <div className="mt-40 lg:mt-32 max-w-4xl mx-auto p-6">
            <h1 className="text-3xl text-custom-orange font-bold mb-6">Affiliate Program</h1>

            {message && <p className="text-green-500">{message}</p>}

            {!affiliateCode ? (
                <button
                    onClick={registerAsAffiliate}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Register as an Affiliate
                </button>
            ) : (
                <div>
                    <p className="mb-4">
                        <strong>Your Affiliate Code:</strong> {affiliateCode}
                    </p>
                    <p className="mb-4">
                        <strong>Total Commission Earned:</strong> ${commission.toFixed(2)}
                    </p>
                    <button
                        onClick={generateQrCode}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Generate QR Code for Registration
                    </button>
                    {qrCode && (
                        <div className="mt-4">
                            <img src={qrCode} alt="Affiliate QR Code" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AffiliateSales;
