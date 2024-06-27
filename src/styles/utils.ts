import { CSSObject } from '@emotion/react';
import { Property } from 'csstype';
import { CSSProperties } from 'react';

import { standardShadows, standardSizes, transitionTimes } from './theme';

/**
 * Represents a type that can be either a key of the `standardSizes` object or a number.
 */
export type StandardSizeNumber = keyof typeof standardSizes | number;

/**
 * Retrieves the standard size value based on the provided size parameter.
 * If the size parameter is a number, it is returned as is.
 * If the size parameter is a string, it is used as a key to retrieve the corresponding value from the standardSizes object.
 * @param size - The size parameter to retrieve the standard size value for.
 * @returns The standard size value.
 */
export const getStandardSizes = (size: StandardSizeNumber): number =>
  typeof size === 'number' ? size : standardSizes[size];

/**
 * Creates a standard sizing CSS object based on the provided CSS property and size.
 * @param cssProp - The CSS property to apply the sizing to.
 * @returns A function that takes a size value and returns a CSS object with the specified sizing.
 */
export const createStandardSizing =
  (cssProp: keyof CSSProperties) =>
  (size: StandardSizeNumber): CSSObject => ({
    [cssProp]: typeof size === 'number' ? size : standardSizes[size],
  });

/**
 * Returns a CSSObject representing absolute positioning with optional top, right, bottom, and left values.
 * @param top - The top position value.
 * @param right - The right position value.
 * @param bottom - The bottom position value.
 * @param left - The left position value.
 * @returns A CSSObject representing absolute positioning.
 */
export const absolute = (
  top?: number,
  right?: number,
  bottom?: number,
  left?: number,
): CSSObject => ({
  position: 'absolute',
  top,
  right,
  bottom,
  left,
});

/**
 * Returns a CSSObject representing relative positioning with optional offsets.
 * @param top - The top offset.
 * @param right - The right offset.
 * @param bottom - The bottom offset.
 * @param left - The left offset.
 * @returns The CSSObject representing relative positioning.
 */
export const relative = (
  top?: number,
  right?: number,
  bottom?: number,
  left?: number,
): CSSObject => ({
  position: 'relative',
  top,
  right,
  bottom,
  left,
});

/**
 * Represents the border radius value used in styling.
 */
export const borderRadius = createStandardSizing('borderRadius');

/**
 * Creates a border style object with the specified color and size.
 * @param color - The color of the border.
 * @param size - The size of the border. Defaults to '2px'.
 * @returns The border style object.
 */
export const border = (color: string, size = '2px') => ({
  border: `${size} solid ${color}`,
});

/**
 * Creates a standard sizing for padding.
 * @param {string} type - The type of sizing (e.g. 'padding').
 * @returns {string} - The standard sizing for padding.
 */
export const padding = createStandardSizing('padding');

/**
 * Returns a CSSObject with padding applied to the left and right sides.
 * @param size - The size of the padding.
 * @returns The CSSObject with the specified padding applied.
 */
export const paddingHorizontal = (size: StandardSizeNumber): CSSObject => ({
  paddingLeft: getStandardSizes(size),
  paddingRight: getStandardSizes(size),
});

/**
 * Returns a CSSObject with padding applied to the top and bottom.
 * @param size - The size of the padding, which should be one of the keys of the `standardSizes` object.
 * @returns A CSSObject with `paddingTop` and `paddingBottom` properties set to the specified size.
 */
export const paddingVertical = (size: keyof typeof standardSizes): CSSObject => ({
  paddingTop: getStandardSizes(size),
  paddingBottom: getStandardSizes(size),
});

/**
 * Creates a standard sizing for a given CSS property.
 *
 * @param property The CSS property to create the sizing for.
 * @returns The standard sizing for the given CSS property.
 */
export const margin = createStandardSizing('margin');

/**
 * CSS object for centering an element horizontally by setting the left and right margins to 'auto'.
 */
export const marginHorizontalCenter: CSSObject = {
  marginLeft: 'auto',
  marginRight: 'auto',
};

/**
 * Returns a CSSObject with margin set to the specified size on both left and right sides.
 * @param size - The size of the margin.
 * @returns The CSSObject with margin set to the specified size on both left and right sides.
 */
export const marginHorizontal = (size: StandardSizeNumber): CSSObject => ({
  marginLeft: getStandardSizes(size),
  marginRight: getStandardSizes(size),
});

/**
 * Returns a CSSObject with margin-top and margin-bottom set to the specified size.
 * @param size - The size of the margin, which should be one of the standard sizes.
 * @returns A CSSObject representing the margin styles.
 */
export const marginVertical = (size: keyof typeof standardSizes): CSSObject => ({
  marginTop: getStandardSizes(size),
  marginBottom: getStandardSizes(size),
});

/**
 * Returns a CSSObject representing a flex container with the specified direction.
 * @param direction The flex direction. Defaults to 'row'.
 * @returns The CSSObject representing the flex container.
 */
export const flex = (direction: Property.FlexDirection = 'row'): CSSObject => ({
  display: 'flex',
  flexDirection: direction,
});

