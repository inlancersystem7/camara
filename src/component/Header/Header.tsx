import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../Box';
import {DeviceHelper} from "@/helper/DeviceHelper";
import {Pressable} from "@/component";
import {Image} from '../Image';
import {Images} from "@/assets";
import {Text} from '../Text';
import {fonts} from "@/style";

export interface HomeHeaderProps {
	onBackPress?: () => void;
	onMenuPress?: () => void;
	isMenu?: boolean;
	label?: string;
	rightComponent?: React.ReactNode;
}

export const HEADER_HEIGHT = DeviceHelper.calculateHeightRatio(70);

export const Header: React.FC<HomeHeaderProps> = observer(
	({
		 onBackPress,
		 onMenuPress,
		 isMenu,
		 label,
		 rightComponent,
	 }: HomeHeaderProps) => {
		return (
			<Box
				flexDirection={'row'}
				backgroundColor={'white'}
				justifyContent={'center'}
				width={DeviceHelper.width()}
				height={HEADER_HEIGHT}>
				<Box flexDirection={'row'} flex={1}>
					{isMenu ? (
						<Box
							marginStart={'r'}
							// flex={0.3}
							justifyContent={'center'}
							marginTop={'sr'}>
							<Pressable
								onPress={onMenuPress}
								height={DeviceHelper.calculateHeightRatio(40)}
								width={DeviceHelper.calculateWidthRatio(40)}>
								<Image
									source={Images.menu}
									resizeMode={'stretch'}
									height={DeviceHelper.calculateHeightRatio(25)}
									width={DeviceHelper.calculateWidthRatio(25)}
								/>
							</Pressable>
						</Box>
					) : (
						<Box
							marginStart={"r"}
							justifyContent={'center'}
							marginTop={'sr'}>
							<Pressable
								onPress={onBackPress}
								// alignItems={'center'}
								height={DeviceHelper.calculateHeightRatio(40)}
								width={DeviceHelper.calculateWidthRatio(40)}>
								<Image
									source={Images.left_arrow}
									height={DeviceHelper.calculateHeightRatio(25)}
									width={DeviceHelper.calculateWidthRatio(30)}
								/>
							</Pressable>
						</Box>
					)}
					<Box
						flex={1}
						// marginHorizontal={'s'}
						justifyContent={'center'}
						// alignItems={'center'}
					>
						<Text
							fontSize={18}
							// textAlign={'center'}
							fontFamily={fonts.bold}
							color={'black'}>
							{label}
						</Text>
					</Box>
				</Box>
				<Box flex={0.3} justifyContent={'center'}>
					{rightComponent && rightComponent}
				</Box>
			</Box>
		);
	},
);
