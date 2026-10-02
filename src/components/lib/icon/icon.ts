import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome5  from '@expo/vector-icons/FontAwesome5';


type IconInfo = {
    Icon: any;
    name: string
}

type RecordValueType = {
    active: IconInfo,
    inactive: IconInfo
}


export const iconMap: Record<string, RecordValueType> = {

    overview: {
        active: {
            Icon: Ionicons,
            name: "planet"
        },
        inactive: {
            Icon: Ionicons,
            name: "planet-outline"
        }
    },

    explore: {
        active: {
            Icon: MaterialIcons,
            name: "explore"
        },
        inactive: {
            Icon: MaterialIcons,
            name: "explore"
        }
    },

    progress: {
        active: {
            Icon: Entypo,
            name: "bar-graph"
        },
        inactive: {
            Icon: Entypo,
            name: "bar-graph"
        }
    }
};

export function getBottomTabIcon(name: string) {
    return iconMap[name] || {
        active: {
            Icon: AntDesign,
            name: "exclamation"
        },
        inactive: {
            Icon: AntDesign,
            name: "exclamation"
        }
    };
}


const commonIconMap = {
    "dsa" : {
        Icon: Fontisto,
        name: "graphql"
    },
    "cpp" : {
        Icon: MaterialCommunityIcons,
        name: "language-cpp"
    },
    "java" : {
        Icon: MaterialCommunityIcons,
        name: "language-java"
    },
    "python" : {
        Icon: Fontisto,
        name: "python"
    },
    "os" : {
        Icon: FontAwesome6,
        name: "linux"
    },
    "dbms" : {
        Icon: Feather,
        name: "database"
    },
    "networks" : {
        Icon: Octicons,
        name: "git-branch"
    },
    "edit" :{
        Icon: Entypo,
        name: "edit"
    },
    "image" : {
        Icon: MaterialIcons,
        name: "add-photo-alternate"
    },
    "logout" : {
        Icon: AntDesign,
        name: "logout"
    },
    "new-card" : {
        Icon: MaterialIcons,
        name: "playlist-add"
    },
    "play-circle-outline" : {
        Icon: Feather,
        name: "play-circle"
    },
    "sensors" : {
        Icon: MaterialIcons,
        name: "sensors"
    },
    "hash" : {
        Icon: FontAwesome5,
        name: "slack-hash"
    },
    "check-all" : {
        Icon: MaterialCommunityIcons,
        name: "check-all"
    },
    "flame" : {
        Icon: Octicons,
        name: "flame"
    },
    "target" : {
        Icon: MaterialCommunityIcons,
        name: "target"
    }
}

export type IconName = keyof typeof commonIconMap;

export const getCommonIcon = (name: IconName) => {
    return commonIconMap[name] ?? {
        Icon: AntDesign,
        name: "exclamation"
    };
}

export {
    AntDesign,
    Ionicons,
    MaterialIcons,
    Entypo,
    Fontisto,
    MaterialCommunityIcons,
    FontAwesome6,
    Feather,
    Octicons
};