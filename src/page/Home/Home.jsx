import { Helmet } from "react-helmet";
import Slider from "./Slider/Slider";

const Home = () => {
    return (
        <div className="pb-[2000px]">
            <Helmet>
                <title>Home | MediCamp</title>
            </Helmet>
            <Slider />  
        </div>
    );
};

export default Home;