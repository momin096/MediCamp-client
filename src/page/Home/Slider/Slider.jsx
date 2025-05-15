import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import Slide1 from '../../../assets/Slide1.json';
import Slide2 from '../../../assets/Slide2.json';
import Slide3 from '../../../assets/Slide3.json';

const Slider = () => {
    return (
        <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper h-screen"
        >
            {/* Slide 1 */}
            <SwiperSlide>
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 py-10 h-screen bg-gradient-to-r from-[#d0f4de] via-[#fef9ef] to-[#f6d6ad]">
                    <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
                        <h2 className="text-4xl font-bold text-[#2e7d32]">Reaching the Unreachable</h2>
                        <p className="text-lg text-gray-800">
                            Our mobile medical camps brought healthcare to remote villages, impacting over 1,200 lives in just one week.
                        </p>
                        <Link to="/camps" className="inline-block bg-[#2e7d32] text-white px-6 py-3 rounded-xl hover:bg-[#1b5e20] transition">
                            View Camp Stories
                        </Link>
                    </div>
                    <div className="lg:w-1/2 flex justify-center">
                        <Lottie animationData={Slide1} className="w-[90%] h-[90%]" />
                    </div>
                </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
                <div className="flex flex-col-reverse lg:flex-row-reverse items-center justify-between px-6 lg:px-20 py-10 h-screen bg-gradient-to-r from-[#e3f2fd] via-[#ffffff] to-[#fce4ec]">
                    <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
                        <h2 className="text-4xl font-bold text-[#1565c0]">Smiles Restored</h2>
                        <p className="text-lg text-gray-800">
                            Children received dental care for the first time in their lives, thanks to our dedicated volunteer dentists.
                        </p>
                        <Link to="/impact" className="inline-block bg-[#1565c0] text-white px-6 py-3 rounded-xl hover:bg-[#0d47a1] transition">
                            Explore Impact
                        </Link>
                    </div>
                    <div className="lg:w-1/2 flex justify-center">
                        <Lottie animationData={Slide2} className="w-[90%] h-[90%]" />
                    </div>
                </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 py-10 h-screen bg-gradient-to-r from-[#fff3e0] via-[#ffffff] to-[#e0f7fa]">
                    <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
                        <h2 className="text-4xl font-bold text-[#f57c00]">A Community United</h2>
                        <p className="text-lg text-gray-800">
                            Volunteers, donors, and doctors came together to create lasting change through coordinated medical efforts.
                        </p>
                        <Link to="/volunteers" className="inline-block bg-[#f57c00] text-white px-6 py-3 rounded-xl hover:bg-[#e65100] transition">
                            Meet Our Heroes
                        </Link>
                    </div>
                    <div className="lg:w-1/2 flex justify-center">
                        <Lottie animationData={Slide3} className="w-[90%] h-[90%]" />
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Slider;
