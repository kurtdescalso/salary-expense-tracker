import * as React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import {Text, Menu, Button, List} from 'react-native-paper';
import {Controller} from 'react-hook-form';
import {ISelectOption} from '../constants';
import FormNumberFieldStyles from '../styles/FormSelectFieldStyles';

const styles = FormNumberFieldStyles;

interface IFormSelectField {
  label: string;
  name: string;
  control: any;
  rules: any;
  options: ISelectOption[];
  style?: StyleProp<ViewStyle>;
}

const FormSelectField = (props: IFormSelectField) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedOptionLabel, setSelectedOptionLabel] =
    React.useState('-Select-');

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <View style={[styles.inputContainer, props.style]}>
      <Controller
        control={props.control}
        name={props.name}
        rules={{
          ...props.rules,
          maxLength: 2,
        }}
        render={({field: {onChange}}) => (
          <>
            <Text>{props.label}</Text>
            <Menu
              visible={isMenuOpen}
              onDismiss={closeMenu}
              style={styles.menu}
              anchor={
                <Button mode="outlined" onPress={openMenu}>
                  {selectedOptionLabel}
                </Button>
              }>
              {props.options.map((option, index) => {
                return (
                  <List.Item
                    key={`select-option-${props.name}-${option.value}-${index}`}
                    title={option.label}
                    style={styles.optionListItem}
                    onPress={() => {
                      onChange(option.value);
                      setSelectedOptionLabel(option.label);
                      closeMenu();
                    }}
                  />
                );
              })}
            </Menu>
          </>
        )}
        name={props.name}
      />
    </View>
  );
};

export default FormSelectField;
