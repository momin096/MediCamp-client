import { Helmet } from "react-helmet";
import Slider from "./Slider/Slider";
import PopularCamps from "./PopularCamps/PopularCamps";
import WhyChoose from "./WhyChoose/WhyChoose";
import HowItWorks from "./HowItWorks/HowItWorks";
import useAuth from "../../hooks/useAuth";

const Home = () => {
    const { user } = useAuth()
    console.log('user', user);
    return (

        <div >
            <Helmet>
                <title>Home | MediCamp</title>
            </Helmet>
            <Slider />
            <PopularCamps />
            <WhyChoose />
            <HowItWorks />
        </div>
    );
};

export default Home;