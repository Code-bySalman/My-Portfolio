// tools/generateBlogsWithIds.js
import { nanoid } from 'nanoid';
import fs from 'fs';

const blogs = [
  {
    title: "my first blog: the war against my lazy self",
    subtitle: "Here I am sharing my real side, real struggle, and thoughts through a blog for the first time.",
    content: `
I’m a very lazy human — like elite-tier lazy.

Most of my day is spent doom-scrolling through Instagram reels, YouTube shorts, or just staring into the void thinking "I'll start in 5 minutes." I procrastinate like a pro. And every night I sleep with guilt, knowing I wasted another day when I could’ve pushed even a little bit toward my goals.

But recently, I’ve been trying to face it head-on. I’ve started journaling (on Notion), limiting screen time, and keeping a “micro todo list” — like literally one task at a time. And when I’m coding, I use apps like *Cold Turkey* to block distractions.

As a web developer trying to build real things and improve my craft, it's hard to stay focused in a world full of dopamine traps. But I’m trying. That’s why this blog exists — to be real, to stay accountable, and maybe to let someone else know they’re not alone in this mess.

Let's get better, one messy day at a time.
    `.trim(),
    date: "Jul 8, 2025",
    readTime: "4 min read",
  },
{
  title: "Zustand: State Management Without the Boilerplate",
  subtitle: "Zustand is like having a walkie-talkie for your components — small, simple, and powerful.",
  content: `
<p>If you’ve ever used Redux and felt like you were writing a thesis just to manage a toggle, Zustand might just feel like a breath of fresh air.</p>

<h3>🧠 Real-Life Analogy</h3>
<p>Imagine you're running a small kitchen. You have a whiteboard where the current state is written:</p>
<ul>
  <li>"Fridge is open"</li>
  <li>"Oven is on"</li>
  <li>"Dish is ready"</li>
</ul>
<p>Instead of shouting updates, any staff member can just <strong>look at the board</strong> (read state) or <strong>write on it</strong> (update state). Zustand is that whiteboard for your React components.</p>

<h3>📦 Why Zustand?</h3>
<ul>
  <li>No need for reducers, actions, or context setup.</li>
  <li>Global state with local-feel simplicity.</li>
  <li>Tiny bundle (~1KB gzipped).</li>
</ul>

<h3>🧪 Basic Example</h3>

<h4>🗂️ Zustand Store</h4>
<img src="/icons/useCounterStore.png" alt="zustand store" style="max-width:100%; border-radius:8px; margin-bottom:1rem;" />

<h4>💡 Zustand Component Usage</h4>
<img src="/icons/CounterComponent.png" alt="zustand component" style="max-width:100%; border-radius:8px;" />

<p>No reducers, no prop-drilling, just <strong>straightforward state management</strong>. Zustand is honestly a game-changer for small to medium apps — and even large ones if used wisely.</p>

<p>Let your components breathe again.</p>
  `.trim(),
  date: "Jul 8, 2025",
  readTime: "5 min read"
}

];

const withIds = blogs.map((b) => ({ id: nanoid(), ...b }));

fs.writeFileSync('src/data/blogData.js', `export const blogData = ${JSON.stringify(withIds, null, 2)};`);
