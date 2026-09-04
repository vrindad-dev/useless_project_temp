const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

/* ============================================================
   SERVER SETUP
   ============================================================ */

const upload = multer({
    storage: multer.memoryStorage()
});

app.use(express.json());

// Serve frontend files
app.use(express.static(__dirname));

// Explicitly serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


/* ============================================================
   FRUIT PROFILES
   ============================================================ */

const FRUIT_PROFILES = {

    banana: {
        name: "🍌 Banana",
        keywords: ["banana", "plantain"],

        personalities: [
            "Chaotic Softie",
            "Comfort Character",
            "Overconfident Introvert",
            "Certified Drama Queen"
        ],

        moods: [
            "sleepy but dramatic",
            "emotionally squishy",
            "too confident",
            "one inconvenience away from chaos"
        ],

        roasts: [
            "Bro has survived several group projects.",
            "This banana has main-character syndrome.",
            "Pazhu respects the confidence. Not the condition.",
            "Emotionally? Slightly squashed."
        ]
    },

    apple: {
        name: "🍎 Apple",
        keywords: ["apple"],

        personalities: [
            "Academic Weapon",
            "Overachiever",
            "Corporate Intern",
            "Suspiciously Responsible"
        ],

        moods: [
            "judgmental",
            "quietly stressed",
            "productive against its will",
            "trying to have its life together"
        ],

        roasts: [
            "This apple definitely reminds the teacher about homework.",
            "Bro has a five-year plan.",
            "This fruit says 'actually' before every sentence.",
            "Apple energy. Slightly terrifying."
        ]
    },

    mango: {
        name: "🥭 Mango",
        keywords: ["mango"],

        personalities: [
            "Main Character",
            "Luxury Diva",
            "Summer Menace",
            "Flirty Chaos Goblin"
        ],

        moods: [
            "summer-coded",
            "dramatically happy",
            "too juicy to function",
            "living its best life"
        ],

        roasts: [
            "This mango knows everyone loves it.",
            "Main character spotted.",
            "Bro arrived with unnecessary confidence.",
            "This mango has more attitude than vitamin C."
        ]
    },

    orange: {
        name: "🍊 Orange",
        keywords: [
            "orange",
            "mandarin",
            "clementine"
        ],

        personalities: [
            "Hyperactive Bestie",
            "Optimistic Chaos",
            "Walking Energy Drink",
            "Loud Extrovert"
        ],

        moods: [
            "aggressively cheerful",
            "energetic",
            "sunny but suspicious",
            "ready to start something"
        ],

        roasts: [
            "This orange definitely sends voice notes.",
            "Bro has too much energy.",
            "Citrus detected. Peace has left the chat.",
            "This fruit would start a group project at 2 AM."
        ]
    },

    strawberry: {
        name: "🍓 Strawberry",
        keywords: ["strawberry"],

        personalities: [
            "Cute Menace",
            "Romantic Chaos",
            "Soft Villain",
            "Pinterest Main Character"
        ],

        moods: [
            "dramatically adorable",
            "soft but dangerous",
            "emotionally pink",
            "pretending everything is fine"
        ],

        roasts: [
            "Cute exterior. Questionable decisions.",
            "This strawberry has Pinterest energy.",
            "Bro is aesthetically unstable.",
            "Pazhu sees the cuteness. Pazhu also sees the chaos."
        ]
    },

    pineapple: {
        name: "🍍 Pineapple",
        keywords: ["pineapple"],

        personalities: [
            "Aggressive Extrovert",
            "Gym Bro",
            "Chaos Leader",
            "Hard Exterior Soft Interior"
        ],

        moods: [
            "ready to fight",
            "aggressively cheerful",
            "too powerful",
            "pretending the spikes are emotional walls"
        ],

        roasts: [
            "This pineapple has trust issues.",
            "Bro literally has armour.",
            "Nobody asked for this much confidence.",
            "Pineapple chose violence."
        ]
    },

    watermelon: {
        name: "🍉 Watermelon",
        keywords: ["watermelon"],

        personalities: [
            "Summer NPC",
            "Chill Bestie",
            "Beach Main Character",
            "Zero Thoughts Head Empty"
        ],

        moods: [
            "summer vacation",
            "extremely hydrated",
            "peaceful",
            "mentally at the beach"
        ],

        roasts: [
            "This watermelon has absolutely no plans tomorrow.",
            "Bro is permanently on vacation.",
            "Zero thoughts. Maximum hydration.",
            "This fruit probably says 'vibe' unironically."
        ]
    },

    kiwi: {
        name: "🥝 Kiwi",
        keywords: ["kiwi"],

        personalities: [
            "Chaotic Intellectual",
            "Tiny Menace",
            "Indie Main Character",
            "Unexpectedly Powerful"
        ],

        moods: [
            "confused but committed",
            "quietly chaotic",
            "strangely confident",
            "plotting something"
        ],

        roasts: [
            "This kiwi looks like it has a secret.",
            "Tiny fruit. Massive personality.",
            "Nobody understands the kiwi.",
            "Suspiciously powerful for something this small."
        ]
    }
};


