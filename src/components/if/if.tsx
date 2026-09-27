import { createContext, useContext } from "react";
import { View } from "react-native";

type IfContextType = {
    condition: boolean;
};

const IfContext = createContext<IfContextType>({
    condition: false,
});

type IfProps = {
    condition: boolean;
    children: React.ReactNode;
};

type ThenProps = {
    children: React.ReactNode;
};

type ElseProps = {
    children: React.ReactNode;
};

function If({ condition, children }: IfProps) {
    return (
        <IfContext.Provider value={{ condition }}>
            <View>{children}</View>
        </IfContext.Provider>
    );
}

function Then({ children }: ThenProps) {
    const { condition } = useContext(IfContext);

    if (!condition) return null;

    return <>{children}</>;
}

function Else({ children }: ElseProps) {
    const { condition } = useContext(IfContext);

    if (condition) return null;

    return <>{children}</>;
}

If.Then = Then;
If.Else = Else;

export default If;