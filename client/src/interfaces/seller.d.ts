import { BaseKey } from '@pankod/refine-core';

export interface SellerCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    avatar: string,
    noOfPosts: number
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string
}
