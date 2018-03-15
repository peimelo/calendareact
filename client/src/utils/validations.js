import moment from 'moment';

export const validations = {
  checkMaxLength: function (text, length) {
    if (text.length <= length) {
      return ''
    } else {
      return `length should be a maximum of ${length} characters`
    }
  },

  checkMinLength: function (text, length) {
    if (text.length >= length) {
      return ''
    } else {
      return `length should be at least ${length} characters`
    }
  },

  timeShouldBeInTheFuture: function (t) {
    if (moment(t).isValid() && moment(t).isAfter()) {
      return ''
    } else {
      return 'can\'t be in the past'
    }
  }
};
