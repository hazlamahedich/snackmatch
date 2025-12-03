# SnackMatch 2.0 – UI/UX Design & Wireframes

## 🎨 Design Philosophy: "Snack Pop"
**Vibe:** Playful, Tactile, and Reactive.
**Style:** **Claymorphism** (soft 3D, rounded corners, inner shadows) meets **Neo-Brutalism** (bold borders, high contrast typography). The UI should feel like a collection of soft, squishy stickers or toys.

### ✨ Key Features
1.  **Dynamic Theming:** The entire app color scheme shifts based on the generated snack or selected vibe.
2.  **"Pop" Interactions:** Buttons and cards press down deeply (3D transform). Hover states lift elements up.
3.  **Motion:** Physics-based animations (springs, bounces) rather than linear fades.

---

## 🌈 Dynamic Theme System
The app background and accent colors change dynamically.

| Vibe/Category | Background | Primary | Accent | Mood |
| :--- | :--- | :--- | :--- | :--- |
| **Default / Neutral** | `Cream (#FFF9DA)` | `Pop Orange (#FF7A5A)` | `Soft Yellow (#FFD600)` | Warm, inviting |
| **Spicy / Energetic** | `Pale Chili (#FFE5E5)` | `Hot Red (#FF4D4D)` | `Flame Orange (#FF9F43)` | Intense, exciting |
| **Sweet / Chill** | `Cotton Candy (#F3E5F5)` | `Sugar Pink (#FF80AB)` | `Sky Blue (#81D4FA)` | Soft, dreamy |
| **Healthy / Fresh** | `Mint Mist (#E8F5E9)` | `Leaf Green (#4CAF50)` | `Lime (#CDDC39)` | Clean, crisp |
| **Late Night / Savory**| `Midnight Blue (#1A237E)`| `Neon Purple (#D500F9)`| `Cyber Yellow (#FFFF00)`| Dark mode, glowing |

---

## 📱 Screens & Wireframes

### 1. Home Screen: "The Vibe Check"
**Goal:** Immediately grab attention and invite interaction.

**Visuals:**
- **Background:** Animated floating blobs (lava lamp effect) in the `Primary` and `Accent` colors of the current theme.
- **Center Stage:** A large, floating "Glass" card containing the input.

**Layout:**
```text
+--------------------------------------------------+
|  [Logo: SnackMatch (Bouncing 3D Text)]           | <-- Top Center
|                                                  |
|      ( Floating 3D Emoji: 🍕 )                   | <-- Drifts around
|                                                  |
|  +--------------------------------------------+  |
|  |  GLASS CARD CONTAINER                      |  |
|  |                                            |  |
|  |  "What's the vibe right now?"              |  | <-- Big Bold Heading
|  |                                            |  |
|  |  +--------------------------------------+  |  |
|  |  |  [ INPUT: "I'm feeling..." ]         |  |  | <-- Neumorphic inset
|  |  +--------------------------------------+  |  |
|  |                                            |  |
|  |  [ Vibe Tags (Pills) ]                     |  |
|  |  (Hungry) (Sad) (Party) (Study)            |  | <-- Clickable, colorful pills
|  |                                            |  |
|  |  +--------------------------------------+  |  |
|  |  |  [ BUTTON: HIT ME! ]                 |  |  | <-- Big, chunky 3D button
|  |  +--------------------------------------+  |  |
|  |                                            |  |
|  +--------------------------------------------+  |
|                                                  |
|   [Link: "Check The Pantry (History)"]           | <-- Bottom, subtle
+--------------------------------------------------+
```

**Interactions:**
- **Vibe Tags:** Clicking a tag populates the input and instantly shifts the background color to match that vibe (e.g., "Party" -> Neon colors).
- **Button:** On hover, scales up 1.05x. On click, squishes down 0.95x (rubbery feel).

---

### 2. Loading Screen: "The Mixer"
**Goal:** Entertain the user while AI generates content.

