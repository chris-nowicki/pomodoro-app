# Frontend Mentor - Pomodoro app solution

This is a solution to the [Pomodoro app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/pomodoro-app-KBFnycJ6G). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
    -   [Continued development](#continued-development)
    -   [Useful resources](#useful-resources)
-   [Author](#author)
-   [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

-   Set a pomodoro timer and short & long break timers
-   Customize how long each timer runs for
-   See a circular progress bar that updates every minute and represents how far through their timer they are
-   Customize the appearance of the app with the ability to set preferences for colors and fonts

**I added one other feature**

-   Add a reset button to reset the timer
-   Settings save to local storage

### Screenshot

![](./screenshot.png)

### Links

-   Solution URL: [Add solution URL here](https://your-solution-url.com)
-   Live Site URL: [https://pomodoro.chrisnowicki.io](https://pomodoro.chriswix.com)

## My process

### Built with

-   [Vitejs](https://vitejs.dev) - Development Environment
-   [React](https://reactjs.org/) - JS library
-   [Sass](https://sass-lang.com) - CSS library
-   [TypeScript](https://www.typescriptlang.org/) - JS Library

### What I learned

I wanted to use this project to learn how to write in **TypeScript**, create custom **React Hooks**, and write css using **Sass**. There were also unexpected areas that I learned when it comes to using **React Context**.

**Custom Hook**
I wrote this useActive hook for the navigation buttons, and Font/Color settings buttons to check if the current selected button is active.
```js
export function useActive(item: string, itemCompare: string): boolean {
    if (item !== itemCompare) return false

    return true
}
```

**Sass Mixin**
I wrote this breakpoint mixin to reference across my css code for the responsible design.  It takes in a `$size`(*string*) and references `$breakpoint-up` for which size to be using.  This way I only need to make updates to the mixin and it will change throughout the project.

```css
$breakpoint-up: (
    'mobile': 591px,
    'tablet': 1000px,
);

@mixin breakpoint($size) {
    @media (max-width: map-get($breakpoint-up, $size)) {
        @content;
    }
}
```

**Example of CSS code referencing the mixin**
```css
/* variables */
@use '/src/styles/vars' as *;
@use '/src/styles/breakpoints' as *;

.clockContainer {
    display: flex;
    direction: column;
    justify-content: center;
    align-items: center;
    width: 410px;
    height: 410px;
    border-radius: 50%;
    background: $clock-linear-gradient;
    box-shadow: $clock-box-shadow;
    margin-top: 45px;
    transition: all ease 0.3s;

    @include breakpoint(tablet) {
        margin-top: 109px;
    }

    @include breakpoint(mobile) {
        width: 300px;
        height: 300px;
        margin-top: 48px;
    }
}
```
### Continued development

I want to continue to focus on a few things:
1. sass css language and learn more about nesting, functions, and mixins.
2. TypeScript - I learned so much in this project but I feel I have so much more to learn to become fluent.

### Useful resources

-   [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
-   [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

## Author

-   Website - [https://www.chrisnowicki.io](https://www.chrisnowicki.io)
-   Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/chris-nowicki)
-   Twitter - [@iamwix](https://www.twitter.com/iamwix)

## Acknowledgments

Some credit definitely goes to ...