/**
 * Returns a CSSObject with the specified flex value.
 * @param value - The flex value (default is 1).
 * @returns The CSSObject with the flex value.
 */
export const flexValue = (value = 1): CSSObject => ({
  flex: value,
});

/**
 * Creates a CSSObject representing a font style.
 * @param family The font family.
 * @param size The font size.
 * @param weight The font weight.
 * @returns The CSSObject representing the font style.
 */
export const font = (
  family?: CSSObject['fontFamily'],
  size?: CSSObject['fontSize'],
  weight?: CSSObject['fontWeight'],
): CSSObject => ({
  fontFamily: family,
  fontSize: size,
  fontWeight: weight,
});

/**
 * Represents a utility function that applies a flex value of 1 to a CSS property.
 */
export const flex1 = flexValue(1);
/**
 * Represents a utility function that applies a flex value of 2 to a CSS property.
 */
export const flex2 = flexValue(2);
/**
 * Represents a utility function that applies a flex value of 3 to a CSS property.
 */
export const flex3 = flexValue(3);
/**
 * Represents a utility function that applies a flex value of 4 to a CSS property.
 */
export const flex4 = flexValue(4);
/**
 * Represents a utility function that applies a flex value of 5 to a CSS property.
 */
export const flex5 = flexValue(5);

/**
 * CSS object for centering elements using flexbox.
 */
export const flexCenter: CSSObject = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

/**
 * CSS object for centering elements vertically using flexbox.
 */
export const flexCenterVertical: CSSObject = {
  display: 'flex',
  alignItems: 'center',
};

/**
 * CSS object for centering elements horizontally using flexbox.
 */
export const flexCenterHorizontal: CSSObject = {
  display: 'flex',
  justifyContent: 'center',
};

/**
 * CSS object for creating a flex container with space between items.
 */
export const flexBetween: CSSObject = {
  display: 'flex',
  justifyContent: 'space-between',
};

/**
 * CSS object for applying flex layout with space around alignment.
 */
export const flexAround: CSSObject = {
  display: 'flex',
  justifyContent: 'space-around',
};

/**
 * CSS object for evenly distributing flex items along the main axis.
 */
export const flexEvenly: CSSObject = {
  display: 'flex',
  justifyContent: 'space-evenly',
};

/**
 * CSS object for flex column style.
 */
export const flexColumn = flex('column');

/**
 * Represents a CSS object that sets the width and height to 100%.
 */
export const fullSize: CSSObject = {
  width: '100%',
  height: '100%',
};

/**
 * Represents a CSS object that sets the width to 100%.
 */
export const fullWidth: CSSObject = {
  width: '100%',
};

/**
 * CSS object representing full height.
 */
export const fullHeight: CSSObject = {
  height: '100%',
};

/**
 * CSS object for applying image cover style.
 */
export const imageCover: CSSObject = {
  objectFit: 'cover',
  ...fullSize,
};

/**
 * CSS object for containing images.
 */
export const imageContain: CSSObject = {
  objectFit: 'contain',
  ...fullSize,
};

/**
 * Generates a drop shadow CSS property based on the provided size and inset flag.
 * @param size - The size of the drop shadow. Must be one of the keys of the `standardShadows` object.
 * @param inset - Optional. Specifies whether the drop shadow should be inset or not. Default is `false`.
 * @returns The CSS object representing the drop shadow.
 */
export const dropShadow = (
  size: keyof typeof standardShadows,
  inset?: boolean,
): CSSObject => ({
  boxShadow: inset
    ? 'inset ' + standardShadows[size].replace('),', '), inset ')
    : standardShadows[size],
});

/**
 * Applies a text shadow to an element based on the specified size.
 * @param size - The size of the text shadow.
 * @returns An object containing the CSS properties for the text shadow.
 */
export const textShadow = (size: keyof typeof standardShadows): CSSObject => ({
  textShadow: standardShadows[size],
});

/**
 * CSS object representing center alignment.
 */
export const center: CSSObject = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

/**
 * CSS object for horizontally centering an element.
 */
export const centerHorizontal: CSSObject = {
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
};

/**
 * CSS object for centering an element vertically.
 */
export const centerVertical: CSSObject = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
};

/**
 * Creates a CSSObject with a transition property based on the provided time.
 * @param time - The time value for the transition.
 * @returns The CSSObject with the transition property.
 */
export const transition = (time: keyof typeof transitionTimes): CSSObject => ({
  transition: `all ${transitionTimes[time]}`,
});

/**
 * Represents a CSS object for clearing text styles.
 */
export const clearTextStyle: CSSObject = {
  textDecoration: 'none',
  color: 'inherit',
};

/**
 * Creates a CSSObject with a single property and value.
 * @param prop - The CSS property to set.
 * @returns A function that accepts the value for the specified property and returns a CSSObject.
 */
export const property =
  <T extends keyof CSSProperties>(prop: T) =>
  (value: CSSProperties[T]): CSSObject => ({
    [prop]: value,
  });
