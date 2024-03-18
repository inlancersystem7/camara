import React from 'react';
import { observer } from 'mobx-react-lite';
import { ScrollView } from 'react-native';
import { Box } from '../Box';
import { Text } from '../Text';
import { Pressable } from "@/component";
import { fonts } from '@/style/Fonts';
import { navigate, Routes } from '@/navigation/AppNavigation';
import { Image } from '../Image';
import { Images } from '@/assets';
import { DeviceHelper } from '@/helper/DeviceHelper';

export interface RenderDrawerProps {
	onMenuTap: () => void;
	onBackPress: () => void;
}
export const RenderDrawerContent: React.FC<RenderDrawerProps> = observer(
	({ onMenuTap, onBackPress }: RenderDrawerProps) => {
		const menu = [
			{
				label: 'Dashboard',
				// image: Images.dashboard,
				onPress: () => {
					onMenuTap();
				},
				isBorder: true,
			},
			{
				label: 'Inspection Agency',
				// image: Images.inspection,
				onPress: () => {
					onMenuTap();
					setTimeout(() => {
						navigate({ screenName: Routes.Home });
					}, 10);
				},
				isBorder: false,
			},
		];

		return (

			<Box overflow="hidden" height={DeviceHelper.height()}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Box paddingBottom="ell">
						<Box
							width="100%"
							marginTop="r"
							alignItems="center"
							flexDirection="row"
						>
							<Pressable
								flexDirection="row"
								onPress={onBackPress}
								// justifyContent={'center'}
								alignItems="center"
								height={DeviceHelper.calculateHeightRatio(40)}
								width={DeviceHelper.calculateWidthRatio(40)}
							>
								<Image
									source={Images.back_arrow}
									resizeMode="contain"
									height={DeviceHelper.calculateHeightRatio(20)}
									width={DeviceHelper.calculateWidthRatio(35)}
								/>
								<Text fontSize={15} color="black">
									Back
								</Text>
							</Pressable>
						</Box>
						<Text
							// textAlign="center"
							marginLeft={"r"}
							fontSize={18}
							paddingHorizontal="es"
							paddingVertical="es"
							fontFamily={fonts.medium}
							color="color_424242"
						>
							{`Hi`}
						</Text>
						<Box height={0.5} marginTop="sr" opacity={0.2} backgroundColor="color_424242" />
						<Box paddingTop="s">
							{menu.map((item) => (
								<Box key={item.label}>
									<Pressable
										key={item.label}
										marginVertical="s"
										marginHorizontal="sr"
										alignItems="center"
										flexDirection="row"
										onPress={item.onPress}
									>
										{/*<Image*/}
										{/*	source={item.image}*/}
										{/*	resizeMode="contain"*/}
										{/*	height={DeviceHelper.calculateHeightRatio(25)}*/}
										{/*	width={DeviceHelper.calculateWidthRatio(25)}*/}
										{/*/>*/}
										<Text
											marginVertical="s"
											marginHorizontal="s"
											fontFamily={fonts.regular}
											fontSize={18}
											color="color_424242"
										>
											{item.label}
										</Text>
									</Pressable>
									{
										item.isBorder && (
											<Box
												height={0.5}
												marginHorizontal="sr"
												opacity={0.2}
												backgroundColor="color_424242"
											/>
										)
									}
								</Box>
							))}
						</Box>
						<Box height={15} />
					</Box>
				</ScrollView>
			</Box>

		);
	},
);
