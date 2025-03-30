// header component
import React from 'react';
import Logo from './Logo';

function Header() {
    return (
        <header
            style={
                {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "1rem",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderBottom: "2px solid #e67e22",
                    marginBottom: "1rem",
                }}
        >
            <Logo size={60} />
            <h1 style={{ marginLeft: "1rem", fontSize: "2rem", color: "#d35400" }}>
                Quizz de Geographie
            </h1>
        </header>
    );
}

export default Header; // This component is a header that contains a logo and a title.