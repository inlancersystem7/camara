import {I18nManager, Linking, Platform} from 'react-native';
import moment from 'moment';
import {DeviceHelper} from '../helper/DeviceHelper';
import {Country} from 'react-native-country-picker-modal';
import {check, PERMISSIONS, request} from 'react-native-permissions';

class Utils {
  get defaultCountry(): Country {
    return {
      cca2: 'IN',
      currency: ['INR'],
      callingCode: ['91'],
      region: 'Asia',
      subregion: 'Southern Asia',
      flag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAqZQTFRF53MA5HIC43ID53MB9XcA+3oA9ngA53QB83cA6XMCpV8oX0hPR0RkSUVlXkdPpF8o53EA428B9ncArmIkL0OAG02vZo3TfJ3agqLcZYzTJFSzLkJ/6X0R6X0S5XsS+IQOl2E+BDqjgJ7X5eny5enz5uv05er05OjyjancCD6llmE+/fXu+/Ps///zvMPUCDefqbre8fP32ODwyNPpwMzmwc3mxNDo1N3u8fL3v8znEj+kucHS/////v//NVuwf5bK9/n7vcrkma3WgZnMf5fLlKnUusjjzdfr+Pn7iZ/OOmCz/f7///7+/Pz9tcPgGUWh4efz2eDwvMrkf5nMXH2+aojDa4jEW3y9gJnMuMbi6u/3Jk+ms8Hf+/z9aofDXn2+9ff70Nrsm6/XXHy+jKPRxNDnxdHol6vVWXq8kqfTz9ns9vj7co3Ga4fD/P3+UHK5dZDI8fT5w8/ngpvNaIbDxM/nvMnku8jkcIzGfZfLws7m8/b6iaDQU3W6dI/H8vT6aIbCu8nkucfjydTpepXK9Pb6UnS67vL4ztfrmKzWWnu9kKbTmK3WW3u9kqjTy9Xq8PP5cY3GbIjD/v/+GEWh4ujz1t7ugZrNbInEfJbL7fH4JlCns8LgOVuxfpbKzNbqlqrUfpbLe5TKytTqj6XRPWCz/v7/8fju7vXt/v/zssXUCTigs8Hi8fT309zuxtHo0Nns7vL2wMznFECkr8LT///0QJkUQJoUPpcVSKIRKHVADDqki6DY4+ny4ujy4Oby4ejyl6ndEj+mJ3Q/LpAAL5AALI4BNZgAJHomD0iAJk6xd47Uip7bjqHceI7VLlW0LY4BM5IEM5MEMZEFNZcAMpMDIXUqDFZQDE9lDlBmDFVQMpIDNpgAOJsANpkAOZsAMZEGMpEFwJ5XlQAAAAFiS0dEPKdqYc8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAGtSURBVDjLY2AY1oCRiRGICCtjZmFlY2NlYcZQyo4CGDk4ubh5ePn4OTkYUWUYBJCBoJCwiKiYuISklLSwkCCKFIMMAsjKySsoKimrqKqpq2toasnLySJJMmgjgI6unr6BoZGxiamZuYWllbWuDpIkgw0c2NrY2tk7mDk6Obu4url7eHp5A4XggMEHDnxt/PwDAoOCQ0LDwiMi3aOiY2x8EbJIJsbaxMUnJCYlp6SmpWdkZmXn5AKFECYimHk2+QWFRcUlpWXlxhWVVdU1tUAhHArr6k0jGooam5orWkxaa9pwKIy1yY1v7+js6k4t6unt658wcRKK1ZPhINbGb8rUaeXTw0NndM1sMp81e45NLEIWJXhs5s5zmF+2YOGivsjFDkuWLkMJnuUIsGLlqtVr1q5bXxZUumHjps1btq5AkmTYhgDbd+zctXvP3n1T9x/Ye/DQ4Z07tiNJMhxBAkePHT9x8tTpM2fPnT954viFo8hyDBeRwKVLl69cvXb9xs1b125fuXzpErIcw21UcPn2nbv37t2/A2SgAnSFQKUPHj58cBlDGFMhDjAUFAIALMfjyKVz+egAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMTAtMDdUMTM6MTQ6MzQrMDI6MDDj9ijFAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTEwLTA3VDEzOjE0OjM0KzAyOjAwkquQeQAAAABJRU5ErkJggg==',
      name: 'India',
    };
  }
  get language(): string {
    return I18nManager.isRTL ? 'english' : 'arabic';
  }

