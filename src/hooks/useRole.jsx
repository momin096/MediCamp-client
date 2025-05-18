import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();

    const {
        data: role,
        isLoading: roleLoading,
    } = useQuery({
        queryKey: ["role", user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/role/${user.email}`);
            return data?.role;
        },
    });


    return [role, roleLoading];
};

export default useRole;
