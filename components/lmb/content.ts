export const moods = [
  {
    id: 'classic',
    eyebrow: '01 / Classic',
    title: 'Timeless, never ordinary.',
    description: 'Polished pours, familiar silhouettes, and a bar programme that lets the celebration lead.',
    color: '#d9c69e',
  },
  {
    id: 'luxury',
    eyebrow: '02 / Luxury',
    title: 'A little more gold in the glass.',
    description: 'Champagne light, sculptural garnish, and slow, deliberate theatre for the room.',
    color: '#c9a86a',
  },
  {
    id: 'electric',
    eyebrow: '03 / Electric',
    title: 'For nights with a pulse.',
    description: 'Cold light, high energy, and serves designed to change the temperature of the room.',
    color: '#9ae7ef',
  },
  {
    id: 'tropical',
    eyebrow: '04 / Tropical',
    title: 'Sunset, bottled.',
    description: 'Citrus, texture, and a vivid menu that keeps the mood warm long after sunset.',
    color: '#e8a949',
  },
  {
    id: 'experimental',
    eyebrow: '05 / Experimental',
    title: 'The unexpected, precisely poured.',
    description: 'Smoke, spheres, aroma, and liquid ideas that become the story guests retell.',
    color: '#a7a9ff',
  },
] as const;

export type MoodId = (typeof moods)[number]['id'];

export const cocktailStages = [
  ['00', 'The vessel', 'A clean, cold glass sets the stage.'],
  ['01', 'The ice', 'Clarity, temperature, and anticipation.'],
  ['02', 'The spirit', 'The structure arrives, slow and deliberate.'],
  ['03', 'The citrus', 'A bright edge to lift the room.'],
  ['04', 'The texture', 'Velvet foam gives the pour its signature.'],
  ['05', 'The transformation', 'Smoke turns chemistry into theatre.'],
  ['06', 'The garnish', 'One final detail, exactly where it belongs.'],
] as const;

export const eventTypes = ['Wedding', 'Private Celebration', 'Corporate Event', 'Brand Experience', 'Other'] as const;
export const guestRanges = ['Under 50', '50–100', '100–250', '250–500', '500+'] as const;
