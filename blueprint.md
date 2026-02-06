# MBTI Compatibility Checker Blueprint

## Overview
A web-based application to check compatibility between two MBTI personality types. The app features a split-screen interface where users select a type for each side. It includes responsive design, animations, and a result modal.

## Current State
- Initial setup with empty templates.

## Plan: Implement MBTI Compatibility Core Features
1.  **Structure (`index.html`)**:
    -   Create a main container with `id="app"`.
    -   Two distinct sections: `#side-a` and `#side-b`.
    -   Action area for the "See Compatibility" button.
    -   Modal dialog for displaying results.
2.  **Styles (`style.css`)**:
    -   Define CSS variables for MBTI groups (NT, NF, SJ, SP).
    -   Use Flexbox for the main layout (Row on Desktop, Column on Mobile).
    -   Implement transition effects (`opacity`, `transform`) for smooth selection/deselection.
3.  **Logic (`main.js`)**:
    -   Define MBTI data with associated groups.
    -   Implement a compatibility algorithm (or simplified matrix).
    -   Render 16 buttons dynamically for each side.
    -   Handle click events to toggle selection states (hide unselected, show selected).
    -   Manage the "See Compatibility" button visibility.
    -   Calculate and display results in the modal.

## Completed Features
-   [x] **Complete Redesign (High-End App Style)**:
    -   [x] Adopted 'Pretendard' font for premium Korean typography.
    -   [x] Clean, whitespace-heavy layout inspired by modern Korean apps (Toss, Kakao).
    -   [x] "Bento Grid" style cards for MBTI selection.
-   [x] **Korean Localization**:
    -   [x] Translated all interface text to natural Korean.
    -   [x] Added descriptive labels (e.g., INTJ -> 용의주도한 전략가).
    -   [x] Context-aware result messages in Korean.
-   [x] **Interactive selection**:
    -   [x] Direct switching between types.
    -   [x] "Inactive" state dimming instead of hiding.
-   [x] **Core Features**:
    -   [x] Compatibility algorithm logic.
    -   [x] Floating Action Button (FAB) for results.
    -   [x] Modal result display.
    -   [x] Share functionality.

---

## Current Task
The user wants to add an MBTI test menu that provides a clean, accurate (unofficial), and engaging self-assessment.

## Plan: Code Review and Enhancement Identification
1.  **Code Review**: Examine `index.html`, `style.css`, and `main.js` to understand the current implementation and verify the features listed as "Completed" in this blueprint. **(Completed)**
2.  **Feature/Design Gap Analysis**: Compare the current state of the application with the "Visual Design" and "Accessibility" guidelines outlined in `GEMINI.md`, and identify areas for improvement or additional features that would make the site "well-made." **(Completed)**
3.  **Propose Enhancements**: Based on the review, I will propose specific enhancements focusing on:
    *   Visual polish (animations, transitions, modern aesthetics).
    *   Improved user experience (clarity, ease of use).
    *   Robustness (error handling, data validation if applicable).
    *   Potential for more detailed compatibility insights.
    *   Responsiveness and accessibility. **(Completed)**
4.  **Update `blueprint.md`**: After identifying enhancements, I will update this `blueprint.md` with a detailed plan for implementing these improvements. **(Ongoing)**

## Plan: Implement Enhancements
1.  **Enhance Accessibility (A11Y)**: **(Completed)**
    *   **Implement ARIA attributes**: Added `aria-haspopup="dialog"` to the trigger button and `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby` to the result modal.
    *   **Improve keyboard navigation**: `div` elements for MBTI cards already had `role="button"` and `tabIndex="0"`.
    *   **Focus management for modal**: Implemented storing `lastActiveElement`, focusing `closeModalBtn` on modal open, returning focus on modal close, and a focus trap using `getTabbableElements` and `trapTabKey` functions, along with Escape key closing.
2.  **Refine Compatibility Descriptions**: **(Completed for initial phase)**
    *   **Enrich `MBTI_TYPES` data**: Created `COMPATIBILITY_DETAILS` object with `scoreRanges` (excellent, good, needsWork, bad) and `pairings` for specific and same-type matches.
    *   **Update `calculateCompatibility`**: Refactored to use `COMPATIBILITY_DETAILS` for scores, titles, and array-based descriptions.
