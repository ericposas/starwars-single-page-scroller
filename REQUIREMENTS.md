# Marcom FED Code Challenge | Requirements

## COMPS
Support the resolutions documented in [COMPS](./COMPS.md). For all layout and design specifications, refer to the [Zeplin](https://zpl.io/aXyzyKj) file that was shared with you.

## VIEWPORTS
- [ ] Support the following viewport widths:
    * **Mobile** ⟵ 767px
    * **Tablet** 768px ⟵⟶ 1024px
    * **Desktop** 1025px ⟶

## TYPOGRAPHY
- [ ] The Body text must be [Lato](https://www.google.com/fonts/specimen/Lato)
- [ ] The Header and Menu text must be [Raleway](https://www.google.com/fonts/specimen/Raleway)
- [ ] The typographic base size is 16px
- [ ] The typographic scale is 1.414
- [ ] The Header 1 & 2 and Menu text must be "Bold"
- [ ] The Header 3 & 4 text must be "Extra-Light"
- [ ] Separate sections by the [Section sign](https://en.wikipedia.org/wiki/Section_sign)

## FUNCTIONALITY
- [ ] The Header & Footer must be fixed
- [ ] Header image must display:
    * [this image](./assets/logo.svg) for Mobile & Tablet
    * [this image](./assets/hero.jpg) for Desktop
- [ ] Active Menu item and active Section item must display active state, as designed in the comps, using an `active` class
- [ ] Support the latest version of Chrome

## EXTRA CREDIT

### Avoid adding HTML nodes and CSS classes

* An exercise in CSS selector specificity.

### Add Interactivity to Navigation

Examine a motion study [here](https://www.youtube.com/watch?v=krig2AMKqgQ) that demonstrates the requirements; also outlined below:

1. **When a Menu item is clicked**
    * Deactivate active Menu item
    * Deactivate active Section item
    * Activate clicked Menu item
    * Activate corresponding Section item
    * Scroll window to corresponding Section item
    * Change to corresponding hash in browser address bar

2. **When a Section item is scrolled to**
    * Deactivate active Menu item
    * Deactivate active Section item
    * Activate scrolled to Section item
    * Activate corresponding Menu item
    * Change to corresponding hash in browser address bar

3. **When the hash in browser address bar is changed**
    * Deactivate active Menu item
    * Deactivate active Section item
    * Activate corresponding Menu item
    * Activate corresponding Section item

[//]: # (Link references)
