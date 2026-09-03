import express from "express";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const app = express();
const PORT = 3000;

const upload = multer({
    storage: multer.memoryStorage()
});

app.use(express.json());
app.use(express.static("."));

const FRUITS = {
    banana: {
        names: ["banana", "plantain"],
        moods: ["CHAOTIC", "CONFIDENT", "SUSPICIOUS"],
        recipes: [
            {
                name: "Banana Chili Toast",
                ingredients: ["banana", "bread", "chilli flakes", "honey"],
                steps: ["Toast the bread.", "Add sliced banana.", "Drizzle honey and sprinkle chilli flakes."],
                why: "Sweet + spicy. Weird enough for Pazhu."
            },
            {
                name: "Banana Crunch Chaat",
                ingredients: ["banana", "peanuts", "chilli powder", "lime"],
                steps: ["Slice the banana.", "Add peanuts and chilli powder.", "Finish with a little lime."],
                why: "Because normal fruit salad is apparently too peaceful."
            }
        ]
    },

    apple: {
        names: ["apple"],
        moods: ["JUDGMENTAL", "ENERGETIC", "OVERACHIEVER"],
        recipes: [
            {
                name: "Masala Apple Crunch",
                ingredients: ["apple", "peanuts", "chilli powder", "lime"],
                steps: ["Slice the apple.", "Add peanuts and chilli powder.", "Add a squeeze of lime."],
                why: "An apple a day, but make it suspicious."
            }
        ]
    },

    strawberry: {
        names: ["strawberry"],
        moods: ["DRAMATIC", "FLIRTY", "CHAOTIC"],
        recipes: [
            {
                name: "Strawberry Chili Chaat",
                ingredients: ["strawberries", "chilli flakes", "lime", "honey"],
                steps: ["Slice the strawberries.", "Add a tiny amount of chilli flakes.", "Finish with lime and honey."],
                why: "Sweet, spicy and unnecessarily dramatic."
            }
        ]
    },

    mango: {
        names: ["mango"],
        moods: ["ROYAL", "DRAMATIC", "UNSTOPPABLE"],
        recipes: [
            {
                name: "Mango Masala Toast",
                ingredients: ["mango", "bread", "chilli powder", "lime"],
                steps: ["Toast the bread.", "Add thin mango slices.", "Dust lightly with chilli powder and lime."],
                why: "Mango refused to behave normally."
            }
        ]
    },

    orange: {
        names: ["orange"],
        moods: ["LOUD", "ENERGETIC", "SUNSHINE"],
        recipes: [
            {
                name: "Orange Chili Chaat",
                ingredients: ["orange", "chilli powder", "salt", "lime"],
                steps: ["Peel and separate the orange.", "Add a tiny pinch of chilli powder and salt.", "Finish with lime."],
                why: "Vitamin C with absolutely no chill."
            }
        ]
    },

    pineapple: {
        names: ["pineapple"],
        moods: ["MENACING", "CONFIDENT", "CHAOTIC"],
        recipes: [
            {
                name: "Pineapple Pepper Toast",
                ingredients: ["pineapple", "bread", "black pepper", "honey"],
                steps: ["Toast the bread.", "Add small pineapple pieces.", "Add black pepper and a little honey."],
                why: "Aggressive outside. Sweet inside. Relatable."
            }
        ]
    },

    watermelon: {
        names: ["watermelon"],
        moods: ["CHILL", "DRAMATIC", "HYDRATED"],
        recipes: [
            {
                name: "Watermelon Chili Bites",
                ingredients: ["watermelon", "lime", "chilli flakes", "salt"],
                steps: ["Cut watermelon into bite-sized pieces.", "Add lime and a tiny pinch of salt.", "Finish with chilli flakes."],
                why: "Basically summer with an attitude problem."
            }
        ]
    }
};

function detectFruit(filename = "") {
    const lower = filename.toLowerCase();

    for (const [fruit, data] of Object.entries(FRUITS)) {
        if (data.names.some(name => lower.includes(name))) {
            return fruit;
        }
    }

    return null;
}

