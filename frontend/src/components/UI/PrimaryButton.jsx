// PrimaryButton component
import "../../styles/ui-kit.css"; // Importing the CSS file for styling

function PrimaryButton({ children, onClick, type = 'button'}) {
    return(
        <button
            type={type}
            onClick={onClick}
            className="ui-button"
            >
            {children}
        </button>
    );
}

export default PrimaryButton;
// This component is a reusable button with a primary style.