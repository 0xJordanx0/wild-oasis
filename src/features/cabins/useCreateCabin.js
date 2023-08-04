import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin(){
    const queryClient = useQueryClient();
    const { mutate: createCabin, isLoading: isCreating } = useMutation({
      mutationFn: createEditCabin,
      onSuccess: () => {
        toast.success("Cabin created successfully");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
      },
      onError: () => {
        toast.error("Cabin failed to create");
      },
    });

    return {isCreating, createCabin};
}

export default useCreateCabin;