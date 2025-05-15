import Lottie from "lottie-react";
import loading from '../../assets/loading.json'

const Loading = () => {
    return (
        <div className="max-w-32 lg:max-w-52 flex items-center justify-center h-screen mx-auto">
            <Lottie className="max-w-32 lg:max-w-52" animationData={loading} />
        </div>
    );
};

export default Loading;