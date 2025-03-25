import React, { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import CryptoJS from 'crypto-js';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ShareComponentMulti = ({ onClose, selectedItems }) => {
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext);
    

    const handleRecipientChange = (e) => setRecipient(e.target.value);

    const hashEmail = (email) => CryptoJS.SHA256(email).toString(CryptoJS.enc.Hex);

    const sendEmail = async () => {
        if (!recipient || selectedItems.length === 0) {
            setMessage("❌ Recipient email and at least one PDF must be provided.");
            return;
        }

        setLoading(true);

        try {
            console.log("🚀 Sending email with:", { to: recipient, items: selectedItems });

            const response = await fetch('/common/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: recipient,
                    subject: 'PDF Documents from Sino',
                    items: selectedItems,
                    sender: user.email
                }),
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const result = await response.json();
            console.log('✅ Email sent successfully:', result);

            setMessage("✅ Email sent successfully!");
            setTimeout(() => onClose(), 2000); // Auto-close after 2s
        } catch (error) {
            console.error("❌ Error sending email:", error);
            setMessage("❌ Failed to send email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    textAlign: 'center',
                }}
            >
                <h2>Share Selected PDFs</h2>
                <input
                    type="email"
                    placeholder="Recipient's Email"
                    value={recipient}
                    onChange={handleRecipientChange}
                    required
                    disabled={loading}
                    style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
                />
                <div>
                    <h3>Selected PDFs:</h3>
                    <ul style={{ textAlign: 'left' }}>
                        {selectedItems.map((item, index) => (
                            <li key={index}>
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                {message && <p>{message}</p>}
                <Button variant="contained" color="primary" onClick={sendEmail} disabled={loading}>
                    {loading ? "Sending..." : "Send Email"}
                </Button>
                <Button sx={{ mt: 2 }} onClick={onClose} color="secondary">Close</Button>
            </Box>
        </Modal>
    );
};

export default ShareComponentMulti;
