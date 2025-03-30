// Logo.png
import logo from '../../assets/Logo.png';

function Logo({ size  = 60 }) {
return (
    <img 
        src={logo} // Logo.png
        alt="Logo du Quizz"
        style={{
            width:  `${size}px`,
            height: 'auto',
        }}
        />
    );
}   

export default Logo; 
// This component is a reusable logo image component that takes a size prop to set the width of the logo. The height is set to auto to maintain the aspect ratio.