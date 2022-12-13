import {widthPercentageToDP} from 'react-native-responsive-screen';

export const FONT_SIZE = widthPercentageToDP(3.75);

export const DEVICE_TZ_OFFSET = (new Date().getTimezoneOffset() / 60) * -1;
