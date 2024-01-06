import * as React from 'react';
import {View, StyleProp, ViewStyle, Keyboard} from 'react-native';
import {Text, Menu, Button, List} from 'react-native-paper';
import {Controller} from 'react-hook-form';
import {ISelectOption} from '../../constants';
import styles from './FormSelectFieldStyles';

interface IFormSelectField {
  label: string;
  name: string;
  control: any;
  value?: string | number;
  rules: any;
  options: ISelectOption[];
  style?: StyleProp<ViewStyle>;
}

const FormSelectField = (props: IFormSelectField) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedOptionLabel, setSelectedOptionLabel] = React.useState(() => {
    let initialAnchorLabel = '-Select-';
    if (props.value) {
      const previouslySetOption = props.options.find(option => {
        return option.value === props.value;
      });
      if (previouslySetOption) {
        initialAnchorLabel = previouslySetOption.label;
      }
    }
    return initialAnchorLabel;
  });

  const openMenu = () => {
    Keyboard.dismiss();
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  React.useEffect(() => {
    if (!props.value) {
      setSelectedOptionLabel('-Select-');
    }
  }, [props.value]);

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
                <Button
                  mode="outlined"
                  icon="menu-down"
                  onPress={openMenu}
                  contentStyle={styles.anchorButton}>
                  {selectedOptionLabel}
                </Button>
              }>
              {props.options.map((option, index) => {
                return (
                  <List.Item
                    key={`select-option-${props.name}-${option.value}-${index}`}
                    title={option.label}
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
      />
    </View>
  );
};

export default FormSelectField;
