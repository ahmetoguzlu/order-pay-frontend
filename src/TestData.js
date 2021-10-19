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
        "name": "Shrimp Bomb",
        "img": "http://localhost:8000/media/images/default.jpg",
        "description": "Marine edilmis karidesler, aci sevenler icin ozel uretilmis \
                        gurme bir sosla uzerinde peynir ve maydanoz serpistirilerek servis edilir.",
        "price": 5.7,
        "warnings": [
            "Kabuklu deniz mahsulu icerir!"
        ],
        "options": [
            {
                "header_text": "Eklemeler",
                "type": "checkbox",
                "items": {
                    "Ekstra Karides": 1.3,
                    "Ekstra Sos": 0.32,
                },
            },
            {
                "header_text": "Cikartilacaklar",
                "type": "checkbox",
                "items": {
                    "Karidessiz": 0,
                    "Ozel Aci Sossuz": 0,
                    "Peynirsiz": 0,
                    "Maydanozsuz": 0,
                },
            },
            {
                "header_text": "Sos 1",
                "type": "radio",
                "items": {
                    "Aci sos": 0,
                    "Super aci sos": 0.2,
                },
            },
            {
                "header_text": "Sos 2",
                "type": "radio",
                "items": {
                    "Aci sos": 0,
                    "Super aci sos": 0.2,
                },
            },
        ],
        "pk": 1
    },
];

export {sects, its};