  get device(): string {
    return DeviceHelper.ios() ? '2' : '1';
  }

  convertMinsToTime(mins: number): string {
    let hours = Math.floor(mins / 60);
    let minutes: number = mins % 60;
    // @ts-ignore
    minutes = minutes < 10 ? '0' + minutes : minutes;
    if (hours > 0) {
      return `${hours} hrs:${minutes} mins`;
    } else {
      return `${minutes} mins`;
    }
  }

  redirectToGoogleMap(branch_lat_long: string, address: string) {
    if (branch_lat_long) {
      let latLongArray = branch_lat_long.split(',');
      let lat = latLongArray[0];
      let lng = latLongArray[1];
      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const latLng = `${lat},${lng}`;
      const label = address;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });
      if (url) {
        Linking.openURL(url);
      }
    }
  }

  redirectToGoogleMapUsingLink(url: string) {
    if (url) {
      Linking.openURL(url);
    }
  }

  branchImageHeight() {
    return DeviceHelper.calculateHeightRatio(
      (DeviceHelper.width() * 147) / 277,
    );
  }

  checkAccess(): boolean {
    // if (!accountStore.isLogin()) {
    //   navigate({screenName: Route.Login, params: {skip: true}});
    //   return false;
    // }
    return true;
  }

  emailRegex(): RegExp {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  }

  phoneNoRegexNoSpace(): RegExp {
    return /^[0-9]{10,}$/;
  }

  vehicleNumberRegex(): RegExp {
    // return /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;
    return /^(?=.*[A-Za-z0-9-])[-A-Za-z0-9]{8,15}$/;
  }
  validateOnlyNumeric(): RegExp {
    // return /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;
    return /^(0|[1-9][0-9]*)$/;
  }
  validateOnlyUserName(): RegExp {
    return /^(?![0-9]*$)(?![!@#$%^&*(),.?":{}|<>])[\p{Script=Devanagari}|\p{Script=Gujarati}|\p{Script=Tamil}|\p{Script=Latin}|\p{Script=Gurmukhi} ]{3,100}$/gu;
  }
  validateOnlySellingPrice(): RegExp {
    return /^(?!0$|[1-9]$)[1-9][0-9]{4,6}$/;
  }
  validateOnlyHowDidYouSell(): RegExp {
    return /^(?![0-9]*$)(?![!@#$%^&*(),.?":{}|<>])[\p{Script=Devanagari}|\p{Script=Gujarati}|\p{Script=Tamil}|\p{Script=Latin}|\p{Script=Gurmukhi} ]{3,500}$/gu;
  }
  validateOnlyHP(): RegExp {
    return /^(?!0|0\.0*$|0*[1-9]\d*\.0*$|0*\.0*[1-9]\d*$)([1-9]|[1-9]\d|1\d\d|200)$/;
  }
  validateOnlyTotalHours(): RegExp {
    return /^(?!0|0\.0*$|0*[1-9]\d*\.0*$|0*\.0*[1-9]\d*$)([1-9]\d{0,4}|100000)$/;
  }

  utcToLocal(
    date: string,
    dateFormat: string = 'YYYY-MM-DD HH:mm:ss',
    requiredDateFormat: string = 'DD MMM, YYYY hh:mm a',
  ): string {
    const dateUtc = moment.utc(date).format(dateFormat);
    const stillUtc = moment.utc(dateUtc).toDate();
    return moment(stillUtc).local().format(requiredDateFormat);
  }

  dateAndTimeFormat(date: string): string {
    return moment(date).local().format('DD MMM, YYYY hh:mm a');
  }

  formatTimeSlot(data: string) {
    return moment(data, 'hh:mm A').format('hh:mm A');
  }

  // checkStatusApp() {
  //   if (BASEURL().indexOf('192') > -1) {
  //     return 'Local';
  //   } else if (BASEURL().indexOf('Staging') > -1) {
  //     return 'Staging';
  //   } else {
  //     return 'Live';
  //   }
  // }
  navigateAccordingToAccessibility() {
    // if (accountStore.isLogin()) {
    // } else {
    //   navigate({screenName: Route.Login});
    // }
  }

  generateRandom32BitInteger(): number {
    // Generate a random integer between -2^31 and 2^31 - 1
    return Math.floor(Math.random() * 4294967296) - 2147483648;
  }

  requestNotificationPermission = async () => {
    return await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  };

  checkNotificationPermission = async () => {
    return await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  };

  bytesToMB(bytes: number): number {
    return bytes / (1024 * 1024);
  }
}

export const utils = new Utils();
