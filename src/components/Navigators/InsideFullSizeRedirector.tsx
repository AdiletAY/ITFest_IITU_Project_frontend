import { useNavigate } from 'react-router-dom';

const InsideFullSizeRedirector = ({ to = '' }) => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate(to);
  };
  return (
    <span
      style={{ cursor: 'inherit' }}
      className="w-full h-full top-0 left-0 absolute"
      onClick={redirect}
    />
  );
};

export default InsideFullSizeRedirector;
