import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';


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

const commonIconMap: Record<string, IconInfo> = {
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
    }
}

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

export const getCommonIcon = (name: string) => {
    return commonIconMap[name] || {
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