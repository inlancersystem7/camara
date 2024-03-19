import React from 'react';
import { FieldError, FieldErrorProps } from "@/component/FieldError";
import { Text, Box, Pressable } from "@/component";
import { Image } from "@/component/Image";
import { fonts } from "@/style";

export interface LogoImageProps extends FieldErrorProps {
	label:string;
	logoImage: [];
	openPlaceImagePicker: () => void;
}

export const ProfileImage: React.FC<LogoImageProps> = (props: LogoImageProps) => {
	const { label, logoImage, openPlaceImagePicker } = props;
	console.log("logoImg==>",logoImage);
	const fieldErrorProps = props as FieldErrorProps;
	return (
		<Box marginHorizontal="r" justifyContent="center" alignItems="center" borderRadius={10}>
			<Box borderWidth={2} justifyContent="center" alignItems="center" height={100} width={100} borderRadius={50} borderColor="black">
				<Box>
					{logoImage ? (
						<Image
							source={{ uri: `data:image/png;base64,${logoImage}` }}
							height={100}
							width={100}
							overflow={'hidden'}
							borderRadius={60}
						/>
					) : (
						<Box height={100} width={100} borderRadius={60} borderColor={"gray"}>
						</Box>
					)}
				</Box>

				<Pressable onPress={openPlaceImagePicker} backgroundColor="black" height={38} width={38} borderRadius={20} position="absolute" bottom={1} right={1} justifyContent="center" alignItems="center">
					<Text fontSize={24} color="white">+</Text>
				</Pressable>
			</Box>
			<Box flexDirection={"row"}>
				{/* <Text marginTop="s" color="red" fontSize={18} fontFamily={fonts.bold}>*</Text> */}
				<Text marginTop="s" color="black" fontSize={16} fontFamily={fonts.semiBold}>{label}</Text>
			</Box>
			<Box alignSelf="flex-end">
				<FieldError {...fieldErrorProps} />
			</Box>
		</Box>
	);
};
