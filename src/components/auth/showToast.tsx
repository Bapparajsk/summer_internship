import { useToast } from "heroui-native";
import { ToastContainer, type ToastProps } from "../ui/toastContainer";

export const ShowToast = (props: ToastProps) => {

    const { toast } = useToast();

    toast.show({
        component(toastProps) {
            return (
                <ToastContainer
                    {...props}
                    {...toastProps}
                    isError={props.variant === "danger"}
                />
            );
        },
    });
};