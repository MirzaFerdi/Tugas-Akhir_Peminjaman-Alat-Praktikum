import PropTypes from "prop-types";

const Container = ({ children }) => {
  return <div className="px-3">{children}</div>;
};

Container.propTypes = {
  children: PropTypes.any,
};

export default Container;
