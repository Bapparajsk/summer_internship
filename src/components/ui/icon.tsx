import { getCommonIcon, IconName } from '../lib/icon';

export type IconProps = {
    name: IconName;
    size?: number;
    color?: string 
}

export const Icon = ({ name, size = 18, color }: IconProps) => {
    const { Icon, name: iconName } = getCommonIcon(name);

    return <Icon name={iconName} size={size} color={color}/>
}