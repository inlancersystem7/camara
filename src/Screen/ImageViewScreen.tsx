import React from "react";
import { observer } from "mobx-react-lite";
import ImageViewer from "react-native-image-zoom-viewer";
import { RouteProp, useRoute } from "@react-navigation/native";
import { DeviceHelper } from "../helper/DeviceHelper";
import { Images } from "@/assets";
import { goBack, stackParamList } from "@/navigation/AppNavigation";
import { Screen, StatusBarType } from "@/component/Screen";
import { Box, Pressable } from "@/component";
import { Image } from "@/component/Image";
import { useSelector } from "react-redux";

export const ImageViewScreen: React.FC = observer(() => {
	const route = useRoute<RouteProp<stackParamList, 'TractorImageScreen'>>();
	const index = route?.params?.index ?? 0;
	const photoList = useSelector((state: any) => state.photosReducers.photosList);
	const bannerList = photoList as Array<{ value : string }>;

	const images: { url: string }[] | undefined = [];
	bannerList?.map((value) => {
		images.push({ url: `data:image/jpeg;base64,${value.value}` });
	});

	const handelOnBackPress = () => {
		goBack();
	};

	return (
		<Screen statusBarType={StatusBarType.Dark} backgroundColor="white4">
			<Box
				width={DeviceHelper.width()}
				justifyContent="center"
				flex={1}
				overflow="hidden"
			>
				<ImageViewer
					style={{
						width: '100%',
						height: '100%',
					}}
					imageUrls={images}
					index={index}
				/>
			</Box>

			<Pressable
				onPress={handelOnBackPress}
				height={40}
				marginStart="m"
				marginTop="m"
				justifyContent="center"
				width={40}
				right={16}
				top={4}
				position="absolute"
			>
				<Image source={Images.x} width={20} height={20} />
			</Pressable>
		</Screen>
	);
});
