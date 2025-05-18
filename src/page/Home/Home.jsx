import { Helmet } from "react-helmet";
import Slider from "./Slider/Slider";
import PopularCamps from "./PopularCamps/PopularCamps";

const Home = () => {
    return (
        <div className="pb-[2000px]">
            <Helmet>
                <title>Home | MediCamp</title>
            </Helmet>
            <Slider />
            <PopularCamps />
        </div>
    );
};

export default Home;