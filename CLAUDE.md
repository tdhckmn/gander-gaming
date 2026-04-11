## What is Gander Gaming?!
Gander Gaming is an indie game publishing company founded by Lester Burton in 2021. 

"Since my first commercial release of the now platinum bestseller Grok?!, I've been committed to creating inspiring games, tools, and adventures, to help bring the imagined world in your head to the gaming table." - Lester

### The prompter is the developer
You can call them taco.

## The Flagship Game: Grok?!

GROK?! 2nd Edition: A Science-Fantasy RPG
Grok?! is a rules-light science fantasy RPG set in a post-apocalyptic world of advanced technomancy and boundless plausibility.

Grok?! is 100% made by free-range humans.
Grok, both the term and the game, were around before Elon named his AI.
I'm not letting him have it.

Grok?! is a rules-light science fantasy RPG set in a post-apocalyptic world of advanced technomancy and boundless plausibility.

Inspirational touchstones for the world of Grok?! range from Arzach, Brazil, Discworld, Dying Earth, Fantastic Planet, Flash Gordon, Heavy Metal, Space Team, The Hitchhiker’s Guide to the Galaxy, The Labyrinth, Wizards, and countless others.

In this world of post-apocalyptic technomancy, nearly anything is plausible.

Sail across the starry aether and explore alien worlds..
Rebel against authoritarian AI alongside trans-dimensional migrants..
Discover disparate cultures atop hovering isles..
Survive the chaotic mana-irradiated wasteland..
Delve dungeons for powerful relics and combat devolved monstrosities..
Confront the other-dimensional nothingness spawned within the hollow planet..
Grok?! 2nd Edition is a 200-page full-color hardcover, complete with Refined Core Rules, Expanded Setting, Full Campaign, Solo Rules, GM Toolkits, and a full complement of add-ons, including a GM Screen, Pregen Character Pad, Zine SRD, Coloring Book, and Dice Set.

## About this Project
You are building a Firebase web application in React. The purposes of this web application are:
- Main landing page for GanderGaming.com
- Main product page for the Grok?! 2nd Edition RPG
- In-game tools (character generators, scenario generators, items, etc)
- Links to socials

### Things for you to know
- Use .env.local for Firebase Config
- Initial package.json must contain these four scripts (i.e. yarn dev, yarn build, yarn preview, yarn deploy)
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "vite build && firebase deploy"

### Styles
Use inspiration-styles.css to create a new styles.css for this project without unneded things, as the inpsiration file came from another project which had valid colors but we decided to start new here.

The author likes a light-mode vibe, but I like something that doesn't harsh the eyes so much. He likes classic serif fonts for headers and doesn't have an opinion about body copy font.

### Images
Look in assets/img

### Links
https://www.facebook.com/Lestortoise
https://www.kickstarter.com/projects/gandergaming/grok-2nd-edition
https://www.youtube.com/GanderGamingCo
mailto:Lester@gandergaming.com

### Landing Page
The main page contains the content from the very first section of this file, What is Gander Gaming?!

### Grok?! 2e Product Page
Planet Grok (header)

...was once a haven of trans-dimensional migrants and a hub of advanced technomancy..

Until a malfunction with the mana-syphon at the planet’s core splintered the world.

Now, a derelict shell of a space station bathes the planet’s surface in phosphorescent radiation..

Isles float among clouds above the splintered wastelands..

Devolved monstrosities haunt the labyrinthine underworld..

And an eldritch breed is cast forth from the malignant Voidstar in the hollow of the planet.

### Tools
Random Character Generator
Name
Combine the two parts to make one name. Zyr + en = Zyren)
Attributes
There are three possible combinations:
d6 d6 d6
d4 d6 d8
d4 d4 d10
Those three combinations can be in any arrangement across the three Attributes (Physical, Mental, Social)
Ex: Physical: d4, Mental d6, Social d8 OR Physical: d6, Mental d4, Social d8, ETC.
Traits
There are (5) total starting Traits (Personality, Appearance, Background, Motivation, Trouble). A Character starts with (1) of each.
Assets
Characters start with (5) Assets (Outfit, Accessory, Weapon, Oddity, Misc.)
Outfit
This should reference the Character's "Background" Trait, and be called "A(n) [Background] Outfit"
Misc
A Character's "Misc" Asset is either a Magic, Vehicle, OR Companion.
Combine results from each column to create the Asset.
Ex: If the Character's Misc Asset is a Magic, a potential result would be "The Grimoire of Binding Flesh"
Format
It'd be acceptable to simply list out the results for each of these categories, but bonus points if the results populate the stylized character sheet that can then be downloaded as a fillable PDF.
Random Scene Generator (Locale + Event)
The Random Locales and Random Events table is combined to create a Scene.
Ex: An Eerie Laboratory with An Ominous Button (Locale) could be combined with A Maniac is Hiding a Huge Egg (Event). The resultant Scene would be "In an Eerie Laboratory with An Ominous Button, A Maniac is Hiding a Huge Egg."
Random Asset Generator
Just pull up (1) result from the single column
Random Simple NPC
Just list a random result from each column.
Ex:
Name: Baraz
Appearance: Gelatinous
Background: Mathmagician

#### CSV
There are files in assets/csv. These files contain the information for the tools. 