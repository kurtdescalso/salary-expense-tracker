import * as React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import FormCharFieldStyles from '../styles/FormCharFieldStyles';
import {Controller} from 'react-hook-form';
import {StyleSheet} from 'react-native';

const styles = FormCharFieldStyles;

interface IFormCharField {
  label: string;
  name: string;
  control: any;
  rules: any;
  style?: StyleSheet<ViewStyle>;
}

const FormCharField = (props: IFormCharField) => {
  return (
    <View style={[styles.inputContainer, props.style]}>
      <Controller
        control={props.control}
        rules={props.rules}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label={props.label}
            mode="flat"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
        name={props.name}
      />
    </View>
  );
};

export default FormCharField;
