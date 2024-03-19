import React from 'react';
import { Modal } from 'react-native';
import { DeviceHelper } from '@/helper/DeviceHelper';
import { ActionDto } from "@/Dtos/ActionDto";
import { Pressable } from "@/component/Pressable";
import { Box } from "@/component/Box";
import { Text } from "@/component/Text";
import { fonts } from "@/style";
import { Image } from "@/component/Image";


export interface CustomModalProps {
	label: string;
	isVisible: boolean;
	options: ActionDto[];
	isDelete: boolean;
	onYesPress: () => void;
	onClose:() => void;
}

export const CustomModal: React.FC<CustomModalProps> = (
	{
		label,
		isVisible,
		onYesPress,
		options,
		isDelete,
		onClose },
) => (
	<Modal
		animationType="slide"
		// animationType="ZoomIn"
		transparent
		visible={isVisible}
		onRequestClose={onClose}
	>
		<Pressable
			onPress={onClose}
			flex={1}
			justifyContent="flex-end"
			alignItems="center"
			backgroundColor="blackRgb"
		>
			<Box
				borderTopRightRadius={12}
				borderTopLeftRadius={12}
				padding="r"
				minHeight={150}
				backgroundColor="white"
				width="100%"
			>
				{isDelete ? (
					<Box justifyContent="center" alignItems="center">
						<Text
							marginTop="s"
							color="color_424242"
							fontFamily={fonts.regular}
							fontSize={18}
						>
							{`Are you sure you want to delete \\"${label}\\" ?`}
						</Text>
						<Text
							marginTop="s"
							marginHorizontal="r"
							fontSize={13}
							fontFamily={fonts.regular}
							textAlign="center"
							color="color_424242"
						>
							This action can not be undone. Are you sure you want to delete this?
						</Text>
						<Box flexDirection="row" marginTop="m">
							<Pressable
								onPress={onYesPress}
								alignItems="center"
								justifyContent="center"
								backgroundColor="primary"
								width={86}
								height={38}
								borderRadius={8}
							>
								<Text
									fontFamily={fonts.regular}
									fontSize={14}
									color="white"
								>
									DELETE
								</Text>
							</Pressable>
							<Box width={30} />
							<Pressable
								onPress={onClose}
								alignItems="center"
								justifyContent="center"
								borderWidth={1}
								borderColor="primary"
								width={86}
								height={38}
								borderRadius={8}
							>
								<Text
									color="primary"
									fontSize={14}
									fontFamily={fonts.regular}
								>
									CANCEL
								</Text>
							</Pressable>
						</Box>
					</Box>
				) : (
					<Box>
						{options.map((option, index) => (
							<Pressable alignItems="center" flexDirection="row" key={index} onPress={() => { option.onPress(index); }}>
								<Image
									source={option.image}
									resizeMode="contain"
									height={DeviceHelper.calculateHeightRatio(25)}
									width={DeviceHelper.calculateWidthRatio(25)}
								/>
								<Text padding="sr" fontSize={16} fontFamily={fonts.regular} color="color_424242">
									{option.label}
								</Text>
							</Pressable>
						))}
					</Box>
				)}
			</Box>
		</Pressable>
	</Modal>
);