/* ============================================================
   FRUIT-SPECIFIC RECIPES
   ============================================================ */

const FRUIT_RECIPES = {

    banana: {
        name: "🍌 Banana Pizza Sushi",
        description: `INGREDIENTS:
Banana, chapati, peanut butter, cheese, chilli flakes.

METHOD:
Spread peanut butter over a chapati.
Place banana in the centre.
Add cheese and chilli flakes.
Roll it tightly like sushi and slice.

Pazhu verdict: Somehow this should not work.`
    },

    apple: {
        name: "🍎 Apple Samosa Bombs",
        description: `INGREDIENTS:
Apple, samosa sheets, cinnamon, sugar and chilli powder.

METHOD:
Dice the apple.
Mix with cinnamon, sugar and a tiny pinch of chilli.
Wrap inside samosa sheets.
Seal and cook until crisp.

Pazhu verdict: Sweet samosa technology unlocked.`
    },

    mango: {
        name: "🥭 Mango Maggi Chaat",
        description: `INGREDIENTS:
Mango, cooked Maggi, onion, chilli powder,
lemon and coriander.

METHOD:
Cook the Maggi normally.
Let it cool slightly.
Add diced mango, onion, chilli, lemon and coriander.
Mix.

Pazhu verdict: This mango has entered its chaotic era.`
    },

    orange: {
        name: "🍊 Orange Masala Rice",
        description: `INGREDIENTS:
Cooked rice, orange segments, cumin,
chilli, coriander and salt.

METHOD:
Warm the rice with cumin and chilli.
Turn off the heat.
Fold in small orange pieces.
Finish with coriander.

Pazhu verdict: Citrus rice has entered the timeline.`
    },

    strawberry: {
        name: "🍓 Strawberry Chilli Dosa Rolls",
        description: `INGREDIENTS:
Dosa, strawberries, cream cheese or thick curd,
chilli flakes and honey.

METHOD:
Spread cream cheese or thick curd over the dosa.
Add sliced strawberries.
Sprinkle chilli flakes.
Add a tiny drizzle of honey.
Roll and slice.

Pazhu verdict: Dessert dosa has escaped containment.`
    },

    pineapple: {
        name: "🍍 Pineapple Paneer Skewers",
        description: `INGREDIENTS:
Pineapple chunks, paneer,
chilli powder, salt and lemon.

METHOD:
Thread pineapple and paneer onto skewers.
Season with chilli and salt.
Pan-sear or grill until lightly browned.

Pazhu verdict: Sweet + spicy + paneer = violence.`
    },

    watermelon: {
        name: "🍉 Watermelon Roti Tacos",
        description: `INGREDIENTS:
Roti, watermelon, cucumber,
mint, chilli powder and lemon.

METHOD:
Fold the roti into taco shapes.
Fill with watermelon and cucumber.
Add mint, chilli powder and lemon.

Pazhu verdict: This should not work. Yet here we are.`
    },

    kiwi: {
        name: "🥝 Kiwi Pepper Sandwich",
        description: `INGREDIENTS:
Bread, kiwi, cream cheese,
black pepper and a little honey.

METHOD:
Toast the bread.
Spread cream cheese.
Add kiwi slices.
Finish with black pepper and a tiny drizzle of honey.

Pazhu verdict: Suspicious toast detected.`
    }
};


/* ============================================================
   JSON HELPER
   ============================================================ */

function parseJSON(value, fallback) {

    if (!value) {
        return fallback;
    }

    if (typeof value === "object") {
        return value;
    }

    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
}


/* ============================================================
   FRUIT DETECTION
   ============================================================ */

