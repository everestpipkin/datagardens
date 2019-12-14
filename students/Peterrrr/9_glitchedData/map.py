from PIL import Image, ImageFilter
import json
tiles = [];
tilesBy = [];


bluetiles = [0,182,255];
pinktiles = [200,100,100];
orangetiles = [255,92,20];
deepbtiles = [10,0,150];
litegtiles = [10,255,100];

blacktiles = [0,0,0];
strf = "";
try:
    original = Image.open("map.jpg")
    pix = original.load()
    for k in range(0,90,10):
        for m in range(0,90,10):
            for u in range(10):
                for  i in range(10):
                    r,g,b = pix[i+m,u+k]
                    if (abs(bluetiles[0] - r) < 6 and abs(bluetiles[1] - g) < 6 and abs(bluetiles[2] - b) < 6):
                        strf += "1";
                    elif (abs(blacktiles[0] - r) < 6 and abs(blacktiles[1] - g) < 6 and abs(blacktiles[2] - b) < 6):
                        strf += "0";
                    elif (abs(pinktiles[0] - r) < 6 and abs(pinktiles[1] - g) < 6 and abs(pinktiles[2] - b) < 6):
                        strf += "2";
                        #flag
                    elif (abs(orangetiles[0] - r) < 6 and abs(orangetiles[1] - g) < 6 and abs(orangetiles[2] - b) < 6):
                        strf += "3";
                        #flag
                    elif (abs(deepbtiles[0] - r) < 6 and abs(deepbtiles[1] - g) < 6 and abs(deepbtiles[2] - b) < 6):
                        strf += "4";
                    elif (abs(litegtiles[0] - r) < 6 and abs(litegtiles[1] - g) < 6 and abs(litegtiles[2] - b) < 6):
                        strf += "5";
                #strf += str(k)+","+str(m)+"\n";
                tilesBy.append(strf);
                #print(len(strf));
                strf = "";
            tiles.append(tilesBy);
            tilesBy =[]
    print(tiles)
    data = {}
    data['tiles'] = []

    ki = 0;
    while ki < len(tiles):
        data['tiles'].append({'title':tiles[ki]})
        ki+=1
    with open('data.txt','w') as outfile:
    
        json.dump(data,outfile)
    
except:
    print ("Unable to load image")
