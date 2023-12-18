export function removeUnusedFields(obj: any, unusedFields: string[]): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
            obj[index] = removeUnusedFields(item, unusedFields);
        });
    } else {
        Object.keys(obj).forEach((key) => {
            if (unusedFields.includes(key)) {
                delete obj[key];
            } else {
                obj[key] = removeUnusedFields(obj[key], unusedFields);
            }
        });
    }

    return obj;
}
export function todo() {
    console.log("TODO");
}
export const obj = [
    {
        "direction": "vgroup",
        "components": [
            {
                "direction": "hgroup",
                "components": [
                    {
                        "type": "knob",
                        "name": "delayTime",
                        "address": "/Greyhole/Mix/delayTime",
                        "webAudioType": "knob",
                        "attributes": {
                            "src": "./img/knobs/MiniMoog_Main.png",
                            "sprites": 100,
                            "min": 0.001,
                            "max": 1.45,
                            "step": 0.0001,
                            "width": 40,
                            "height": 40
                        }
                    },
                    {
                        "type": "knob",
                        "name": "damping",
                        "address": "/Greyhole/Mix/damping",
                        "webAudioType": "knob",
                        "attributes": {
                            "src": "./img/knobs/MiniMoog_Main.png",
                            "sprites": 100,
                            "min": 0,
                            "max": 0.99,
                            "step": 0.001,
                            "width": 40,
                            "height": 40
                        }
                    },
                    {
                        "type": "knob",
                        "name": "size",
                        "address": "/Greyhole/Mix/size",
                        "webAudioType": "knob",
                        "attributes": {
                            "src": "./img/knobs/MiniMoog_Main.png",
                            "sprites": 100,
                            "min": 0.5,
                            "max": 3,
                            "step": 0.0001,
                            "width": 40,
                            "height": 40
                        }
                    },
                    {
                        "type": "knob",
                        "name": "diffusion",
                        "address": "/Greyhole/Mix/diffusion",
                        "webAudioType": "knob",
                        "attributes": {
                            "src": "./img/knobs/MiniMoog_Main.png",
                            "sprites": 100,
                            "min": 0,
                            "max": 0.99,
                            "step": 0.0001,
                            "width": 40,
                            "height": 40
                        }
                    },
                    {
                        "type": "knob",
                        "name": "feedback",
                        "address": "/Greyhole/Mix/feedback",
                        "webAudioType": "knob",
                        "attributes": {
                            "src": "./img/knobs/MiniMoog_Main.png",
                            "sprites": 100,
                            "min": 0,
                            "max": 1,
                            "step": 0.01,
                            "width": 40,
                            "height": 40
                        }
                    }
                ],
                "type": "layout",
                "name": "greyhole",
                "id": "greyhole"
            },
            {
                "direction": "hgroup",
                "components": [
                    {
                        "type": "knob",
                        "name": "modDepth",
                        "address": "/Greyhole/Mod/modDepth",
                        "webAudioType": "knob",
                        "attributes": {
                            "src": "./img/knobs/MiniMoog_Main.png",
                            "sprites": 100,
                            "min": 0,
                            "max": 1,
                            "step": 0.001,
                            "width": 40,
                            "height": 40
                        }
                    },
                    {
                        "type": "knob",
                        "name": "modFreq",
                        "address": "/Greyhole/Mod/modFreq",
                        "webAudioType": "knob",
                        "attributes": {
                            "src": "./img/knobs/MiniMoog_Main.png",
                            "sprites": 100,
                            "min": 0,
                            "max": 10,
                            "step": 0.01,
                            "width": 40,
                            "height": 40
                        }
                    }
                ],
                "type": "layout",
                "name": "greyhole",
                "id": "greyhole"
            }
        ],
        "type": "layout",
        "name": "greyhole",
        "id": "greyhole"
    }
]