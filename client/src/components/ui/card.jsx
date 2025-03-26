import PropTypes from 'prop-types';

export function Card({ children }) {
    return <div className="bg-white shadow-md rounded-lg p-4">{children}</div>;
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
};

export function CardContent({ children }) {
    return <div className="p-4">{children}</div>;
}

CardContent.propTypes = {
    children: PropTypes.node.isRequired,
};
  