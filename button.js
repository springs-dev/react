
import React from 'react';
import PropTypes from 'prop-types';

import './buttonStyles.css'

const defaultBtnStyles = ' salix-btn';

const Button = ({text, theme, onClick, onClickArgs}) => (
    <button disabled={disableStatus}
            style={inlineStyles ? inlineStyles : null}
            onClick={onClick ? (e) => onClick(...onClickArgs) : null}
            className={customClassNames ? customClassNames + defaultClassnames : defaultClassnames}>
        <span>{context.props.translate(title)}</span>
    </button>
);


Button.propTypes = {
    theme: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default Button;