**Visuals:**
- **Central Animation:** A "Slot Machine" or "Roulette" of giant emojis spinning rapidly.
- **Text:** Dynamic loading messages that change every 2 seconds.

**Layout:**
```text
+--------------------------------------------------+
|                                                  |
|       [  🎰  SLOT MACHINE WINDOW  🎰  ]          |
|       |         [   🍕   ]          |            | <-- Spins rapidly
|       +-----------------------------+            |
|                                                  |
|       "Consulting the Flavor Matrix..."          | <-- Bouncing text
|                                                  |
|       (Progress Bar: Filling with liquid)        |
|                                                  |
+--------------------------------------------------+
```

---

### 3. Result Screen: "The Reveal"
**Goal:** Maximum impact. The snack should feel like a reward.

**Visuals:**
- **Entrance:** The result card "pops" in (scales 0 -> 1.2 -> 1.0) with a confetti explosion of related emojis.
- **Theme:** Background instantly snaps to the specific theme of the generated snack (e.g., "Spicy Nachos" turns the screen Pale Chili).

**Layout:**
```text
+--------------------------------------------------+
|  [< Back]                                        |
|                                                  |
|  +--------------------------------------------+  |
|  |  MAIN CARD (White, heavy shadow)           |  |
|  |                                            |  |
|  |  [ GIANT EMOJI: 🌮 ]                       |  | <-- Bouncing slightly
|  |                                            |  |
|  |  # Spicy Tacos                             |  | <-- Huge Typography
|  |                                            |  |
|  |  "The perfect crunch for your salty mood."  |  |
|  |                                            |  |
|  |  ----------------------------------------  |  |
|  |                                            |  |
|  |  [ ENERGY METER: ⚡⚡⚡⚡⚪ ]              |  |
|  |                                            |  |
|  |  +------------------+  +----------------+  |  |
|  |  | 🎵 Song Pairing  |  | 🥤 Drink       |  |  |
|  |  | "Heat Waves"     |  | "Lime Soda"    |  |  |
|  |  +------------------+  +----------------+  |  |
|  |                                            |  |
|  +--------------------------------------------+  |
|                                                  |
|  +------------------+    +--------------------+  |
|  | [ Save to Pantry ]    | [ Try Again 🔄 ]   |  | <-- Floating Action Buttons
|  +------------------+    +--------------------+  |
|                                                  |
+--------------------------------------------------+
```

**Interactions:**
- **Card:** Tilt effect (parallax) when moving the mouse over the card.
- **Save Button:** Turns into a checkmark and shoots a single star particle upwards.

---

### 4. History Screen: "The Pantry"
**Goal:** A visually pleasing collection of past finds.

**Visuals:**
- **Grid:** Masonry layout of "Polaroid" style cards.
- **Empty State:** A sad, empty fridge illustration that opens when hovered.

**Layout:**
```text
+--------------------------------------------------+
|  [< Home]        PASSPORT / PANTRY               |
|                                                  |
|  [ Filter: All | Spicy | Sweet | Healthy ]       | <-- Horizontal scroll pills
|                                                  |
|  +-------+  +-------+  +-------+                 |
|  | 🌮    |  | 🍦    |  | 🥗    |                 |
|  | Tacos |  | Cream |  | Salad |                 |
|  +-------+  +-------+  +-------+                 |
|                                                  |
|  +-------+  +-------+                            |
|  | 🍫    |  | 🥨    |                            |
|  | Choco |  | Pretzel|                           |
|  +-------+  +-------+                            |
|                                                  |
|           [ Clear History (Trash Icon) ]         |
+--------------------------------------------------+
```

## 🛠 Implementation Notes (Tailwind)
- **Shadows:** Use `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]` for that "hard" pop shadow.
- **Borders:** `border-4 border-black rounded-xl`.
- **Gradients:** `bg-gradient-to-br from-primary to-accent`.
