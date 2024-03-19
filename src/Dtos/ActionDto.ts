import {ImageSourcePropType} from "react-native";

export interface ActionDto{
	label: string;
	image: ImageSourcePropType ;
	onPress: (index?:number) => void;
}
