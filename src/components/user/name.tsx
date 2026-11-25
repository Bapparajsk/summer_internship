import { useUser } from '@clerk/expo';
import { cn, Skeleton } from 'heroui-native';
import { Text } from 'react-native';
import { FC } from "react";

export type UserNameProps = {
    isHeader?: boolean
    classname?: string;
    skeletonClassName?: string;
}

export const UserName: FC<UserNameProps> = ({ isHeader = true ,classname, skeletonClassName }) => {
    const { user, isLoaded } = useUser();

    return (
        <Skeleton isLoading={!isLoaded} className={cn('h-full rounded-2xl w-auto', skeletonClassName)} variant='pulse'>
            <Text numberOfLines={1} className={cn("text-text-primary tracking-wide font-poppins-semibold", classname)}>
                {isHeader && "Hello, "}{user?.fullName ?? "User"}
            </Text>
        </Skeleton>

    )
}