function detectFruit(predictions, visual, filename) {

    predictions = parseJSON(predictions, []);
    visual = parseJSON(visual, {});

    const fileText = String(filename || "").toLowerCase();

    const scores = {};

    for (const fruit of Object.keys(FRUIT_PROFILES)) {
        scores[fruit] = 0;
    }


    // Filename clues

    for (const fruit of Object.keys(FRUIT_PROFILES)) {

        for (const keyword of FRUIT_PROFILES[fruit].keywords) {

            if (fileText.includes(keyword)) {
                scores[fruit] += 25;
            }
        }
    }


    // MobileNet predictions

    if (Array.isArray(predictions)) {

        for (const prediction of predictions) {

            const label = String(
                prediction.className || ""
            ).toLowerCase();

            const probability = Number(
                prediction.probability || 0
            );

            for (const fruit of Object.keys(FRUIT_PROFILES)) {

                for (const keyword of FRUIT_PROFILES[fruit].keywords) {

                    if (label.includes(keyword)) {
                        scores[fruit] += probability * 100;
                    }
                }
            }
        }
    }


    // Pixel colour clues

    const yellow = Number(visual.yellowRatio || 0);
    const red = Number(visual.redRatio || 0);
    const green = Number(visual.greenRatio || 0);
    const orange = Number(visual.orangeRatio || 0);


    if (yellow > 0.15) {
        scores.banana += 8;
        scores.mango += 5;
    }

    if (red > 0.15) {
        scores.apple += 8;
        scores.strawberry += 8;
    }

    if (green > 0.15) {
        scores.kiwi += 6;
        scores.watermelon += 5;
        scores.pineapple += 3;
    }

    if (orange > 0.12) {
        scores.orange += 10;
        scores.mango += 3;
    }


    // Best score

    let bestFruit = "banana";
    let bestScore = -Infinity;

    for (const fruit of Object.keys(scores)) {

        if (scores[fruit] > bestScore) {
            bestScore = scores[fruit];
            bestFruit = fruit;
        }
    }

    return {
        fruit: bestFruit,
        score: bestScore,
        scores
    };
}


/* ============================================================
   RIPENESS
   ============================================================ */

function calculateRipeness(fruit, visual) {

    const brightness = Number(visual.brightness || 120);
    const yellow = Number(visual.yellowRatio || 0);
    const green = Number(visual.greenRatio || 0);
    const red = Number(visual.redRatio || 0);
    const orange = Number(visual.orangeRatio || 0);
    const dark = Number(visual.darkRatio || 0);


    if (fruit === "banana") {

        if (green > 0.20 && yellow < 0.20) {
            return "unripe";
        }

        if (yellow > 0.22 && dark < 0.10) {
            return "ripe";
        }

        if (dark > 0.15) {
            return "overripe";
        }
    }


    if (fruit === "apple") {

        if (red > 0.20 && brightness > 100) {
            return "ripe";
        }

        if (green > 0.22) {
            return "possibly unripe";
        }
    }


    if (fruit === "mango") {

        if (yellow > 0.18 || orange > 0.18) {
            return "ripe";
        }

        if (green > 0.22) {
            return "unripe";
        }
    }


    if (fruit === "orange") {

        if (orange > 0.18) {
            return "ripe";
        }
    }


    if (fruit === "strawberry") {

        if (red > 0.20) {
            return "ripe";
        }
    }


    if (fruit === "pineapple") {

        if (yellow > 0.15) {
            return "ripe";
        }

        if (green > 0.20) {
            return "less ripe";
        }
    }


    if (fruit === "watermelon") {

        if (green > 0.15) {
            return "fresh-looking";
        }
    }


    if (fruit === "kiwi") {

        if (green > 0.15) {
            return "fresh-looking";
        }
    }


    if (brightness < 70) {
        return "possibly overripe";
    }

    return "probably ripe";
}


/* ============================================================
   CONDITION
   ============================================================ */

function calculateCondition(visual) {

    const dark = Number(visual.darkRatio || 0);

    const saturation = Number(
        visual.saturationRatio || 0
    );

    const brightness = Number(
        visual.brightness || 120
    );


    if (dark > 0.25) {
        return "suspicious shadows";
    }

    if (brightness < 65) {
        return "too dark to judge";
    }

    if (saturation > 0.45) {
        return "visually lively";
    }

    if (saturation < 0.15) {
        return "washed out";
    }

    return "looks decent";
}


/* ============================================================
   MOOD
   ============================================================ */

function createMood(fruit, visual, ripeness) {

    const moods = FRUIT_PROFILES[fruit].moods;

    let score = 0;

    const brightness = Number(
        visual.brightness || 120
    );

    const saturation = Number(
        visual.saturationRatio || 0
    );


    score += Math.round(brightness / 50);

    score += Math.round(saturation * 5);


    if (ripeness.includes("over")) {
        score += 2;
    }


    return moods[
        Math.abs(score) % moods.length
    ];
}


/* ============================================================
   PERSONALITY
   ============================================================ */

function createPersonality(fruit, visual) {

    const personalities =
        FRUIT_PROFILES[fruit].personalities;

    const brightness = Number(
        visual.brightness || 120
    );

    const saturation = Number(
        visual.saturationRatio || 0
    );


    const score = Math.abs(
        Math.round(
            brightness +
            saturation * 100
        )
    );


    return personalities[
        score % personalities.length
    ];
}


/* ============================================================
   COMPATIBILITY
   ============================================================ */

