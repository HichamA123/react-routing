# React + TypeScript + Vite

# small plan
In chronological order:
- Initialize project using `vite`.
- cleanup redundant code & add `nextui` (with `tailwindcss`)
- Also add `routing` library and setup the `global state management`. Also start a barebone setup of both `routing` and `global state management`. routing is necessary for switching pages and global state is needed for giving the entire application access to necessary information like `isLoggedIn` (`React Context API` is sufficient for this usecase)
- Build `home`, `login` and `dashboard` pages (barebone).
- Add navbar
- Add login logic. Also add the redirect functionality for when being logged in or not (using sessions).
- Add `framermotion` page transitions (animations)
- check if `A11y` is sufficiently setup.
- Improve the UI
- Add `unit tests` (snapshot tests as well as static functions tests) using `jest`.

# ES modules (libraries) with some explanations
- NextUI
- TailwindCSS
- framermotion
- react-router-dom
- js-cookie (used for easy access to cookies. used for storing sessions)
- uuid (used for unique users, temporary used this library)
- react-toastify

# issues (thoughts and explanations)
**Redundant sessionToken in UserSession type in AuthContext**
Removed the property because `userUuid` is enough for knowing `isLoggedIn` as well as which user is logged in. both logic pieces can be achieved from 1 property.

**No exit animation on pages**
Solved the issue by reading [framer docs](https://www.framer.com/motion/animate-presence/#usage) The hint that helped me: `Note: Direct children must each have a unique key prop so AnimatePresence can track their presence in the tree.`. This made me think that the pages get wrapped by the `<Outlet />`. So I came along this post: [stackoverflow post](https://stackoverflow.com/questions/75121981/react-framer-motion-animatepresence-exit-animation-does-not-work)

*Solution*
using `useOutlet()` instead of `<Outlet />` because `<Outlet />` wraps the pages around with a wrapper element. Because of this wrapper element I cannot reach the direct child element to set a key which is required for the animatepresence.

**Navigate rerender in `PrivateRoute.tsx`**
Whenever the `<Navigate />` gets called, the location gets updated (logically). This updates the `const location` inside the `PrivateRoute.tsx` because it is a react hook. This triggers a rerender. Because this rerender the Navigate gets called again but this time with the new location from the previous navigate call, which is `/login`. Now the `Login.tsx` thinks that the initial route was `/login` which is incorrect.

*Solution*
See solution with `useEffect` in the `PrivateRoute.tsx` file. This way navigate gets called only once, not depending on any `const location` changes, just the `isLoggedIn` state prop.



