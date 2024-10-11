export function GlobalLayout({ children }) {
    return (
        <div className="global-layout">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <header>
            <h1>My Site</h1>
        </header>
    );
}

function Footer() {
    return (
        <footer>
            <p>Footer</p>
        </footer>
    );
}
