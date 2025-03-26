import PropTypes from 'prop-types';

export function Input({ type = "text", name, value = '', onChange, ...props }) {
  return (
    <input
      type={type}
      name={name}
      value={value} // Default to an empty string if `value` is undefined
      onChange={onChange}
      className="border rounded p-2 w-full"
      {...props}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string, // Optional (if you decide to make it optional)
  onChange: PropTypes.func.isRequired,
};