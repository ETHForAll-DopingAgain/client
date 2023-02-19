import { Auth, useAuth } from "@arcana/auth-react";

const onLogin = async () => {
    window.location.href = "http://localhost:3000/feed";
}

const Arcana = () => {
    const auth = useAuth();
    return (
        <div>
            {auth.loading ? (
                "Loading"
            ) : auth.isLoggedIn ? (
                <p>Logged In</p>
            ) : (
                <div>
                    <Auth externalWallet={true} theme={"light"} onLogin={onLogin} />
                </div>
            )}
        </div>
    );
}

export default Arcana;