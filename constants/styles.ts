import { DimensionValue } from "react-native";
import { moderateScale } from "react-native-size-matters";

const Spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
};

const FontSize = {
  xs: moderateScale(8),
  sm: moderateScale(12),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
};
const Width = {
  w100: "100%" as DimensionValue,
  w80: "80%" as DimensionValue,
  w75: "75%" as DimensionValue,
  w50: "50%" as DimensionValue,
  w25: "25%" as DimensionValue,
};

export { FontSize, moderateScale, Spacing, Width };

