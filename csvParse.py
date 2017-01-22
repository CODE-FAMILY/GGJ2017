#some manual formatting required
import csv

with open('levelTemp.js', 'w') as the_file:
    #change this for different output levels
    with open('level/Whale-Defense-Force-Level-Sheet1-2.csv', 'rb') as f:
        reader = csv.reader(f)
        the_file.write('var GAME_LEVELS = [\n [\n')
        for row in reader:
            the_file.write('"')
            for character in row:
                char = character
                if len(character) is 0:
                    char = " "
                the_file.write(char)
            the_file.write('",\n')
        the_file.write(']\n];\n')
    the_file.write('if (typeof module != "undefined" && module.exports)')
    the_file.write('module.exports = GAME_LEVELS;')