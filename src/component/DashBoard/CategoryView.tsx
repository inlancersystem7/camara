import React, { useEffect, useMemo, useState } from "react";
import {observer} from 'mobx-react-lite';
import {Box} from '../Box';
import {Text} from '../Text';
import {Pressable} from "@/component";
import {DeviceHelper} from "@/helper/DeviceHelper";
import {fonts} from "@/style";
import { Category } from "@/Model/Category";

export interface CategoryViewProps {
  categoryListItems: Category[];
  onCategorySelected: (category: Category) => void;
  isFilterVendor: boolean;
}

export const CategoryView: React.FC<CategoryViewProps> =
  ({categoryListItems, onCategorySelected, isFilterVendor}: CategoryViewProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState<Category | null>(null);

    return (
      <Box marginHorizontal={'ss'} flexDirection={'row'}>
        {categoryListItems.map((item, index) => {
          return(
            <Pressable
              onPress={() => {
                onCategorySelected(item);
                setSelectedItem(item);
                setSelectedIndex(index);
              }}
              height={DeviceHelper.calculateHeightRatio(40)}
              minWidth={DeviceHelper.calculateWidthRatio(133)}
              marginEnd={'es'}>
              <Text
                textAlign={'center'}
                fontSize={16}
                fontFamily={fonts.semiBold}
                color={index === selectedIndex ? 'black' : 'gray'}>
                {item.name}
                {/*{item.userName.charAt(0).toUpperCase() + item.userName.slice(1)}*/}
              </Text>
              <Box height={1} marginTop={"es"} backgroundColor={index === selectedIndex ? 'black' : 'white'}/>
            </Pressable>
          )
        })}
      </Box>
    );
  };
