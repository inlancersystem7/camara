import React from "react"
import {Screen, StatusBarType} from "@/component/Screen";
import {Box} from "@/component";
import {CameraComponent} from "@/component/Camera/CameraComponent";

export const CameraScreen:React.FC = () =>{
    const s =''
    return(
        <Screen statusBarType={StatusBarType.Dark} backgroundColor={'white'}>
            <Box flex={1}>
                <CameraComponent />
            </Box>
        </Screen>
    )
}
