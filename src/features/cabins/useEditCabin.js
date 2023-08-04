import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
    const queryClient = useQueryClient();

    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
        onSuccess: () => {
          toast.success("Cabin Edited successfully");
          queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: () => {
          toast.error("Cabin failed to edit");
        },
      });

      return {isEditing, editCabin};
}

export default useEditCabin;