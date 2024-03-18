import {Modal} from 'react-native';
import React from 'react';
import {Box} from '../Box';
import {Pressable} from "@/component";
import {Image} from '../Image';
import {Images} from "@/assets";
import {Text} from '../Text';
import {fonts} from "@/style";
import {Routes} from "@/navigation/AppNavigation";
import {StackNavigationProp} from '@react-navigation/stack';

export const refSideMenu = React.createRef<SideMenu>();

export const showSideMenu = (): void => {
  if (refSideMenu) {
    refSideMenu?.current?.showModal();
  }
};

export const hideSideMenu = (): void => {
  if (refSideMenu) {
    refSideMenu?.current?.hideModal();
  }
};

export interface SideMenuProps {
  navigation: StackNavigationProp<any, any>;
}

export class SideMenu extends React.Component<SideMenuProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isVisible: false,
      options: [
        {
          title: 'Dashboard',
          onPress: () => {
            this.hideModal();
            this.props.navigation.navigate(Routes.Dashboard);
          },
        },
        {
          title: 'Client',
          onPress: () => {
            this.hideModal();
            this.props.navigation.navigate(Routes.Client);
          },
        },
        {
          title: 'Camara',
          onPress: () => {
            this.hideModal();
            this.props.navigation.navigate(Routes.Camera);
          },
        },
        {
          title: 'Terms & condition',
          onPress: () => {
            this.hideModal();
            this.props.navigation.navigate(Routes.Home);
          },
        },
        {
          title: 'Take Backup',
          onPress: () => {
            this.hideModal();
            // this.props.navigation.navigate(Routes.GoogleDrive);
          },
        },
      ],
    };
  }

  showModal(): void {
    this.setState({
      isVisible: true,
    });
  }

  hideModal(): void {
    this.setState({
      isVisible: false,
    });
  }

  render() {
    const {isVisible, options} = this.state;
    return (
      <Modal
        animationType={'fade'}
        visible={isVisible}
        transparent={true}
        onRequestClose={() => {
          this.hideModal();
        }}>
        <Box flex={1} backgroundColor={'transparent'} flexDirection={'row'}>
          <Box
            flex={1.5}
            backgroundColor={"white"}>
            <Pressable
              onPress={() => {
                this.hideModal();
              }}
              height={30}
              width={40}
              justifyContent={"center"}
              alignItems={"center"}
              marginTop={"r"}
            >
              <Image
                source={Images.left_arrow}
                width={20}
                height={20}
                resizeMode={'cover'}
              />
            </Pressable>
            {options.map(option => {
              return (
                <Pressable
                  key={option.title}
                  onPress={option.onPress}
                  height={40}
                  paddingHorizontal={'r'}
                  width={'100%'}
                  justifyContent={'center'}>
                  <Text
                    fontFamily={fonts.regular}
                    color={'primary'}
                    fontSize={14}>
                    {option.title}
                  </Text>
                </Pressable>
              );
            })}
          </Box>
          <Pressable
            flex={1}
            onPress={() => {
              this.hideModal();
            }}
          />
        </Box>
      </Modal>
    );
  }
}