3.  **Subtle Visual Polish**: **(Completed)**
    *   **Heart Icon Animation**: Added `pulse-heart` keyframe animation and `.heart-icon.active` class in `style.css`. Integrated JavaScript in `updateActionBar` to toggle this class.
    *   **Modal Entrance Animation**: Enhanced modal entrance with combined `transform` (scale) and `opacity` transitions in `style.css` for a more engaging fade-in and subtle bounce.

## Plan: Enhance Compatibility Interpretations
1.  **Explain Scope**: Acknowledge that generating highly detailed, unique, and empathetic interpretations for all 136 unique MBTI pairs is a significant content creation task. Focus will be on enhancing the generation logic and populating key pairs. **(Completed)**
2.  **Research Detailed Compatibility**: Conduct targeted web research using Google to find more nuanced interpretations, relationship dynamics, common strengths, and challenges for various MBTI pairs. Prioritize Korean resources. Look for patterns or frameworks in interpretations. **(Completed - initial research)**
3.  **Enhance `COMPATIBILITY_DETAILS` Structure**: Potentially evolve the `COMPATIBILITY_DETAILS` object to support more complex logic or categorization (e.g., by functional preferences, interaction styles). **(Completed - Added `preferences` to `MBTI_TYPES`)**
4.  **Implement Dynamic Description Generation (Hybrid Approach)**: **(Completed)**
    *   **Specific Overrides**: Continue to provide highly customized descriptions for well-known "golden pairs" or "challenging pairs."
    *   **Functional Combination Logic**: Developed `generateFunctionalDescription` to combine generic phrases based on the alignment or opposition of their individual MBTI functions (I/E, S/N, T/F, J/P).
    *   **Empathetic and Fun Language**: Ensured the generated descriptions maintain an engaging, empathetic, and slightly humorous tone.
5.  **Iterative Content Creation**: Begin populating more specific `pairings` within `COMPATIBILITY_DETAILS` based on research, prioritizing more frequently sought-after combinations. **(Ongoing - can be further expanded)**
6.  **Review and Refine**: Continuously review generated descriptions for accuracy, tone, and user engagement, refining the underlying logic and content as needed. **(Ongoing)**

---

## Plan: Implement MBTI Self-Test Menu
1.  **Acknowledge and Set Expectations**: Explain that an *unofficial, simplified questionnaire* will be created due to the proprietary nature of official MBTI tests. Emphasize disclaimers for accuracy.
2.  **Research Questionnaire Structure**: Briefly research common patterns for unofficial MBTI-like self-assessments (question types, number of questions per dichotomy).
3.  **HTML Structure**:
    *   Add a new `test-section` HTML element, initially hidden.
    *   Include a welcome/disclaimer screen, a container for questions, navigation buttons (next/back/submit), and a results display area.
    *   Add a menu item (e.g., in the header or action bar) to navigate to the test.
4.  **CSS Styling**: Style the test interface to be clean, modern, and responsive, consistent with the existing design. Use animations for transitions between questions.
5.  **JavaScript Logic (`main.js`)**:
    *   **Questionnaire Data**: Define an array of test questions, each linked to a dichotomy (E/I, S/N, T/F, J/P).
    *   **State Management**: Track current question index, user answers, and accumulated scores for each dichotomy.
    *   **Dynamic Rendering**: Display one question at a time, update progress.
    *   **Answer Handling**: Store user selections.
    *   **Scoring Logic**: Tally points to determine the dominant preference for each dichotomy.
    *   **Result Calculation**: Combine preferences into a 4-letter MBTI type.
    *   **Result Display**: Show the calculated MBTI type, a brief description, and offer an option to "Check Compatibility" with the calculated type pre-filled.
    *   **Navigation**: Implement functions to switch between compatibility checker and test section.
6.  **Disclaimers**: Integrate clear disclaimers within the test and result sections.
7.  **Update `blueprint.md`**: Document the progress of this feature.
