import React from 'react';

/**
 * Forbidden component - displays a message notifiying user that they can't access the requested page
 */
const Forbidden = () => (
    <div className="wrap">
        <h2> Forbidden </h2>
        <p> Sorry. You do not have authorization to access this page!</p>
    </div>
);

export default Forbidden;