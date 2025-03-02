import React from 'react';
import PropTypes from 'prop-types';
import './progressbar.css'; // Import the CSS file

const ProgressBar = ({ progress }) => {
    return (
        <div className="progress-bar">
            <div
                className="progress-bar__fill"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
};

export default ProgressBar;