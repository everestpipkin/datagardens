import json

def create_save_json(colors, file):
    with open(file, 'w', encoding='utf-8') as f:
        json.dump(colors, f, ensure_ascii=False, indent=4)