// header component
import React from 'react';
import { Link } from 'react-router-dom';
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
                    backgroundColor: "transparent",
                    marginBottom: "1rem",
                    width: "100%",
                }}
        >
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                <Logo size={60} />
            </Link>
            <h1 style={{ marginLeft: "1rem", fontSize: "2rem", color: "var(--primary-hover)" }}>
                Quizz de Geographie
            </h1>
        </header>
    );
}

export default Header; // This component is a header that contains a logo and a title.