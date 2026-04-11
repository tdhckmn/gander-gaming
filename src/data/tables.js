// All game tables, converted from CSV source files.

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Returns "an" before vowel sounds, "a" otherwise.
export function article(word) {
  return /^[aeiou]/i.test(word.trim()) ? 'an' : 'a';
}

// Prefixes a word with the correct indefinite article, capitalised if cap=true.
export function withArticle(word, cap = false) {
  const art = article(word);
  const result = `${art} ${word}`;
  return cap ? result.charAt(0).toUpperCase() + result.slice(1) : result;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------------------
// Character tables
// ---------------------------------------------------------------------------

export const NAME_PARTS_1 = [
  'Zyr','Cor','Val','Oryn','Myr','Tal','Syl','Ulv','Ar','Lyth',
  'Xev','Ryn','Drak','Quor','Sol','Nyth','Kil','Mel','Luum','Fyr',
];

export const NAME_PARTS_2 = [
  'en','is','ar','on','ix','ath','osh','a','us','ar',
  'en','ix','on','ath','is','or','a','en','us','ix',
];

// The three possible attribute die combos (each is [physical, mental, social] before shuffling)
const ATTR_COMBOS = [
  [6, 6, 6],
  [4, 6, 8],
  [4, 4, 10],
];

export const PERSONALITIES = [
  'Ambitious','Anxious','Arrogant','Bigoted','Boisterous','Capricious','Carnal','Cautious',
  'Chaotic','Compassionate','Conniving','Courageous','Cowardly','Cruel','Cunning','Distrusting',
  'Dogmatic','Entitled','Fanatical','Fearless','Flamboyant','Focused','Generous','Greedy',
  'Gullible','Honorable','Humorless','Idealistic','Indecisive','Indulgent','Inquisitive',
  'Jealous','Lackadaisical','Lazy','Loyal','Lustful','Manic','Miserly','Naive','Nervous',
  'Patient','Pedantic','Pessimistic','Pious','Pompous','Prejudiced','Reckless','Ruthless',
  'Sadistic','Sarcastic','Selfish','Serene','Shy','Skeptical','Slovenly','Sly','Stubborn',
  'Superstitious','Vicious','Wrathful',
];

export const APPEARANCES = [
  '2-Dimensional','Amorphous','Ancient','Android','Anthropomorphic','Asymmetrical','Barnacled',
  'Beastly','Bloodless','Brittle','Bulbous','Chitinous','Cloudlike','Constructed','Crystalline',
  'Decaying','Diminutive','Droopy','Elastic','Elongated','Ethereal','Exoskeletal','Featureless',
  'Festering','Fiendish','Flimsy','Formless','Fractured','Fungal','Furry','Gaseous','Geometric',
  'Giant','Glassy','Gravel-Skinned','Horned','Illusory','Insectoid','Luminescent','Many-Headed',
  'Many-Limbed','Monstrous','Non-Newtonian','Oozing','Outside-In','Plantlike','Reflective',
  'Reptilian','Robotic','Semi-Aquatic','Semi-Translucent','Shelled','Silken','Skeletal',
  'Smoldering','Swarming','Synthetic','Tentacled','Undulating','Winged',
];

export const BACKGROUNDS = [
  '3D Painter','Aethernaut','Alchemancer','Alien Archivist','Antiquarian','Astral Arborist',
  'Barge Captain','Beast Rider','Bio-Artificer','Black Marketeer','Blood Grifter','Cartographer',
  'Chrononaut','Cloudreader','Conquistador','Court Magician','Cult Acolyte','Cyber Grafter',
  'Data Smuggler','Dowser','Dream Editor','Dung Smuggler','False Scion','Flesh Artist',
  'Gadgeteer','Gambler','Gladiator','Gunslinger','History Editor','Identity Thief','Illusioneer',
  'Inquisitor','Islander','Lumineer','Magician','Mana Farmer','Mech Pilot','Mechanic',
  'Memory Scalper','Organ Miner','Paranormalist','Pilgrim','Put Pocket','Quantumologist',
  'Radiation Oracle','Retired Professor','Revolutionary','Secret Agent','Seedsman','Sky Fisher',
  'Sooth Sayer','Spell Editor','Spelunker','Star Sailor','Synth Tech','Torchbearer',
  'Unnaturalist','Vagabond','Void Theologian','Wish Poet',
];

export const MOTIVATIONS = [
  'Achieve holiness','Acquire followers','Acquire relics','Acquire wealth','Advise a leader',
  'Avenge a wrong','Avoid detection','Be intoxicated','Become a legend','Become infamous',
  'Become nobility','Collect a debt','Conquer region','Create a monopoly','Create an army',
  'Create chaos','Cure a disease','Defeat a nemesis','Defend an ally','Deliver a message',
  'Destroy a region','Destroy an army','Destroy evidence','Discover a truth','Distribute justice',
  'Distribute wealth','Enforce morality','Enlighten others','Enlighten self','Escape something',
  'Fight an injustice','Find a document','Find a lost region','Find family','Find love',
  'Forge an alliance','Fund a funeral','Gain freedom','Gain respect','Get revenge',
  'Help a relative','Aid a friend','Impress a lover','Locate an object','Master a skill',
  'Pay a debt','Preserve history','Protect family','Prove oneself','Purge traitors',
  'Reclaim a region','Recovering loot','Restore peace','Reveal a secret','Seize power',
  'Serve an entity','Solve a mystery','Sow chaos','Spread a faith','Spread disease',
];

export const TROUBLES = [
  'Aboulomania','Addicted','Aetheromania','Ages backwards','Amnesia','Artificial','Blackmailed',
  'Blinded','Chronic flatulence','Comfortably numb','Compulsive mimicry','Condemned','Consumptive',
  'Corrosive touch','Criminal record','Cursed','Dacnomania','Darkness allergy','Deafened',
  'Defrauded','Deluded','Deranged','Discredited','Diseased','Disfigured','Eats dirt','Enthralled',
  'Exiled','Fetishist','Forgotten','Foul odor','Framed','Gluttony','Hunted','Hyperphagia',
  'Illiterate','Indentured','Indebted','Infamous','Irregular','Kleptomania','Lagopthalmos',
  'Light allergy','Lost fortune','Molting','Monotone','Mythomania','Narcoleptic','Obsessive',
  'Outcast','Outer monologue','Partial insanity','Partially deaf','Perpetually lost','Possessed',
  'Pursued','Secret oath','Summonable','Unmortal','Wanted fugitive',
];

export const ACCESSORIES = [
  'Adamantine Kilt','Flying Cape','Reflection Vest','Anti-Smell Anklet','Force Shield',
  'Rocket Boots','Artificial Teeth','Head Lamp','Screw-On Head','Attachable Gills',
  'Auto-Bow Belt','Holo-Mask','Sentient Hat','Auto Belt','Battle Stick','Hover Shoes',
  'Sentient Sword','Rail Gun','Glass Cannon','Blame Thrower','Rapid Ionizer','Bile Spewer',
  'Invisible Shield','Retractable Claws','Slug Armor','Belly Pouch','Blade Shooter',
  'Iron Manacles','Space Helm','Boom Socks','Leather Neck','Space Suit','Cloud Cape',
  'Limber Limb','Spikey Necklace','Coat of Bugs','Magni-Monocle','Suction Socks',
  'Combat Armor','Mech Leggings','Telekinetic Glove','Cursed Amulet','Mirage Mask',
  'Thruster Pack','Digital Digit','Movable Mouth','Elastic Belt','Exo-Frame','Mythril Skirt',
  'Ultrasticky Glove','False Face','Nanobot Shirt','Vac Suit','False Nose','Prehensile Wig',
  'Virtual Glasses','Power Glove','Fake Eyelids','Wheeled Shoes','Pneumatic Stilts',
  'Expandable Belly','Wrist Computer','Rebreather','Faux Skin Suit','XXL Codpiece',
];

export const WEAPONS = [
  'Acid Vials','Foam Grenade','Portal Mine','Antigrav Bomb','Foot Daggers','Power First',
  'Atom Rearranger','Freeze Ray','Psychic Screamer','Auto-Bow','Gaseous Sword','Rail Gun',
  'Goo Gun','Retractable Claws','Holo-Dagger','Slug Thrower','Inside-Outer','Stink Grenade',
  'Junk Thrower','Chainsword','Stone Thrower','Defecator','Laser Goggles','Stun Shurikens',
  'Devolution Gun','Laser Sabre','Tachyon Darts','Diseased Darts','Laser Whip','Thermal Axe',
  'Electro Staff','Molecular Scalpel','Throwing Cards','EMP Baton','Permeable Pistol',
  'Titan Mace','Energy Sword','Phaser Sabre','Trash Blaster','Extendable Pole','Plasma Cannon',
  'Ultralight Dadao','Fire Flinger','Plasma Pistol','Vibro-Boomerang','Finger Guns',
  'Polymorphisizer','Whip Sword','Gunsword','Shame Thrower',
];

export const ODDITIES = [
  '3D Paint Brush','Forgery Kit','Rad Calendar','4D Printer','Gullible Goop','Rad Glasses',
  'Alien Egg','Holo-Map','Rad Umbrella','Animate Rope','Holo-Phone','Random Pills',
  'Bag of Nanites','Inflatable Prison','Remote Eyeball','Battering Ham','Insta-Heal Salve',
  'Sack of Nuts','Bug Repellant','Jackhammer','Savor Saver','Cerebral Stack','Jug of Booze',
  'Secret Passcode','Collapsible Chair','Lost Credit Chit','Sim ID Card','Data Stick',
  'Matter Changer','Sonic Multitool','Death Sticks','Memory Magnet','Star Charts',
  'Dematerializer','Mini-Replicator','Stolen Datapad','Ear Trumpet','Mobile Forge',
  'Stolen Eyeball','Echolocator','Pheromonizer','Synthetic Organ','Edible Candles',
  'Plasma Cutter','Thought Sucker','Enchanted Sitar','Pocket Lathe','Three Seashells',
  'Extend-O-Can','Pocket Sand','Torch Bundle','Flesh Maker','Portable Hole','Translator Chip',
  'Fog Stone','Potent Potables','Truffula Seed','Forever Sponge','Psychic ID Card','Wormholer',
];

export const MAGIC_PT1 = [
  'Grimoire','Hex','Incantation','Invocation','Miracle','Power','Prayer','Recitation',
  'Rite','Ritual','Rune','Scroll','Sigil','Song','Spell','Staff','Tattoo','Tome','Wand','Word',
];

export const MAGIC_PT2 = [
  'Artificial','Binding','Chameleonic','Concealing','Diminishing','Elastic','Enlarging',
  'Excruciating','Grasping','Guiding','Intoxicating','Necrotic','Nullifying','Psychedelic',
  'Regenerative','Seeing','Silencing','Telepathic','Teleporting','Warding',
];

export const MAGIC_PT3 = [
  'Blade','Blood','Bubble','Flesh','Flight','Golem','Hole','Ichor','Light','Memory',
  'Nightmare','Organ','Parasite','Path','Ray','Servant','Steed','Voice','Wall','Wind',
];

export const VEHICLE_PT1 = [
  '2-Dimensional','Autopiloting','Camouflaging','Carnivorous','Inefficient','Iron Cladded',
  'Modular','Nuclear','Poor Handling','Pristine','Remote','Semi-Visible','Shoddy','Shrinkable',
  'Stinking','Temperamental','Tumorous','Ultra Quiet','Ultra-Light','Uncomfortable',
];

export const VEHICLE_PT2 = [
  'Aether Ship','Dirigible','Flying Carpet','Flying Saucer','Giant Boot','Giant Toad',
  'Glass Elevator','Hovercraft','Land Yacht','Legged Carriage','Massive Beetle','Mecha-Horse',
  'Nautilus','Racing Snail','Rocket Ship','Sauropod','Space Barge','Subterrene','Thopter',
  'Pterodactyl',
];

export const VEHICLE_PT3 = [
  'Alien Interface','Crude Nav System','Damaged Hull','EMP Blaster','Faulty Accelerator',
  'Flesh Fuel Source','Leaking Underside','Mana Hyperdrive','Memory Bank','Microwave Ray',
  'Mounted Cannon','Noxious Exhaust','Psychic Shield','Radio System','Reinforced Hull',
  'Satellite Dish','Scavenging Arm','Self-Destruct','Sense of Humor','Strange Accent',
];

export const COMPANION_PT1 = [
  'Compliant','Courageous','Cruel','Cunning','Curious','Disfigured','Distrusting','Entitled',
  'Fleet-footed','Flamboyant','Gullible','Honorable','Intolerant','Lackadaisical','Nervous',
  'Pessimistic','Possessed','Queasy','Reckless','Selfish',
];

export const COMPANION_PT2 = [
  'Android','Anthropomorph','Cosmic Slug','Crustacean Colony','Doppelganger','Exiled Islander',
  'Faceless Human','Greyskin Alien','Hologram','Insectoid','Levitating Skull','Lizardling',
  'Mindless Clone','Phantasm','Sentient Blob','Swarm of Bugs','Uplifted Beast','Uplifted Plant',
  'Winged Snake','Zomboid',
];

export const COMPANION_PT3 = [
  'Bandit','Blacksmith','Bodyguard','Butler','Carpenter','Dowser','Familiar','Gladiator',
  'Jester','Locksmith','Merchant','Pilot','Scribe','Soldier','Surgeon','Survivalist',
  'Tailor','Theologian','Torchbearer','Trader',
];

export function generateCharacter() {
  const name = pick(NAME_PARTS_1) + pick(NAME_PARTS_2);

  const dice = shuffle(pick(ATTR_COMBOS));
  const attrs = {
    physical: `d${dice[0]}`,
    mental: `d${dice[1]}`,
    social: `d${dice[2]}`,
  };

  const background = pick(BACKGROUNDS);
  const traits = {
    personality: pick(PERSONALITIES),
    appearance: pick(APPEARANCES),
    background,
    motivation: pick(MOTIVATIONS),
    trouble: pick(TROUBLES),
  };

  const miscType = pick(['magic', 'vehicle', 'companion']);
  let misc;
  if (miscType === 'magic') {
    misc = `The ${pick(MAGIC_PT1)} of ${pick(MAGIC_PT2)} ${pick(MAGIC_PT3)}`;
  } else if (miscType === 'vehicle') {
    const vPt1 = pick(VEHICLE_PT1); const vPt3 = pick(VEHICLE_PT3);
    misc = `${withArticle(vPt1, true)} ${pick(VEHICLE_PT2)} with ${withArticle(vPt3)}`;
  } else {
    const cPt1 = pick(COMPANION_PT1); const cPt3 = pick(COMPANION_PT3);
    misc = `${withArticle(cPt1, true)} ${pick(COMPANION_PT2)} trained as ${withArticle(cPt3)}`;
  }

  return {
    name,
    attrs,
    traits,
    assets: {
      outfit: `A ${background} Outfit`,
      accessory: pick(ACCESSORIES),
      weapon: pick(WEAPONS),
      oddity: pick(ODDITIES),
      misc,
      miscType,
    },
  };
}

// ---------------------------------------------------------------------------
// NPC tables
// ---------------------------------------------------------------------------

export const NPC_NAMES = [
  'Adriel','Azos','Balugd','Baraz','Bob','Boko','Ghox','Igbueh','Kesa','Kif',
  'Leeloo','Mudo','Nyendo','Orgoth','Rava','Toorg','Xin','Zalcon','Zaphod','Zara',
];

export const NPC_APPEARANCES = [
  'Aethernaut','Automaton','Bulbous','Crystalline','Elastic','Ethereal','Fungoid','Gargantuan',
  'Gaseous','Gelatinous','Gremlin','Insectoid','Islander','Many-Mouthed','Mole-man',
  'Sim','Slugling','Smallish','Three-Armed','Vagabond',
];

export const NPC_BACKGROUNDS = [
  'Barbarian','Cloud Tamer','Death Knight','Doom Prophet','Drug Smelter','Face Thief',
  'Fugitive','Kill Droid','Mathmagician','Mercenary','Organ Smuggler','Pilgrim','Prospector',
  'Ruffian','Spelunker','Technomage','Telepath','Temporal Legate','Trooper','Waste Wizard',
];

export function generateNPC() {
  return {
    name: pick(NPC_NAMES),
    appearance: pick(NPC_APPEARANCES),
    background: pick(NPC_BACKGROUNDS),
  };
}

// ---------------------------------------------------------------------------
// Scene tables (Locale + Event)
// ---------------------------------------------------------------------------

export const LOCALE_ADJ = [
  'Cramped','Crystalline','Eerie','Festering','Flooded','Furry','Miniscule','Ominous',
  'Proper','Raucous','Sacred','Secluded','Soundless','Spacious','Sterile','Suffocating',
  'Timeless','Trippy','Unstable','Watched',
];

export const LOCALE_PLACE = [
  'Angertorium','Escape Pod','Gallows','Hall of Bones','Jail Cell','Laboratory',
  'Lecture Hall','Lookout Perch','Memory Vault','Museum Exhibit','Pawnshop',
  'Pilgrimage Site','Prismatic Bridge','Roaming Cabin','Saloon','Sepulcher',
  'Server Room','Storage Vault','Teleport Pad','Vaporous Lake',
];

export const LOCALE_FEATURE = [
  'A Bottomless Chasm','A Cash Cache','A Dormant Beast','A Hive Mind','A Mysterious Staircase',
  'A Rejuvenating Bath','A Trap Door','An Aether Gate','An Ancient Monument','An Exposed Reactor',
  'An Insect Infestation','An Ominous Button','Angry Slugmen','Animated Objects',
  'Carnivorous Doorways','Ever-present Light','Hyper-Sticky Floors','Non-Euclidean Geometry',
  'Territorial Vermints','Undulating Walls',
];

export const EVENT_WHO = [
  'Ancient Sorcerer','Automaton','Cheery Heretic','Chrono-Knight','Cutthroat Gang',
  'Fledgling Thief','Gaggle of Goblins','Lost Trader','Maniac','Mob of Mutants',
  'Mushrooman','Pile of Worms','Sentient Mirror','Sentient Ooze','Sky Eel',
  'Soul Hunter','Sphinx Family','Withered Tree','Young Dragon','Zomboid',
];

export const EVENT_VERB = [
  'Befriending','Corrupting','Courting','Debating','Destroying','Enshrining','Ensnaring',
  'Excreting','Finding','Following','Forgetting','Hiding','Imagining','Imitating',
  'Instructing','Nurturing','Protecting','Selling','Trapped by','Uncovering',
];

export const EVENT_WHAT = [
  'Cyborg Ogre','Cypher','Deep Secret','Duplicate','Effigy','Fake Face','Flesh Pile',
  'Flying Wagon','Gold Golem','Huge Egg','Massive Grub','Mate','Microchip','Mimic',
  'Miniature City','Nightmare','Organ','Skin Grafter','Starseed','Vat of Serum',
];

export function generateScene() {
  const adj = pick(LOCALE_ADJ);
  const place = pick(LOCALE_PLACE);
  const feature = pick(LOCALE_FEATURE);
  const who = pick(EVENT_WHO);
  const verb = pick(EVENT_VERB);
  const what = pick(EVENT_WHAT);

  const locale = `${withArticle(adj, true)} ${place} with ${feature}`;
  const event = `${withArticle(who, true)} is ${verb} ${withArticle(what)}`;
  return { locale, event, scene: `In ${locale}, ${event}.` };
}

// ---------------------------------------------------------------------------
// Asset table
// ---------------------------------------------------------------------------

export const ASSETS = [
  '3D Eraser','Assorted Meds','Atomic Candle','Bile Bomb','Boom Broom','Boomerang',
  'Cloud Cape','Collapsable Tank','Death Stick','Devolver Revolver','Digi-Digit',
  'Dream Reader','Elastic-leg','Exo-Frame','False Face','Finger Guns','Fireball Wand',
  'Flying Rug','Glass Cannon','Grav Hammer','Gullibility Goop','Head Lamp','Hover Socks',
  'Hoverbike','Junk Thrower','Laser Light','Legged Carriage','Mecha-Camel','Mini-Mimic',
  'Pack Beetle','Phaser Sabre','Plasma Blaster','Pocket Planet','Polymorph-izer',
  'Porta-toilet','Power Glove','Psychic ID','Psychic Screamer','Pterodactyl','Rad Goggles',
  'Remote Nose','Rune of Alarm','Savor Saver','Skin Suit','Slip-On Tongue','Slug Thrower',
  'Sonic Wrench','Staff of Sleep','Sticky Spray','Subterrene','Talking Toad','Teleport Scroll',
  'Thopter','Thought Sucker','Thruster Pack','Tome of Augury','Translator Bird',
  'Voice Thrower','Winged Boot','Wireless Ear',
];

export function generateAsset() {
  return pick(ASSETS);
}
