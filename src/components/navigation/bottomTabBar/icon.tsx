import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';


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

export default function getIcon(name: string) {
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

// export const EventIcons = {
//     class: 'school',
//     study: 'menu-book',
//     assignment: 'assignment',
//     exam: 'fact-check',
//     event: 'celebration',
// } as const;