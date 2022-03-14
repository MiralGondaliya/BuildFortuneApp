import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../styles/colors';
import {ContainerStyles, FontSize, MarginStyle} from '../styles/globalStyles';

const BaseButton = ({title, icon, bigIcon, onChecked, isSelected}, flex) => {
  let isIconFromWeb = false;
  if (icon && icon !== '') {
    try {
      if (icon.startsWith('http')) {
        isIconFromWeb = true;
      }
    } catch (error) {
      isIconFromWeb = false;
    }
  }

  return (
    <View style={{minWidth: 148, flex: 1}}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          styles.buttonContainer,
          styles.buttonContainerOnlyBorder,
          ContainerStyles.containerCenterAlign,
          MarginStyle.mB8,
          {backgroundColor: isSelected ? COLORS.cornFlowerBlue : COLORS.white},
        ]}
        onPress={() => {
          onChecked(title);
        }}>
        {icon && (
          <Image
            source={isIconFromWeb ? {uri: icon} : icon}
            style={
              bigIcon
                ? isSelected
                  ? styles.bigIconSelected
                  : styles.bigIconUnSelected
                : styles.icon
            }
          />
        )}
        <Text
          style={[
            FontSize.fontMedium14,
            {
              color: isSelected ? COLORS.white : COLORS.primary,
              flex: icon ? 1 : 0,
            },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const SelectableButtons = ({
  options,
  bigIcon,
  onOptionSelected,
  isSelectable,
}) => {
  const [selectedOption, setSelectedOption] = useState('');
  return (
    <View style={{width: '100%'}}>
      {options.map((item, index) => (
        <BaseButton
          key={item.name}
          title={item.name}
          icon={item.icon}
          bigIcon={bigIcon}
          onChecked={title => {
            onOptionSelected(title);
            setSelectedOption(title);
          }}
          isSelected={isSelectable ? selectedOption === item.name : false}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 48,
    borderRadius: 8,
    borderWidth: 0,
    ...ContainerStyles.containerRow,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray_border,
    ...MarginStyle.mx8,
  },
  bigIconSelected: {
    width: 30,
    height: 30,
    ...MarginStyle.mx8,
    tintColor: COLORS.white,
  },
  bigIconUnSelected: {
    width: 30,
    height: 30,
    ...MarginStyle.mx8,
    tintColor: COLORS.primary,
  },
});

export default SelectableButtons;
