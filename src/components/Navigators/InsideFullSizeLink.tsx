import { Link } from 'react-router-dom';

const InsideFullSizeLink = ({ to = '/', blank = false }) => {
  return (
    <Link
      target={blank ? '_blank' : '_parent'}
      className="w-full h-full top-0 left-0 absolute"
      style={{ cursor: 'inherit' }}
      to={to}
    />
  );
};

export default InsideFullSizeLink;
