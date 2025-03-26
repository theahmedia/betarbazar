import PropTypes from 'prop-types';

export function Button({ children, onClick, className = "", ...props }) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  
  Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
  };
  