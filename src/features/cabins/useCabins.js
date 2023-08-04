import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabins() {
    const { isLoading, data: cabins, error } = useQuery({
        queryKey: ["cabins"], //What identifies each data and read by this name
        queryFn: getCabins,
    });

    return {isLoading, cabins, error};
}

export default useCabins;