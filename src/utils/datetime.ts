import {parse, format} from 'date-fns';

export const parseIsoString = (isoString: string) => {
  try {
    return parse(isoString, 'uuuu-MM-dd HH:mm:ss', new Date());
  } catch (error) {
    console.log('parseIsoString error:');
    console.log(error);
    throw error;
  }
};

export const formatToStandardDateTime = (date: Date) => {
  try {
    return format(date, 'uuuu-MM-dd HH:mm'); // TODO: add settings for preferred date format?
  } catch (error) {
    console.error('formatToStandardDateTime error:');
    console.error(error);
    console.error(date);
    return '';
  }
};

export const formatToStandardDateTimeWithSeconds = (date: Date) => {
  try {
    return format(date, 'uuuu-MM-dd HH:mm:ss'); // TODO: add settings for preferred date format?
  } catch (error) {
    console.error('formatToStandardDateTime error:');
    console.error(error);
    console.error(date);
    return '';
  }
};

export const formatToStandardDate = (date: Date) => {
  try {
    return format(date, 'uuuu-MM-dd'); // TODO: add settings for preferred date format?
  } catch (error) {
    console.error('formatToStandardDate error:');
    console.error(error);
    console.error(date);
    return '';
  }
};
