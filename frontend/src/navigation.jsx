import { Link } from 'react-router-dom';
import './navigation.css'; // Import CSS file for custom styles

const Navigation = () => {
  return (
    <div className='nav'>
      <h2>Navigation</h2>
      {/* Apply custom styles to the ul element */}
      <ul className='nav-links'>
        <li>
          <Link to="/qrgenerator">QR Generator</Link>
        </li>
        <li>
          <Link to="/qrvalidator">QR Validator</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
