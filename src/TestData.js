const sects = [
    {
        "name": "Baslangiclar",
        "img": "http://localhost:8000/media/images/default.jpg",
        "order_num": 1,
        "pk": 1
    },
    {
        "name": "Ara Sicaklar",
        "img": "http://localhost:8000/media/images/default.jpg",
        "order_num": 1,
        "pk": 2
    },
    {
        "name": "Ara Soguklar",
        "img": "http://localhost:8000/media/images/default.jpg",
        "order_num": 1,
        "pk": 3
    },
    {
        "name": "Ana Yemekler",
        "img": "http://localhost:8000/media/images/default.jpg",
        "order_num": 1,
        "pk": 4
    },
    {
        "name": "Tatlilar",
        "img": "http://localhost:8000/media/images/default.jpg",
        "order_num": 1,
        "pk": 5
    },
    {
        "name": "Icecekler",
        "img": "http://localhost:8000/media/images/default.jpg",
        "order_num": 1,
        "pk": 6
    },
];

const its = [
    {
        "section": 1,
        "name": "Shrimp Bomb - Empty",
        "img": "http://localhost:8000/media/images/default.jpg",
        "description": "",
        "price": 5.73,
        "options_binary": [],
        "options_selection": {},
        "pk": 1
    },
    {
        "section": 1,
        "name": "Shrimp Bomb - Full",
        "img": "http://localhost:8000/media/images/default.jpg",
        "description": "Some description. Lorem Ipsum is simply dummy text of the printing and typesetting industry.\
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        "price": 5.7,
        "options_binary": [
            "Binary Option 1",
            "Binary Option 2",
            "Binary Option 3",
        ],
        "options_selection": {
            "selection 1": [
                "otp1",
                "opt2"
            ],
            "selection 2": [
                "otp1",
                "opt2"
            ],
        },
        "pk": 2
    },
    {
        "section": 1,
        "name": "Shrimp Bomb",
        "img": "http://localhost:8000/media/images/default.jpg",
        "description": "",
        "price": 0.0,
        "options_binary": [
            "Add Extra Sauce"
        ],
        "options_selection": {
            "sauce": [
                "hot",
                "mild"
            ]
        },
        "pk": 3
    },
    {
        "section": 1,
        "name": "Shrimp Bomb",
        "img": "http://localhost:8000/media/images/default.jpg",
        "description": "",
        "price": 0.0,
        "options_binary": [
            "Add Extra Sauce"
        ],
        "options_selection": {
            "sauce": [
                "hot",
                "mild"
            ]
        },
        "pk": 4
    },
    {
        "section": 1,
        "name": "Grilled Eggplant & Tahini Dip",
        "img": "http://localhost:8000/media/images/default.jpg",
        "description": "",
        "price": 0.0,
        "options_binary": [
            "Add Extra Sauce"
        ],
        "options_selection": {
            "sauce": [
                "hot",
                "mild"
            ]
        },
        "pk": 5
    },
    {
        "section": 2,
        "name": "Ahi Poke Stack",
        "img": "http://localhost:8000/media/images/default.jpg",
        "description": "",
        "price": 0.0,
        "options_binary": [
            "Add Extra Sauce"
        ],
        "options_selection": {
            "sauce": [
                "hot",
                "mild"
            ]
        },
        "pk": 6
    },
];

export {sects, its};