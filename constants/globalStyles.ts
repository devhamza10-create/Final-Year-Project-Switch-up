import { StyleSheet } from 'react-native';
import { Colors } from './Colors';
import { FontSize, Spacing } from './styles';

export const globalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  contentWithGap: {
    flex: 1,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  contentWithHorizontalPadding: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },

  // Flex layouts
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexCenterColumn: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  // Input containers
  inputContainer: {
    gap: Spacing.sm,
  },

  // Card styles
  card: {
    borderRadius: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.light.backgroundLight,
  },
  cardWithBorder: {
    borderRadius: Spacing.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  // Text styles
  title: {
    fontSize: FontSize.lg,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.light.gray,
  },

  // Button styles
  button: {
    borderRadius: Spacing.md,
  },
  buttonWithGap: {
    borderRadius: Spacing.md,
    gap: Spacing.md,
  },

  // List styles
  listContainer: {
    gap: Spacing.md,
  },
  listItem: {
    padding: Spacing.md,
    borderRadius: Spacing.md,
  },

  // Form styles
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.md,
  },

  // Image container
  imageContainer: {
    width: 84,
    height: 84,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'lightgray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
    marginVertical: Spacing.md,
  },
}); 