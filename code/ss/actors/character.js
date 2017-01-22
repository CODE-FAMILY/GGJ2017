var Character = Object.freeze({
                                FLEX: 0,
                                FLOYD: 1,
                                FLOW: 2,
                                getCharacterName: function (character) {
                                 var name = "";

                                 switch (character) {
                                   case Character.FLEX:
                                     name = "Flex";
                                     break;
                                   case Character.FLOYD:
                                     name = "Floyd";
                                     break;
                                   case Character.FLOW:
                                     name = "Flow";
                                     break;
                                   default:
                                     console.log("ERROR: wrong character " + character);
                                   }

                                 return name;
                                 }
                              });
