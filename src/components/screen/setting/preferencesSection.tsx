
import { View } from "react-native";
import { useState } from "react";
import { SettingRowWithSwitch } from "./settingRowWithSwitch";
import { Container } from "./container";
import { MaterialCommunityIcons, FontAwesome6 } from "@expo/vector-icons";


export function PreferencesSection() {
    const [haptics, setHaptics] = useState(true);
    const [sound, setSound] = useState(true);

    return (
        <Container title="Preferences">
            <SettingRowWithSwitch
                title="Haptic Feedback"
                description="Vibrations on taps and transitions"
                icon={<MaterialCommunityIcons name="vibrate" size={18} color="#8FA5B8" />}
                value={haptics}
                onValueChange={setHaptics}
            />

            <View className=" h-px bg-border" />
        
            <SettingRowWithSwitch
                title="Sound Effects"
                description="Audio cues for correct answers"
                icon={<FontAwesome6 name="volume-high" size={14} color="#8FA5B8" />}
                value={sound}
                onValueChange={setSound}
                
            />
        </Container>
    );
}
