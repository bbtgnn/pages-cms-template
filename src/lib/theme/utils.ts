import settings from '$lib/site/settings.json';

function hexToRgb(hex: string) {
    // Remove the hash if present
    hex = hex.replace(/^#/, '');

    // Parse the hex values
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return { r, g, b };
}

function calculateLuminance(r: number, g: number, b: number): number {
    // Convert RGB to relative luminance using the formula from WCAG 2.0
    const [rs, gs, bs] = [r / 255, g / 255, b / 255].map(val => {
        return val <= 0.03928
            ? val / 12.92
            : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function isBaseColorDark(): boolean {
    const baseColor = settings.colors.base;
    const { r, g, b } = hexToRgb(baseColor);
    const luminance = calculateLuminance(r, g, b);
    
    // WCAG 2.0 defines the threshold between light and dark as 0.179
    return luminance < 0.179;
}
