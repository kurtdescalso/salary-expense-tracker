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

export const formatToStandardDate = (date: Date) => {
  try {
    return format(date, 'uuuu-MM-dd HH:mm'); // TODO: add settings for preferred date format?
  } catch (error) {
    console.log('formatToStandardDate error:');
    console.log(error);
    return '';
  }
};
