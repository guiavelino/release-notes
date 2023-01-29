import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    text: {
      fontFamily: string;
    };

    colors: {
      backgroundColor?: string;
      textColor?: string;
      primaryColor: string;
      secondaryColor: string;
    };
  }
}