function calculateCompatibility(
    fruit,
    visual,
    ripeness
) {

    let score = 50;

    const brightness = Number(
        visual.brightness || 120
    );

    const saturation = Number(
        visual.saturationRatio || 0
    );


    score += Math.round(
        (brightness - 120) / 8
    );

    score += Math.round(
        saturation * 15
    );


    if (
        ripeness === "ripe" ||
        ripeness === "fresh-looking" ||
        ripeness === "probably ripe"
    ) {
        score += 8;
    }


    if (ripeness.includes("over")) {
        score -= 12;
    }


    const fruitBonus = {

        banana: 5,
        apple: 3,
        mango: 9,
        orange: 6,
        strawberry: 8,
        pineapple: 1,
        watermelon: 7,
        kiwi: 4
    };


    score += fruitBonus[fruit] || 0;


    return Math.max(
        5,
        Math.min(98, score)
    );
}


/* ============================================================
   PAZHU MESSAGE
   ============================================================ */

function createPazhuMessage(
    fruit,
    personality,
    mood,
    ripeness
) {

    const profile =
        FRUIT_PROFILES[fruit];


    const roastIndex =
        (
            personality.length +
            mood.length +
            ripeness.length
        ) %
        profile.roasts.length;


    const roast =
        profile.roasts[roastIndex];


    return (
        profile.name +
        " detected. " +
        "Personality: " +
        personality +
        ". " +
        "Mood: " +
        mood +
        ". " +
        "Ripeness: " +
        ripeness +
        ". " +
        roast
    );
}


/* ============================================================
   ANALYSIS
   ============================================================ */

function buildAnalysis(
    predictions,
    visual,
    filename
) {

    const detection =
        detectFruit(
            predictions,
            visual,
            filename
        );


    const fruit =
        detection.fruit;


    const profile =
        FRUIT_PROFILES[fruit];


    const ripeness =
        calculateRipeness(
            fruit,
            visual
        );


    const condition =
        calculateCondition(
            visual
        );


    const mood =
        createMood(
            fruit,
            visual,
            ripeness
        );


    const personality =
        createPersonality(
            fruit,
            visual
        );


    const compatibility =
        calculateCompatibility(
            fruit,
            visual,
            ripeness
        );


    const recipe =
        FRUIT_RECIPES[fruit];


    const pazhuMessage =
        createPazhuMessage(
            fruit,
            personality,
            mood,
            ripeness
        );


    return {

        fruit: profile.name,

        fruitKey: fruit,

        color:
            visual.color ||
            "mixed",

        ripeness,

        condition,

        mood,

        personality,

        compatibility,

        pazhuMessage,

        vibeReport:
            `${profile.name} is giving ` +
            `${personality} energy. ` +
            `The pixels are reading ` +
            `${visual.color || "mixed"} ` +
            `with ${ripeness} vibes. ` +
            `Condition: ${condition}. ` +
            `Emotionally, this fruit is ` +
            `${mood}. Pazhu has decided this ` +
            `is enough evidence to judge it.`,

        recipe,

        confidence:
            Math.max(
                35,
                Math.min(
                    95,
                    Math.round(
                        50 +
                        detection.score * 2
                    )
                )
            ),

        detection: {

            scores:
                detection.scores,

            bestScore:
                detection.score
        }
    };
}


/* ============================================================
   ANALYZE API
   ============================================================ */

app.post(
    "/api/analyze",
    upload.single("fruit"),
    (req, res) => {

        try {

            if (!req.file) {

                return res
                    .status(400)
                    .json({
                        error:
                            "No fruit image uploaded."
                    });
            }


            const predictions =
                parseJSON(
                    req.body.prediction,
                    []
                );


            const visual =
                parseJSON(
                    req.body.visual,
                    {}
                );


            const analysis =
                buildAnalysis(
                    predictions,
                    visual,
                    req.file.originalname
                );


            console.log(
                "🍌 PAZHU ANALYSIS:",
                analysis.fruit,
                "|",
                analysis.ripeness,
                "|",
                analysis.personality
            );


            return res.json({

                success: true,

                analysis
            });

        } catch (error) {

            console.error(
                "ANALYSIS ERROR:",
                error
            );


            return res
                .status(500)
                .json({

                    error:
                        "Pazhu.exe crashed.",

                    details:
                        error.message
                });
        }
    }
);


/* ============================================================
   TEST API
   ============================================================ */

app.get(
    "/api/test",
    (req, res) => {

        return res.json({

            status:
                "Pazhu.exe online",

            fruits:
                Object.keys(
                    FRUIT_PROFILES
                ),

            recipes:
                Object.fromEntries(
                    Object.entries(
                        FRUIT_RECIPES
                    ).map(
                        ([fruit, recipe]) => [
                            fruit,
                            recipe.name
                        ]
                    )
                )
        });
    }
);


/* ============================================================
   VERCEL EXPORT
   ============================================================ */

// DO NOT use app.listen() on Vercel.
// Vercel handles the serverless HTTP server.

module.exports = app;

