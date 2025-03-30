// PrimaryButton component 

function PrimaryButton({ children, onClick, type = 'button'}) {
    return(
        <button
            type={type}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-200 shadow-md"
            onClick={onClick}
            >
            {children}
        </button>
    );
}

export default PrimaryButton;
// This component is a reusable button with a primary style.