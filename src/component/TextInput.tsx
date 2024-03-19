import React from 'react';
import { observer } from 'mobx-react-lite';
import { fonts } from '@/style/Fonts';
import { FieldErrorProps } from "@/component/FieldError";
import { Input, InputProps } from "@/component/Input";
import { Box } from "@/component/Box";
import { Text } from "@/component/Text";

export interface TextInputProps extends InputProps, FieldErrorProps{
  textLabel?: string;
  isMultiple?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
}

export const TextInput: React.FC<TextInputProps> = observer(
  // eslint-disable-next-line max-len
  (props: TextInputProps) => {
    const inputProps = props as InputProps;
    const { isRequired, isMultiple, textLabel, disabled } = props as TextInputProps;

    return (
      <Box opacity={disabled ? 0.5 : 1} marginHorizontal="r">
        <Box marginTop="s" flexDirection="row">
          <Text
            color="black"
            marginStart="ss"
            fontFamily={fonts.regular}
            fontSize={14}
          >
            {textLabel}
          </Text>
          {isRequired && (
            <Text marginStart="ss" color="red" fontSize={12}>
              *
            </Text>
          )}
        </Box>
        <Box marginTop="s">
          <Input {...inputProps} />
        </Box>
      </Box>
    );
  },
);
