import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSetting() {
    const queryClient = useQueryClient();

    const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
          toast.success("Settings updated successfully");
          queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: () => {
          toast.error("Cabin failed to edit");
        },
      });

      return {isUpdating, updateSettings};
}

export default useUpdateSetting;