function createAnalysis(fruit) {
    const data = FRUITS[fruit];

    const moods = data.moods;
    const mood = moods[Math.floor(Math.random() * moods.length)];

    const recipes = data.recipes;
    const recipe = recipes[Math.floor(Math.random() * recipes.length)];

    const compatibility = Math.floor(Math.random() * 31) + 65;

    const descriptions = {
        CHAOTIC: "Looks innocent. Absolutely cannot be trusted.",
        CONFIDENT: "Walked into the scanner like it owned the place.",
        SUSPICIOUS: "Pazhu has questions. Many questions.",
        JUDGMENTAL: "It has already judged your life choices.",
        ENERGETIC: "Way too much energy for something sitting on a table.",
        OVERACHIEVER: "Probably has a five-year plan.",
        DRAMATIC: "Every tiny detail has somehow become a major event.",
        FLIRTY: "Suspiciously charming for a piece of fruit.",
        ROYAL: "Clearly believes it deserves its own throne.",
        UNSTOPPABLE: "Nothing is getting between this fruit and its destiny.",
        LOUD: "The visual equivalent of someone shouting in all caps.",
        SUNSHINE: "Aggressively cheerful.",
        MENACING: "Pazhu would like to keep a safe distance.",
        CHILL: "Zero stress. Maximum fruit.",
        HYDRATED: "Living its best watery life."
    };

    const roasts = {
        banana: "Bro... you survived being carried around in someone's bag.",
        apple: "Bro really showed up looking like the main character.",
        strawberry: "Tiny fruit. Massive personality.",
        mango: "You know you're dramatic when even Pazhu noticed.",
        orange: "Vitamin C but make it chaotic.",
        pineapple: "Bro looks dangerous but tastes innocent.",
        watermelon: "That's basically a water tank wearing a green jacket."
    };

    return {
        success: true,
        fruit: fruit.toUpperCase(),
        visualVibe: `${mood} ENERGY`,
        ripeness: "Looks ready for maximum nonsense",
        personality: mood,
        personalityDescription: descriptions[mood],
        compatibility,
        mood: `😤 ${mood}`,
        roast: roasts[fruit],
        recipeName: recipe.name,
        recipeIngredients: recipe.ingredients,
        recipeSteps: recipe.steps,
        recipeWhy: recipe.why
    };
}

app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Ninak Vayye backend is alive 🍌"
    });
});

app.post("/api/analyze", upload.single("image"), (req, res) => {
    console.log("🍌 Image received:", req.file?.originalname);

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No fruit image received."
        });
    }

    /*
        Temporary local fallback:
        the uploaded filename is used when it contains a fruit name.
        The next frontend step will connect the browser vision model
        so the actual image determines the fruit.
    */

    const predictions = JSON.parse(req.body.prediction || "[]");

    const detectedFruit = detectFruitFromPrediction(predictions);

    if (!detectedFruit) {
        return res.json({
            success: true,
            fruit: "UNKNOWN",
            visualVibe: "MYSTERIOUS",
            ripeness: "Pazhu needs another look",
            personality: "???",
            personalityDescription: "This fruit has successfully defeated Pazhu's first guess.",
            compatibility: 50,
            mood: "🫥 UNKNOWN",
            roast: "Bro uploaded a mystery object.",
            recipeName: "Mystery Fruit Chaos",
            recipeIngredients: ["your mystery fruit", "lime", "chilli powder"],
            recipeSteps: [
                "Identify the fruit first.",
                "Add a tiny amount of chilli and lime.",
                "Question your life choices."
            ],
            recipeWhy: "Pazhu literally has no idea what this is."
        });
    }

    res.json(createAnalysis(detectedFruit));
});

app.listen(PORT, () => {
    console.log(`🍌 Ninak Vayye running at http://localhost:${PORT}`);
});
