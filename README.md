# React + TypeScript + Vite

# small plan
In chronological order:
- Initialize project using `vite`.
- cleanup redundant code & add `nextui` (with `tailwindcss`)
- Also add `routing` and `global state management` libraries as well as implementation. routing is necessary for switching pages and global state is needed for giving the entire application access to necessary information like `isLoggedIn` (`React Context API` is sufficient for this usecase)
- Build `home`, `login` and `dashboard` pages (bairbone).
- Add login logic. Also add the redirect functionality for when being logged in or not (using sessions).
- Add `framermotion` page transitions (animations)
- check if `A11y` is sufficiently setup.
- Improve the UI
- Add `unit tests` (snapshot tests as well as static functions tests) using `jest`.

# ES modules (libraries)
- NextUI
- TailwindCSS
- framermotion
- react-router-dom
- js-cookie (used for easy access to cookies. used for storing sessions)
- uuid (used for unique users)
