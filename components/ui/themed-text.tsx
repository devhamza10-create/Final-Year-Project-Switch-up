import { StyleSheet, Text, type TextProps } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'sm' | 'xs';
  required?: boolean;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  required = false,
  children,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'sm' ? styles.sm : undefined,
        type === 'xs' ? styles.xs : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
      {required && <Text style={{ color: Colors.light.destructive }}>{" "}*</Text>}
    </Text>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  sm: {
    fontSize: 14,
    lineHeight: 20,
  },
  xs: {
    fontSize: 12,
    lineHeight: 16,
  },
});
