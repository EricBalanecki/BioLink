import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './shareBrochure.css'

const SharePage = () => {
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');

    const handleRecipientChange = (e) => {
        setRecipient(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const sendEmail = () => {
        // Here you can implement the logic to send the email
        // You can use a backend service or an email service provider's API
        console.log(`Sending email to ${recipient}`);
        // Clear the form fields after sending the email
        setRecipient('');
        setMessage('');
    };

    return (
        <div className='share-container'>
            <h2>Share via Email</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="recipient">Recipient's Email:</label>
                    <input
                        type="email"
                        id="recipient"
                        value={recipient}
                        onChange={handleRecipientChange}
                        required
                    />
                </div>
                <Button sx={{px: 0}} onClick={sendEmail}>Send Email</Button>
            </form>
        </div>
    );
};

export default SharePage;