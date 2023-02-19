import { Auth, useAuth } from "@arcana/auth-react";

const onLogin = async () => {
    window.location.href = "http://localhost:3000/feed";
}

const Arcana = () => {
    const auth = useAuth();
    if(auth.isLoggedIn){
        window.location.href = "http://localhost:3000/feed";
    }
    return (
        <div className="VideoInput">
            <div>
            {auth.loading ? (
                "Loading"
            ) : auth.isLoggedIn ? (
                <p>Logged In</p>
            ) : (
                <div>
                    <Auth externalWallet={true} theme={"dark"} onLogin={onLogin} />
                </div>
            )}
            </div>
        </div>
    );
}

export default Arcana;
