import { ThemeProvider } from "styled-components";

const colorDefs = {
  textPrimary: "#373D59",
  textSecondary: "#56584B",
  grey: "#C8CCDD",
  greyDark: "#A0AEC0",
  bcPurple: "#9B7EFA",
  bcPurpleLight: "#7E5AE1",
  bcWhite: "#FFFFFF",
  bcMain: "#F5F5F5",
};

const theme = {
  bodyFontFamily: `'Noto Serif', sans-serif`,
  smallDown: "max-width: 727px",
  mediumDown: "max-width: 1049px",
  mediumUp: "min-width: 728px",
  largeUp: "min-width: 1050px",
  ...colorDefs,
};

type themeProps = React.PropsWithChildren<{}>;

const Theme = ({ children }: themeProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
