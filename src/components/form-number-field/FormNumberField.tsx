import * as React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Controller} from 'react-hook-form';
import styles from './FormNumberFieldStyles';

interface IFormNumberField {
  label: string;
  name: string;
  control: any;
  rules: any;
  style?: StyleProp<ViewStyle>;
}

const FormNumberField = (props: IFormNumberField) => {
  return (
    <View style={[styles.inputContainer, props.style]}>
      <Controller
        control={props.control}
        rules={{
          ...props.rules,
          maxLength: 2,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label={props.label}
            mode="flat"
            value={String(value)}
            onBlur={onBlur}
            onChangeText={onChange}
            keyboardType="number-pad"
          />
        )}
        name={props.name}
      />
    </View>
  );
};

export default FormNumberField;
