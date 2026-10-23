import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, lightBorderColor, darkBorderColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const borderColor = useThemeColor({ light: lightBorderColor, dark: darkBorderColor }, 'border');

  return <View style={[{ backgroundColor, borderColor }, style]} {...otherProps} />;
}
