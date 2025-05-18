import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();

    const {
        data: role,
        isLoading: roleLoading,
        error,
    } = useQuery({
        queryKey: ["role", user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/role/${user.email}`);
            console.log("Received role from backend:", data); // <-- Check if this shows
            return data?.role;
        },
    });

    // Debug logs
    console.log("useRole - authLoading:", authLoading);
    console.log("useRole - user:", user);
    console.log("useRole - roleLoading:", roleLoading);
    console.log("useRole - role:", role);
    if (error) console.error("useRole error:", error);

    return [role, roleLoading];
};

export default useRole;
