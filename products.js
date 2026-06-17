// Product Recommendations Database
// Single source of truth for all supplement recommendations

const recommendations = {
    sleep: [
        {
            title: "BioSeries™ Melatonin",
            description: "Clinically designed sleep support with optimized melatonin release throughout the night.",
            benefits: [
                "Supports healthy sleep cycles",
                "Helps improve sleep quality",
                "Optimized overnight release"
            ],
            image: "images/2.jpg",
            url: "https://mavely.app.link/g8aLeVmDZ3b"
        },
        {
            title: "Ageless Multi Magnesium",
            description: "Advanced magnesium formula with seven premium magnesium sources plus L-Theanine and Vitamin B5.",
            benefits: [
                "Supports relaxation and recovery",
                "Helps support nervous system balance",
                "Supports energy metabolism"
            ],
            image: "images/3.jpg",
            url: "https://mavely.app.link/DKtIIYrDZ3b"
        },
        {
            title: "Zen-Zzz™",
            description: "Supports relaxation, faster sleep onset and deeper restorative sleep.",
            benefits: [
                "Promotes relaxation",
                "Supports faster sleep onset",
                "Encourages deeper, restorative sleep"
            ],
            image: "images/4.jpg",
            url: "https://mavely.app.link/ixVXREvDZ3b"
        }
    ],

    brain: [
        {
            title: "Eternal Mind",
            description: "Supports focus, memory, cognition and long-term brain performance.",
            benefits: [
                "Supports focus and attention",
                "Helps support memory",
                "Supports cognitive performance"
            ],
            image: "images/5.jpg",
            url: "https://mavely.app.link/4VVvE4BDZ3b"
        },
        {
            title: "Brain Bright",
            description: "Daily nootropic supporting mental clarity and concentration.",
            benefits: [
                "Supports mental clarity",
                "Helps support concentration",
                "Supports daily cognitive performance"
            ],
            image: "images/6.jpg",
            url: "https://mavely.app.link/Oz9Zs7PDZ3b"
        }
    ],

    energy: [
        {
            title: "MetaboGreens®",
            description: "40+ nutrient-rich greens, superfoods and antioxidants supporting daily energy.",
            benefits: [
                "Supports daily energy",
                "Provides antioxidant support",
                "Supports overall wellness"
            ],
            image: "images/7.jpg",
            url: "https://mavely.app.link/retVBm4DZ3b"
        },
        {
            title: "Ageless Multi Magnesium",
            description: "Supports energy production, recovery and overall wellness.",
            benefits: [
                "Supports energy production",
                "Supports recovery",
                "Helps support stress resilience"
            ],
            image: "images/8.jpg",
            url: "https://mavely.app.link/ReHt9i6DZ3b"
        },
        {
            title: "Omega-3 DHA & EPA",
            description: "High-quality vegan omega-3 supporting brain and heart health.",
            benefits: [
                "Supports heart health",
                "Supports brain function",
                "Supports healthy inflammation balance"
            ],
            image: "images/9.jpg",
            url: "https://mavely.app.link/mxTUUD8DZ3b"
        }
    ],

    stress: [
        {
            title: "Stress Relief",
            description: "Supports a healthy stress response throughout the day.",
            benefits: [
                "Supports a healthy stress response",
                "Supports calm focus",
                "Helps support mood balance"
            ],
            image: "images/10.jpg",
            url: "https://mavely.app.link/U8WMLDdEZ3b"
        },
        {
            title: "Ageless Body®",
            description: "Supports resilience, cellular energy and healthy aging.",
            benefits: [
                "Supports cellular energy",
                "Supports resilience and recovery",
                "Supports healthy aging"
            ],
            image: "images/11.jpg",
            url: "https://mavely.app.link/AU7uFmNYZ3b"
        }
    ],

    muscle: [
        {
            title: "Ageless Muscle®",
            description: "Creatine and HMB formula designed to support lean muscle growth.",
            benefits: [
                "Supports lean muscle",
                "Supports strength and performance",
                "Supports workout recovery"
            ],
            image: "images/12.jpg",
            url: "https://mavely.app.link/tMUOusSEZ3b"
        },
        {
            title: "BellyTrim XP®",
            description: "Supports body composition, metabolism and muscle tone.",
            benefits: [
                "Supports metabolism",
                "Supports body composition",
                "Supports lean tone"
            ],
            image: "images/13.jpg",
            url: "https://mavely.app.link/p3ZPNyUEZ3b"
        },
        {
            title: "Magnesium+",
            description: "Supports muscle recovery, relaxation and performance.",
            benefits: [
                "Supports muscle recovery",
                "Supports relaxation",
                "Supports performance"
            ],
            image: "images/14.jpg",
            url: "https://mavely.app.link/JbEAGfWEZ3b"
        }
    ],

    healthy_aging: [
        {
            title: "Ageless Body®",
            description: "Premium formula supporting cellular health and healthy aging.",
            benefits: [
                "Supports cellular health",
                "Supports healthy aging",
                "Supports energy and vitality"
            ],
            image: "images/15.jpg",
            url: "https://mavely.app.link/AU7uFmNYZ3b"
        },
        {
            title: "Omega-3 DHA & EPA",
            description: "Supports long-term cardiovascular and cognitive wellness.",
            benefits: [
                "Supports cardiovascular health",
                "Supports cognitive health",
                "Supports healthy inflammation balance"
            ],
            image: "images/16.jpg",
            url: "https://mavely.app.link/mxTUUD8DZ3b"
        }
    ],

    weight_loss: [
        {
            title: "BellyTrim XP®",
            description: "Supports body composition and metabolic health as part of a healthy routine.",
            benefits: [
                "Supports metabolism",
                "Supports body composition",
                "Supports healthy weight management"
            ],
            image: "images/13.jpg",
            url: "https://mavely.app.link/p3ZPNyUEZ3b"
        },
        {
            title: "MetaboGreens®",
            description: "Greens + superfoods designed to support daily energy and wellness.",
            benefits: [
                "Supports daily energy",
                "Supports digestion and wellness",
                "Provides antioxidant support"
            ],
            image: "images/7.jpg",
            url: "https://mavely.app.link/retVBm4DZ3b"
        },
        {
            title: "Omega-3 DHA & EPA",
            description: "Omega-3 support for heart health and overall wellness.",
            benefits: [
                "Supports heart health",
                "Supports healthy inflammation balance",
                "Supports overall wellness"
            ],
            image: "images/9.jpg",
            url: "https://mavely.app.link/mxTUUD8DZ3b"
        }
    ],

    women18: [
        {
            title: "Women's Multivitamin 18+",
            description: "Daily multivitamin formulated for women ages 18-49.",
            benefits: [
                "Supports daily micronutrient coverage",
                "Supports energy and vitality",
                "Supports overall wellness"
            ],
            image: "images/17.jpg",
            url: "https://mavely.app.link/MLYD5e9NZ3b"
        }
    ],

    women50: [
        {
            title: "Women's Multivitamin 50+",
            description: "Multivitamin supporting healthy aging and wellness after menopause.",
            benefits: [
                "Supports healthy aging",
                "Supports daily wellness",
                "Supports energy and vitality"
            ],
            image: "images/18.jpg",
            url: "https://mavely.app.link/DqqvbjcOZ3b"
        }
    ],

    wellness: [
        {
            title: "Probiotic Blend",
            description: "3-in-1 prebiotic, probiotic and postbiotic formula for gut health.",
            benefits: [
                "Supports gut and digestive health",
                "Supports immune health",
                "Supports daily wellness"
            ],
            image: "images/19.jpg",
            url: "https://mavely.app.link/6VxeYBfOZ3b"
        },
        {
            title: "Omega-3 DHA & EPA",
            description: "Daily omega-3 support for heart and brain health.",
            benefits: [
                "Supports heart health",
                "Supports brain health",
                "Supports healthy inflammation balance"
            ],
            image: "images/9.jpg",
            url: "https://mavely.app.link/mxTUUD8DZ3b"
        },
        {
            title: "MetaboGreens®",
            description: "Daily greens support for energy and overall wellness.",
            benefits: [
                "Supports daily energy",
                "Provides antioxidant support",
                "Supports overall wellness"
            ],
            image: "images/7.jpg",
            url: "https://mavely.app.link/retVBm4DZ3b"
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { recommendations };
}
