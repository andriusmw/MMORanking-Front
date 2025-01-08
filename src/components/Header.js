import { Auth } from "./Auth";

export const Header = () => {
    return (
        <header>
            <h1>Speed Run Dungeons</h1>
            <nav>
                <Auth />
            </nav>
        </header>
    );
};