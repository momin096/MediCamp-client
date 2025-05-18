import { Helmet } from "react-helmet";
import Slider from "./Slider/Slider";
import PopularCamps from "./PopularCamps/PopularCamps";
import WhyChoose from "./WhyChoose/WhyChoose";
import HowItWorks from "./HowItWorks/HowItWorks";

const Home = () => {
    return (
        <div className="pb-[2000px]">
            <Helmet>
                <title>Home | MediCamp</title>
            </Helmet>
            <Slider />
            <PopularCamps />
            <WhyChoose />
            
        </div>
    );
};

export default Home;